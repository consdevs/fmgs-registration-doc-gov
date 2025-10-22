// Application Constants

export const APP_NAME = 'FMGS Registration System';
export const APP_VERSION = '2.0.0';

// Pagination
export const ITEMS_PER_PAGE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Status Categories (based on days remaining)
export const STATUS_CATEGORIES = {
  EXPIRED: 'expired', // < 0 days
  CRITICAL: 'critical', // 0-30 days
  WARNING: 'warning', // 31-90 days
  NEAR_EXPIRY: 'near-expiry', // 91-180 days
  NORMAL: 'normal', // > 180 days
};

// Sheet Names (from Excel)
export const SHEET_NAMES = {
  MAIN: 'ทะเบียนหลัก',
  APPROVED_OLD: 'ทะเบียนที่ได้รับแล้วO',
  APPROVED: 'ทะเบียนที่ได้รับแล้ว',
  AGRICULTURE: 'กรมวิชาการเกษตร',
  CROP: 'crop ของ เกษตร',
  FDA: 'อย',
  LIVESTOCK: 'กรมปศุสัตว์',
  FISHERIES: 'กรมประมง',
  TRADEMARK: 'เครื่องหมายการค้า',
  FERTILIZER: 'ปุ๋ย',
  INDUSTRIAL: 'อุตสาหกรรม',
  REG_TYPES: 'ประเภททะเบียน',
  COMPANIES: 'ชื่อบรษัทและยี่ห้อที่ขอยื่น',
  DEPARTMENTS: 'รายชื่อกรม',
};

// Display names for sheets
export const SHEET_DISPLAY_NAMES = {
  [SHEET_NAMES.MAIN]: 'ทะเบียนหลัก',
  [SHEET_NAMES.APPROVED_OLD]: 'ทะเบียนที่ได้รับ (เก่า)',
  [SHEET_NAMES.APPROVED]: 'ทะเบียนที่ได้รับ',
  [SHEET_NAMES.AGRICULTURE]: 'กรมวิชาการเกษตร',
  [SHEET_NAMES.CROP]: 'ข้อมูลพืช',
  [SHEET_NAMES.FDA]: 'อย.',
  [SHEET_NAMES.LIVESTOCK]: 'กรมปศุสัตว์',
  [SHEET_NAMES.FISHERIES]: 'กรมประมง',
  [SHEET_NAMES.TRADEMARK]: 'เครื่องหมายการค้า',
  [SHEET_NAMES.FERTILIZER]: 'ปุ๋ย',
  [SHEET_NAMES.INDUSTRIAL]: 'อุตสาหกรรม',
  [SHEET_NAMES.REG_TYPES]: 'ประเภททะเบียน',
  [SHEET_NAMES.COMPANIES]: 'บริษัท/ยี่ห้อ',
  [SHEET_NAMES.DEPARTMENTS]: 'หน่วยงาน',
};

// Common field names (Thai)
export const FIELD_NAMES = {
  DAYS_REMAINING: 'ทะเบียนจำนวนวันขาด / เหลืออีก',
  STATUS: 'สถานะทะเบียน',
  REG_NUMBER: 'เลขทะเบียน',
  EXPIRY_DATE: 'วันหมดอายุทะเบียน',
  TRADE_NAME: 'ชื่อการค้า',
  CHEMICAL_NAME: 'ชื่อสารเคมีที่ขอ',
  REG_TYPE: 'ประเภททะเบียน',
  DEPARTMENT: 'หน่วยงานที่ขึ้นทะเบียน',
  APPLICANT: 'ผู้ขอขึ้นทะเบียน',
  DISTRIBUTOR: 'ผู้จัดจำหน่าย',
  DOCUMENT_LINK: 'PCT.',
  PROCESS_STATUS: 'ขั้นดำเนินการ',
};

// Search operators
export const SEARCH_OPERATORS = {
  CONTAINS: 'contains',
  EXACT: 'exact',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
};

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  ISO: 'yyyy-MM-dd',
  THAI: 'dd MMMM yyyy',
};

// API Configuration (for future Google Sheets integration)
export const GOOGLE_SHEETS_CONFIG = {
  API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEETS_SHEET_ID || '1BvX6lFsf3HrDvlopXt7PiyccVNM6-G1fNTIge3A_u6Y',
};

// Supabase Configuration (for Phase 2)
export const SUPABASE_CONFIG = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Export options
export const EXPORT_FORMATS = {
  XLSX: 'xlsx',
  CSV: 'csv',
  JSON: 'json',
  PDF: 'pdf',
};

// Cache keys
export const CACHE_KEYS = {
  SHEET_DATA: 'sheet_data',
  METADATA: 'metadata',
  USER_PREFERENCES: 'user_preferences',
  COLUMN_SETTINGS: 'column_settings',
};
