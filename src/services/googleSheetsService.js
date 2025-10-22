import axios from 'axios';
import {
  API_BASE_URL,
  GOOGLE_SHEETS_CONFIG,
  STATUS_CATEGORIES,
  STATUS_RANGES,
  COLUMN_MAPPING,
} from '../config/constants';

/**
 * Constructs the Google Sheets API URL
 * @returns {string} Full API URL
 */
const getApiUrl = () => {
  const { SHEET_ID, SHEET_NAME, RANGE, API_KEY } = GOOGLE_SHEETS_CONFIG;
  const fullRange = `${SHEET_NAME}!${RANGE}`;
  return `${API_BASE_URL}/${SHEET_ID}/values/${fullRange}?key=${API_KEY}`;
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
 * @returns {Array} Array of registration objects
 */
const transformSheetData = (rows) => {
  if (!rows || rows.length === 0) return [];

  return rows
    .filter(row => row && row.length > 0) // Filter out empty rows
    .map((row, index) => {
      const daysRemaining = Number(row[COLUMN_MAPPING.DAYS_REMAINING]) || 0;

      return {
        id: index + 1,
        daysRemaining,
        status: row[COLUMN_MAPPING.STATUS] || '-',
        regCode: row[COLUMN_MAPPING.REG_CODE] || '-',
        regNumber: row[COLUMN_MAPPING.REG_NUMBER] || '-',
        tradeName: row[COLUMN_MAPPING.TRADE_NAME] || '-',
        regType: row[COLUMN_MAPPING.REG_TYPE] || '-',
        organization: row[COLUMN_MAPPING.ORGANIZATION] || '-',
        expiryDate: row[COLUMN_MAPPING.EXPIRY_DATE] || '-',
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
    const url = getApiUrl();
    const response = await axios.get(url);

    if (!response.data || !response.data.values) {
      throw new Error('ไม่พบข้อมูลในชีท');
    }

    const registrations = transformSheetData(response.data.values);

    // Sort by days remaining (ascending - most urgent first)
    registrations.sort((a, b) => a.daysRemaining - b.daysRemaining);

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
