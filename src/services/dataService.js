import { FIELD_NAMES } from '../config/constants';
import { parseDaysRemaining, getStatusCategory } from '../config/statusConfig';

/**
 * Data Service - Handles loading and processing data from JSON files
 */

// Cache for loaded data
const dataCache = new Map();

/**
 * Load metadata from JSON
 * @returns {Promise<object>} Metadata object
 */
export async function loadMetadata() {
  if (dataCache.has('metadata')) {
    return dataCache.get('metadata');
  }

  try {
    const response = await fetch('/fmgs-registration-doc-gov/data/metadata.json');
    if (!response.ok) throw new Error('Failed to load metadata');

    const metadata = await response.json();
    dataCache.set('metadata', metadata);
    return metadata;
  } catch (error) {
    console.error('Error loading metadata:', error);
    throw error;
  }
}

/**
 * Load all data from JSON
 * @returns {Promise<object>} All data object (keyed by sheet name)
 */
export async function loadAllData() {
  if (dataCache.has('allData')) {
    return dataCache.get('allData');
  }

  try {
    const response = await fetch('/fmgs-registration-doc-gov/data/all-data.json');
    if (!response.ok) throw new Error('Failed to load data');

    const allData = await response.json();
    dataCache.set('allData', allData);
    return allData;
  } catch (error) {
    console.error('Error loading all data:', error);
    throw error;
  }
}

/**
 * Load data for a specific sheet
 * @param {string} sheetName - Name of the sheet
 * @returns {Promise<array>} Array of records
 */
export async function loadSheetData(sheetName) {
  const cacheKey = `sheet_${sheetName}`;

  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  try {
    const response = await fetch(`/fmgs-registration-doc-gov/data/sheets/${encodeURIComponent(sheetName)}.json`);
    if (!response.ok) throw new Error(`Failed to load sheet: ${sheetName}`);

    const data = await response.json();

    // Process data to add computed fields
    const processedData = data.map(record => processRecord(record));

    dataCache.set(cacheKey, processedData);
    return processedData;
  } catch (error) {
    console.error(`Error loading sheet ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Process a single record to add computed fields
 * @param {object} record - Raw record
 * @returns {object} Processed record
 */
function processRecord(record) {
  const daysRemainingText = record[FIELD_NAMES.DAYS_REMAINING];
  const daysRemaining = parseDaysRemaining(daysRemainingText);

  return {
    ...record,
    _daysRemaining: daysRemaining,
    _statusCategory: daysRemaining !== null ? getStatusCategory(daysRemaining) : null,
    _expiryDate: parseExpiryDate(record[FIELD_NAMES.EXPIRY_DATE]),
  };
}

/**
 * Parse expiry date from various formats
 * @param {string} dateStr - Date string
 * @returns {Date|null} Parsed date or null
 */
function parseExpiryDate(dateStr) {
  if (!dateStr) return null;

  try {
    // ISO format (from Excel export)
    if (dateStr.includes('T')) {
      return new Date(dateStr);
    }

    // Try parsing as is
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Get summary statistics for a dataset
 * @param {array} data - Array of records
 * @returns {object} Statistics object
 */
export function getStatistics(data) {
  if (!data || data.length === 0) {
    return {
      total: 0,
      expired: 0,
      critical: 0,
      warning: 0,
      nearExpiry: 0,
      normal: 0,
    };
  }

  const stats = {
    total: data.length,
    expired: 0,
    critical: 0,
    warning: 0,
    nearExpiry: 0,
    normal: 0,
  };

  data.forEach(record => {
    const category = record._statusCategory;
    if (category === 'expired') stats.expired++;
    else if (category === 'critical') stats.critical++;
    else if (category === 'warning') stats.warning++;
    else if (category === 'near-expiry') stats.nearExpiry++;
    else if (category === 'normal') stats.normal++;
  });

  return stats;
}

/**
 * Search across all data
 * @param {string} query - Search query
 * @param {object} options - Search options
 * @returns {Promise<array>} Search results
 */
export async function searchAllData(query, options = {}) {
  const allData = await loadAllData();
  const results = [];

  const {
    sheets = Object.keys(allData),
    fields = null, // Search all fields if null
    caseSensitive = false,
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();

  for (const sheetName of sheets) {
    const sheetData = allData[sheetName] || [];

    const matchingRecords = sheetData.filter(record => {
      const processedRecord = processRecord(record);

      // If specific fields specified, search only those
      if (fields && Array.isArray(fields)) {
        return fields.some(field => {
          const value = record[field];
          if (!value) return false;

          const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
          return stringValue.includes(searchQuery);
        });
      }

      // Search all fields
      return Object.entries(record).some(([key, value]) => {
        if (key.startsWith('_')) return false; // Skip internal fields
        if (!value) return false;

        const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
        return stringValue.includes(searchQuery);
      });
    });

    results.push(...matchingRecords.map(record => ({
      ...processRecord(record),
      _matchedSheet: sheetName,
    })));
  }

  return results;
}

/**
 * Filter data by status category
 * @param {array} data - Array of records
 * @param {string} category - Status category
 * @returns {array} Filtered records
 */
export function filterByStatus(data, category) {
  if (!data) return [];
  return data.filter(record => record._statusCategory === category);
}

/**
 * Sort data by field
 * @param {array} data - Array of records
 * @param {string} field - Field to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {array} Sorted data
 */
export function sortData(data, field, direction = 'asc') {
  if (!data) return [];

  const sorted = [...data].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle special fields
    if (field === '_daysRemaining') {
      aVal = aVal ?? Infinity;
      bVal = bVal ?? Infinity;
    }

    // Handle dates
    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Handle numbers
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // Handle strings
    const aStr = String(aVal || '');
    const bStr = String(bVal || '');

    return direction === 'asc'
      ? aStr.localeCompare(bStr, 'th')
      : bStr.localeCompare(aStr, 'th');
  });

  return sorted;
}

/**
 * Clear data cache (useful for refreshing data)
 */
export function clearCache() {
  dataCache.clear();
}
