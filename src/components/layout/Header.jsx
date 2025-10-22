import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, FileText, User, LogOut, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { isSupabaseConfigured } from '../../services/supabase';

function Header() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const { user, isAuthenticated, signOut, initialize } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      initialize();
    }
  }, [initialize]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
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

            {/* Auth Section */}
            {isSupabaseConfigured() && (
              <>
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium">
                        {user.user_metadata?.display_name || user.email}
                      </span>
                    </button>

                    {/* User Menu Dropdown */}
                    {showUserMenu && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowUserMenu(false)}
                        />
                        {/* Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user.user_metadata?.display_name || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={handleSignOut}
                            className="w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>ออกจากระบบ</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">เข้าสู่ระบบ</span>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
