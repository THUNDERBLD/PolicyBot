import { Bot, Search, Upload, Clock } from 'lucide-react';

const HeroSection = ({ searchQuery, onSearchChange, onSearch, onUpload, onShowHistory, user }) => {
  const handleQuickQuery = (query) => {
    onSearch(query);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Policy Bot
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your intelligent assistant for policy analysis, compliance tracking, and regulatory insights as of July 11, 2025. 
            Simplify complex policy documents with AI-powered analysis.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <form onSubmit={onSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="What policy information do you need?"
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
              value={searchQuery}
              onChange={onSearchChange}
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ask Policy Bot
            </button>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={onUpload}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
          {user && (
            <button 
              onClick={onShowHistory}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-colors flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>View History</span>
            </button>
          )}
          <button 
            onClick={() => handleQuickQuery('Policy search')}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-colors"
          >
            🔍 Search Policies
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-colors">
            📊 View Analytics
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;