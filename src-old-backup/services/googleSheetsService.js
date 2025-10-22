import axios from 'axios';
import {
  API_BASE_URL,
  GOOGLE_SHEETS_CONFIG,
  STATUS_CATEGORIES,
  STATUS_RANGES,
  COLUMN_KEYWORDS,
  DEFAULT_COLUMN_MAPPING,
} from '../config/constants';

// Cache for column mapping
let cachedColumnMapping = null;

/**
 * Constructs the Google Sheets API URL
 * @param {string} range - Range to fetch (e.g., 'A:Z' or 'A1:H1')
 * @returns {string} Full API URL
 */
const getApiUrl = (range) => {
  const { SHEET_ID, SHEET_NAME, API_KEY } = GOOGLE_SHEETS_CONFIG;
  const fullRange = `${SHEET_NAME}!${range}`;
  return `${API_BASE_URL}/${SHEET_ID}/values/${fullRange}?key=${API_KEY}`;
};

/**
 * Detects column mapping from header row
 * @param {Array} headers - Array of header strings
 * @returns {Object} Column mapping object
 */
const detectColumnMapping = (headers) => {
  const mapping = {};

  // Try to match each required field with headers
  Object.keys(COLUMN_KEYWORDS).forEach((field) => {
    const keywords = COLUMN_KEYWORDS[field];

    // Find the column index that matches any keyword
    const columnIndex = headers.findIndex((header) => {
      if (!header) return false;
      const headerLower = header.toString().toLowerCase().trim();

      return keywords.some((keyword) => {
        const keywordLower = keyword.toLowerCase();
        return headerLower.includes(keywordLower);
      });
    });

    if (columnIndex !== -1) {
      mapping[field] = columnIndex;
    }
  });

  // Check if we found all required fields
  const requiredFields = Object.keys(COLUMN_KEYWORDS);
  const foundFields = Object.keys(mapping);

  if (foundFields.length < requiredFields.length) {
    console.warn(
      `Auto-detection incomplete. Found ${foundFields.length}/${requiredFields.length} columns.`,
      'Missing:', requiredFields.filter(f => !foundFields.includes(f))
    );

    // Use default mapping for missing fields
    requiredFields.forEach((field) => {
      if (!mapping[field]) {
        mapping[field] = DEFAULT_COLUMN_MAPPING[field];
      }
    });
  }

  console.log('Detected column mapping:', mapping);
  return mapping;
};

/**
 * Fetches and caches column mapping from sheet headers
 * @returns {Promise<Object>} Column mapping object
 */
const getColumnMapping = async () => {
  if (cachedColumnMapping) {
    return cachedColumnMapping;
  }

  try {
    // Fetch only the first row (headers)
    const headerRange = `${GOOGLE_SHEETS_CONFIG.HEADER_ROW}:${GOOGLE_SHEETS_CONFIG.HEADER_ROW}`;
    const url = getApiUrl(headerRange);
    const response = await axios.get(url);

    if (response.data && response.data.values && response.data.values[0]) {
      const headers = response.data.values[0];
      cachedColumnMapping = detectColumnMapping(headers);
      return cachedColumnMapping;
    }

    // Fallback to default mapping
    console.warn('Could not fetch headers, using default column mapping');
    cachedColumnMapping = DEFAULT_COLUMN_MAPPING;
    return cachedColumnMapping;
  } catch (error) {
    console.error('Error fetching headers:', error);
    console.warn('Using default column mapping');
    cachedColumnMapping = DEFAULT_COLUMN_MAPPING;
    return cachedColumnMapping;
  }
};

/**
 * Determines the status category based on days remaining
 * @param {number} daysRemaining - Number of days until expiry
 * @returns {string} Status category
 */
const getStatusCategory = (daysRemaining) => {
  const days = Number(daysRemaining);

  if (days < 0) return STATUS_CATEGORIES.EXPIRED;
  if (days >= STATUS_RANGES.CRITICAL.min && days <= STATUS_RANGES.CRITICAL.max) {
    return STATUS_CATEGORIES.CRITICAL;
  }
  if (days >= STATUS_RANGES.WARNING.min && days <= STATUS_RANGES.WARNING.max) {
    return STATUS_CATEGORIES.WARNING;
  }
  return STATUS_CATEGORIES.NORMAL;
};

/**
 * Transforms raw sheet data into structured registration objects
 * @param {Array} rows - Raw data from Google Sheets
 * @param {Object} columnMapping - Column mapping object
 * @returns {Array} Array of registration objects
 */
const transformSheetData = (rows, columnMapping) => {
  if (!rows || rows.length === 0) return [];

  return rows
    .filter(row => row && row.length > 0) // Filter out empty rows
    .map((row, index) => {
      const daysRemaining = Number(row[columnMapping.DAYS_REMAINING]) || 0;

      return {
        id: index + 1,
        daysRemaining,
        status: row[columnMapping.STATUS] || '-',
        regCode: row[columnMapping.REG_CODE] || '-',
        regNumber: row[columnMapping.REG_NUMBER] || '-',
        tradeName: row[columnMapping.TRADE_NAME] || '-',
        regType: row[columnMapping.REG_TYPE] || '-',
        organization: row[columnMapping.ORGANIZATION] || '-',
        expiryDate: row[columnMapping.EXPIRY_DATE] || '-',
        statusCategory: getStatusCategory(daysRemaining),
      };
    });
};

/**
 * Fetches registration data from Google Sheets
 * @returns {Promise<Array>} Array of registration objects
 */
export const getRegistrations = async () => {
  try {
    // Step 1: Get column mapping (auto-detect or use cache)
    const columnMapping = await getColumnMapping();

    // Step 2: Fetch all data (skip header row)
    const dataRange = `${GOOGLE_SHEETS_CONFIG.HEADER_ROW + 1}:${GOOGLE_SHEETS_CONFIG.DATA_RANGE.split(':')[1]}`;
    const url = getApiUrl(dataRange);
    const response = await axios.get(url);

    if (!response.data || !response.data.values) {
      throw new Error('ไม่พบข้อมูลในชีท');
    }

    // Step 3: Transform data using detected column mapping
    const registrations = transformSheetData(response.data.values, columnMapping);

    // Sort by days remaining (ascending - most urgent first)
    registrations.sort((a, b) => a.daysRemaining - b.daysRemaining);

    console.log(`Loaded ${registrations.length} registrations from Google Sheets`);
    return registrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);

    if (error.response) {
      // API error
      const status = error.response.status;
      if (status === 403) {
        throw new Error('ไม่สามารถเข้าถึงข้อมูลได้ กรุณาตรวจสอบ API Key');
      } else if (status === 404) {
        throw new Error('ไม่พบชีทที่ระบุ กรุณาตรวจสอบ Sheet ID');
      }
      throw new Error(`เกิดข้อผิดพลาดจาก API: ${error.response.statusText}`);
    } else if (error.request) {
      // Network error
      throw new Error('ไม่สามารถเชื่อมต่อกับ Google Sheets ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
    } else {
      // Other errors
      throw new Error(error.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    }
  }
};

/**
 * Calculates statistics from registration data
 * @param {Array} registrations - Array of registration objects
 * @returns {Object} Statistics object
 */
export const getStatistics = (registrations) => {
  if (!registrations || registrations.length === 0) {
    return {
      total: 0,
      expired: 0,
      critical: 0,
      warning: 0,
      normal: 0,
    };
  }

  const stats = {
    total: registrations.length,
    expired: 0,
    critical: 0,
    warning: 0,
    normal: 0,
  };

  registrations.forEach((reg) => {
    switch (reg.statusCategory) {
      case STATUS_CATEGORIES.EXPIRED:
        stats.expired++;
        break;
      case STATUS_CATEGORIES.CRITICAL:
        stats.critical++;
        break;
      case STATUS_CATEGORIES.WARNING:
        stats.warning++;
        break;
      case STATUS_CATEGORIES.NORMAL:
        stats.normal++;
        break;
      default:
        break;
    }
  });

  return stats;
};

/**
 * Searches registrations by registration number or trade name
 * @param {Array} registrations - Array of registration objects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered array of registrations
 */
export const searchRegistrations = (registrations, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return registrations;
  }

  const term = searchTerm.toLowerCase().trim();

  return registrations.filter((reg) => {
    const regNumber = (reg.regNumber || '').toLowerCase();
    const tradeName = (reg.tradeName || '').toLowerCase();
    const regCode = (reg.regCode || '').toLowerCase();

    return (
      regNumber.includes(term) ||
      tradeName.includes(term) ||
      regCode.includes(term)
    );
  });
};

/**
 * Filters registrations by status category
 * @param {Array} registrations - Array of registration objects
 * @param {string} statusCategory - Status category to filter by
 * @returns {Array} Filtered array of registrations
 */
export const filterByStatus = (registrations, statusCategory) => {
  if (!statusCategory || statusCategory === 'all') {
    return registrations;
  }

  return registrations.filter((reg) => reg.statusCategory === statusCategory);
};

/**
 * Filters registrations by organization
 * @param {Array} registrations - Array of registration objects
 * @param {string} organization - Organization to filter by
 * @returns {Array} Filtered array of registrations
 */
export const filterByOrganization = (registrations, organization) => {
  if (!organization || organization === 'all') {
    return registrations;
  }

  return registrations.filter((reg) => reg.organization === organization);
};

/**
 * Gets unique list of organizations from registrations
 * @param {Array} registrations - Array of registration objects
 * @returns {Array} Array of unique organization names
 */
export const getUniqueOrganizations = (registrations) => {
  if (!registrations || registrations.length === 0) return [];

  const organizations = registrations
    .map((reg) => reg.organization)
    .filter((org) => org && org !== '-');

  return [...new Set(organizations)].sort();
};
