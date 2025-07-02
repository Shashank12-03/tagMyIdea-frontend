import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-11 h-11 rounded-full object-cover shadow-md"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              TagMyIdea
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search project ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 hover:bg-gray-50 rounded-full p-2 transition-colors"
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;