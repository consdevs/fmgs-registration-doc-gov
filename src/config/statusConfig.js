import { STATUS_CATEGORIES } from './constants';

// Status configuration with colors and labels
export const statusConfig = {
  [STATUS_CATEGORIES.EXPIRED]: {
    label: 'ขาดอายุ',
    labelEn: 'Expired',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-300',
    badge: 'badge-expired',
    icon: '⚠️',
    priority: 5, // Highest priority
  },
  [STATUS_CATEGORIES.CRITICAL]: {
    label: 'วิกฤติ (0-30 วัน)',
    labelEn: 'Critical (0-30 days)',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-300',
    badge: 'badge-critical',
    icon: '🔴',
    priority: 4,
  },
  [STATUS_CATEGORIES.WARNING]: {
    label: 'ระวัง (31-90 วัน)',
    labelEn: 'Warning (31-90 days)',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-300',
    badge: 'badge-warning',
    icon: '⚡',
    priority: 3,
  },
  [STATUS_CATEGORIES.NEAR_EXPIRY]: {
    label: 'ใกล้หมด (91-180 วัน)',
    labelEn: 'Near Expiry (91-180 days)',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    badge: 'badge-near-expiry',
    icon: 'ℹ️',
    priority: 2,
  },
  [STATUS_CATEGORIES.NORMAL]: {
    label: 'ปกติ (>180 วัน)',
    labelEn: 'Normal (>180 days)',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-300',
    badge: 'badge-normal',
    icon: '✅',
    priority: 1, // Lowest priority
  },
};

/**
 * Get status category based on days remaining
 * @param {number} daysRemaining - Number of days until expiry
 * @returns {string} Status category
 */
export function getStatusCategory(daysRemaining) {
  if (daysRemaining < 0) return STATUS_CATEGORIES.EXPIRED;
  if (daysRemaining <= 30) return STATUS_CATEGORIES.CRITICAL;
  if (daysRemaining <= 90) return STATUS_CATEGORIES.WARNING;
  if (daysRemaining <= 180) return STATUS_CATEGORIES.NEAR_EXPIRY;
  return STATUS_CATEGORIES.NORMAL;
}

/**
 * Get status config for a given days remaining
 * @param {number} daysRemaining - Number of days until expiry
 * @returns {object} Status configuration
 */
export function getStatusConfig(daysRemaining) {
  const category = getStatusCategory(daysRemaining);
  return statusConfig[category];
}

/**
 * Parse days remaining from Thai text
 * Examples:
 * - "ทะเบียนขาด 3217 วัน" -> -3217
 * - "0 ปี 11 เดือน 29 วัน หรือเหลืออีก 364 วัน" -> 364
 * - "ทะเบียนเหลือ 120 วัน" -> 120
 * @param {string} text - Thai text containing days information
 * @returns {number|null} Days remaining (negative if expired)
 */
export function parseDaysRemaining(text) {
  if (!text || typeof text !== 'string') return null;

  // Check for "ขาด" (expired)
  const expiredMatch = text.match(/ขาด\s*(\d+)\s*วัน/);
  if (expiredMatch) {
    return -parseInt(expiredMatch[1], 10);
  }

  // Check for "เหลืออีก" (remaining)
  const remainingMatch = text.match(/เหลืออีก\s*(\d+)\s*วัน/);
  if (remainingMatch) {
    return parseInt(remainingMatch[1], 10);
  }

  // Check for "เหลือ" (remaining, simpler form)
  const simpleMatch = text.match(/เหลือ\s*(\d+)\s*วัน/);
  if (simpleMatch) {
    return parseInt(simpleMatch[1], 10);
  }

  return null;
}

/**
 * Format days remaining to Thai text
 * @param {number} days - Days remaining (negative if expired)
 * @returns {string} Formatted Thai text
 */
export function formatDaysRemaining(days) {
  if (days === null || days === undefined) return '-';

  if (days < 0) {
    return `ขาดอายุแล้ว ${Math.abs(days)} วัน`;
  }

  if (days === 0) {
    return 'หมดอายุวันนี้';
  }

  // Convert to years, months, days
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainingDays = days % 30;

  const parts = [];
  if (years > 0) parts.push(`${years} ปี`);
  if (months > 0) parts.push(`${months} เดือน`);
  if (remainingDays > 0 || parts.length === 0) parts.push(`${remainingDays} วัน`);

  return parts.join(' ') + ` (เหลืออีก ${days} วัน)`;
}
