// File: components/Header.jsx
import { useState } from 'react';
import { Bot, Menu, X, Clock, User, LogOut } from 'lucide-react';

const Header = ({ user, onLogin, onLogout, onShowHistory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Policy Bot</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Documents</a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onShowHistory}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>History</span>
                </button>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 border-t border-gray-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md">Dashboard</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md">Analytics</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md">Documents</a>
            
            {user ? (
              <>
                <button
                  onClick={onShowHistory}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md"
                >
                  History
                </button>
                <div className="px-3 py-2 text-gray-300 border-t border-gray-600">
                  Logged in as {user.name}
                </div>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;