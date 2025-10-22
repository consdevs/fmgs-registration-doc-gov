import React from 'react';

/**
 * Loading Spinner Component
 * Displays an animated spinner during data loading
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative">
        {/* Outer spinning circle */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>

        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        กำลังโหลดข้อมูล...
      </p>
      <p className="mt-2 text-sm text-gray-500">
        กรุณารอสักครู่
      </p>
    </div>
  );
};

export default LoadingSpinner;
