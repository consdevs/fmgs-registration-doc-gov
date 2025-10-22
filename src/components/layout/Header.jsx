import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, FileText } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">FMGS Registry</h1>
                <p className="text-xs text-gray-500">ระบบจัดการทะเบียน</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ค้นหาทะเบียน, ชื่อผลิตภัณฑ์, เลขทะเบียน..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="หน้าหลัก"
            >
              <Home className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
