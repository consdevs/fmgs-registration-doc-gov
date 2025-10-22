import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import RegistrationList from './components/RegistrationList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import {
  getRegistrations,
  getStatistics,
  searchRegistrations,
} from './services/googleSheetsService';

/**
 * Main App Component
 * Manages the application state and orchestrates all child components
 */
function App() {
  // State management
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    expired: 0,
    critical: 0,
    warning: 0,
    normal: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Fetches registration data from Google Sheets
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch registrations
      const data = await getRegistrations();
      setRegistrations(data);
      setFilteredRegistrations(data);

      // Calculate statistics
      const stats = getStatistics(data);
      setStatistics(stats);

      setLoading(false);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  /**
   * Handles search functionality
   * @param {string} term - Search term
   */
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term || term.trim() === '') {
      // Reset to show all registrations
      setFilteredRegistrations(registrations);
      setStatistics(getStatistics(registrations));
    } else {
      // Filter registrations based on search term
      const filtered = searchRegistrations(registrations, term);
      setFilteredRegistrations(filtered);
      setStatistics(getStatistics(filtered));
    }
  };

  /**
   * Handles retry after error
   */
  const handleRetry = () => {
    fetchData();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Show loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error message
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                📋 ระบบจัดการทะเบียนผลิตภัณฑ์
              </h1>
              <p className="text-blue-100 text-sm sm:text-base">
                Registration Management System
              </p>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchData}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
              title="รีเฟรชข้อมูล"
            >
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden md:inline">รีเฟรช</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Statistics */}
        <Dashboard stats={statistics} />

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Results Summary */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600 bg-white rounded-lg px-4 py-3 shadow">
            พบ <span className="font-bold text-blue-600">{filteredRegistrations.length}</span>{' '}
            รายการจากทั้งหมด <span className="font-bold">{registrations.length}</span> รายการ
          </div>
        )}

        {/* Registration List */}
        <RegistrationList registrations={filteredRegistrations} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ระบบจัดการทะเบียนผลิตภัณฑ์
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Powered by React + Vite + Tailwind CSS + Google Sheets API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
