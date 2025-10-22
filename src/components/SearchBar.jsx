import React, { useState } from 'react';

/**
 * Search Bar Component
 * Provides search functionality for registrations
 * @param {Object} props
 * @param {Function} props.onSearch - Callback function when search is performed
 * @param {string} props.placeholder - Placeholder text for search input
 */
const SearchBar = ({ onSearch, placeholder = '🔍 ค้นหาเลขทะเบียนหรือชื่อการค้า...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Real-time search
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-5 py-3 pl-12 text-gray-700 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              ค้นหา
            </button>

            {/* Clear Button - Only show when there's search term */}
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* Search Results Count */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-semibold">คำค้นหา:</span> "{searchTerm}"
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
