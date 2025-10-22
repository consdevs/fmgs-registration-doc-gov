/**
 * Application Constants
 */

// Google Sheets Configuration
export const GOOGLE_SHEETS_CONFIG = {
  API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEETS_SHEET_ID || '1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y',
  SHEET_NAME: 'ทะเบียนหลัก',
  RANGE: 'A2:H', // Start from row 2 to skip headers
};

// API Endpoint
export const API_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

// Status Categories
export const STATUS_CATEGORIES = {
  EXPIRED: 'expired',
  CRITICAL: 'critical',
  WARNING: 'warning',
  NORMAL: 'normal',
};

// Day Ranges for Status
export const STATUS_RANGES = {
  EXPIRED: { min: -Infinity, max: -1 },
  CRITICAL: { min: 0, max: 30 },
  WARNING: { min: 31, max: 90 },
  NORMAL: { min: 91, max: Infinity },
};

// Status Display Configuration
export const STATUS_CONFIG = {
  expired: {
    label: 'ขาดอายุ',
    color: 'bg-red-500',
    gradient: 'from-red-500 to-red-600',
    textColor: 'text-red-600',
    emoji: '🔴',
  },
  critical: {
    label: 'วิกฤติ',
    color: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-600',
    emoji: '🟠',
  },
  warning: {
    label: 'ระวัง',
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-yellow-600',
    textColor: 'text-yellow-600',
    emoji: '🟡',
  },
  normal: {
    label: 'ปกติ',
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    textColor: 'text-green-600',
    emoji: '🟢',
  },
};

// Pagination
export const ITEMS_PER_PAGE = 20;

// Column Mapping (based on Google Sheets columns)
export const COLUMN_MAPPING = {
  DAYS_REMAINING: 0,      // Column A
  STATUS: 1,              // Column B
  REG_CODE: 2,            // Column C
  REG_NUMBER: 3,          // Column D
  TRADE_NAME: 4,          // Column E
  REG_TYPE: 5,            // Column F
  ORGANIZATION: 6,        // Column G
  EXPIRY_DATE: 7,         // Column H
};
