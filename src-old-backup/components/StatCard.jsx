import React from 'react';
import { STATUS_CONFIG } from '../config/constants';

/**
 * Stat Card Component
 * Displays a single statistic with icon, label, and count
 * @param {Object} props
 * @param {string} props.type - Status type (expired, critical, warning, normal, total)
 * @param {number} props.count - Count to display
 * @param {string} props.label - Label text
 */
const StatCard = ({ type, count, label }) => {
  // Get configuration for the status type
  const config = STATUS_CONFIG[type] || {
    emoji: '📊',
    gradient: 'from-gray-500 to-gray-600',
    textColor: 'text-gray-600',
  };

  // Special handling for "total" type
  const isTotal = type === 'total';
  const displayConfig = isTotal
    ? {
        emoji: '📊',
        gradient: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-600',
      }
    : config;

  return (
    <div className="group">
      <div
        className={`bg-gradient-to-br ${displayConfig.gradient} rounded-xl shadow-lg p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
      >
        {/* Icon */}
        <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
          {displayConfig.emoji}
        </div>

        {/* Label */}
        <h3 className="text-sm font-medium opacity-90 mb-2">{label}</h3>

        {/* Count */}
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          {count.toLocaleString()}
        </p>

        {/* Decorative element */}
        <div className="mt-4 h-1 w-16 bg-white opacity-30 rounded-full"></div>
      </div>
    </div>
  );
};

export default StatCard;
