import { useState, useRef, useEffect } from 'react';
import { Search, Bot, FileText, Users, Shield, ChevronRight, Menu, X, Upload, File, Trash2, CheckCircle, Clock, User, LogOut } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const fileInputRef = useRef(null);

  // Sample user data and history (in real app, this would come from a database)
  const userData = {
    'john@example.com': {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      history: [
        {
          id: 1,
          type: 'search',
          query: 'GDPR Compliance Requirements',
          timestamp: '2025-07-10T10:30:00Z',
          result: 'Found 15 relevant documents'
        },
        {
          id: 2,
          type: 'upload',
          fileName: 'Privacy_Policy_2025.pdf',
          timestamp: '2025-07-10T09:15:00Z',
          result: 'Document analyzed successfully'
        },
        {
          id: 3,
          type: 'search',
          query: 'Data Protection Regulations',
          timestamp: '2025-07-09T14:22:00Z',
          result: 'Found 8 relevant documents'
        },
        {
          id: 4,
          type: 'upload',
          fileName: 'Employment_Contract_Template.docx',
          timestamp: '2025-07-09T11:45:00Z',
          result: 'Document analyzed successfully'
        },
        {
          id: 5,
          type: 'search',
          query: 'Environmental Policy Framework',
          timestamp: '2025-07-08T16:30:00Z',
          result: 'Found 12 relevant documents'
        }
      ]
    },
    'jane@example.com': {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password456',
      history: [
        {
          id: 1,
          type: 'search',
          query: 'Employment Law Changes',
          timestamp: '2025-07-10T13:45:00Z',
          result: 'Found 10 relevant documents'
        },
        {
          id: 2,
          type: 'upload',
          fileName: 'HR_Policy_Manual.pdf',
          timestamp: '2025-07-10T12:30:00Z',
          result: 'Document analyzed successfully'
        }
      ]
    }
  };

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = sessionStorage.getItem('policyBotUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const userAccount = userData[loginForm.email];
    
    if (userAccount && userAccount.password === loginForm.password) {
      const userSession = {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        history: userAccount.history
      };
      setUser(userSession);
      sessionStorage.setItem('policyBotUser', JSON.stringify(userSession));
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('policyBotUser');
    setUploadedFiles([]);
    setShowHistoryModal(false);
  };

  const addToHistory = (type, data) => {
    if (user) {
      const newHistoryItem = {
        id: Date.now(),
        type,
        timestamp: new Date().toISOString(),
        ...data
      };
      
      const updatedUser = {
        ...user,
        history: [newHistoryItem, ...user.history]
      };
      
      setUser(updatedUser);
      sessionStorage.setItem('policyBotUser', JSON.stringify(updatedUser));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToHistory('search', {
        query: searchQuery,
        result: `Found ${Math.floor(Math.random() * 20) + 1} relevant documents`
      });
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleQuickQuery = (query) => {
    setSearchQuery(query);
    if (user) {
      addToHistory('search', {
        query: query,
        result: `Found ${Math.floor(Math.random() * 20) + 1} relevant documents`
      });
    }
    alert(`Searching for: ${query}`);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-blue-400" />,
      title: "AI-Powered Policy Analysis",
      description: "Get instant insights and analysis on complex policy documents using advanced AI technology."
    },
    {
      icon: <FileText className="w-8 h-8 text-green-400" />,
      title: "Document Processing",
      description: "Upload and analyze policy documents, regulations, and legal texts with ease."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Collaborative Platform",
      description: "Share insights and collaborate with your team on policy research and analysis."
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-400" />,
      title: "Compliance Tracking",
      description: "Stay up-to-date with regulatory changes and ensure your organization remains compliant."
    }
  ];

  const recentQueries = [
    "Privacy Policy Updates 2025",
    "GDPR Compliance Requirements",
    "Data Protection Regulations",
    "Employment Law Changes",
    "Environmental Policy Framework"
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(fileObj => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === fileObj.id 
              ? { ...f, status: 'completed' }
              : f
          )
        );
        
        if (user) {
          addToHistory('upload', {
            fileName: fileObj.name,
            result: 'Document analyzed successfully'
          });
        }
      }, 1000 + Math.random() * 2000);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
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
                    onClick={() => setShowHistoryModal(true)}
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
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
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
                    onClick={() => setShowHistoryModal(true)}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md"
                  >
                    History
                  </button>
                  <div className="px-3 py-2 text-gray-300 border-t border-gray-600">
                    Logged in as {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
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
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="What policy information do you need?"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
            {user && (
              <button 
                onClick={() => setShowHistoryModal(true)}
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

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Powerful Features</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Streamline your policy management workflow with our comprehensive suite of AI-powered tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all hover:transform hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Queries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Popular Policy Topics</h3>
            <p className="text-gray-400">
              Explore commonly searched policy areas and regulations as of July 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuery(query)}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 text-left transition-all hover:border-blue-500 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 group-hover:text-white">{query}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-400">© 2025 Policy Bot. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Upload Policy Documents</h3>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-500 bg-opacity-10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Drop files here or click to browse</h4>
                <p className="text-gray-400 mb-4">
                  Supports PDF, DOC, DOCX, TXT files up to 10MB
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Select Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">Uploaded Files</h4>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="bg-gray-900 p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <File className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-400">{formatFileSize(file.size)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {file.status === 'uploading' && (
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          )}
                          {file.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (uploadedFiles.length > 0) {
                      alert('Documents analyzed successfully!');
                      setShowUploadModal(false);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
                  disabled={uploadedFiles.length === 0}
                >
                  Analyze Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Login to Policy Bot</h3>
                <button 
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Demo accounts:</p>
                <p className="text-xs text-gray-500">john@example.com / password123</p>
                <p className="text-xs text-gray-500">jane@example.com / password456</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Your Activity History</h3>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {user.history.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No activity history yet. Start by uploading a document or searching for policies!</p>
                  </div>
                ) : (
                  user.history.map((item) => (
                    <div key={item.id} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {item.type === 'search' ? (
                            <Search className="w-5 h-5 text-blue-400" />
                          ) : item.type === 'upload' ? (
                            <Upload className="w-5 h-5 text-green-400" />
                          ) : (
                            <FileText className="w-5 h-5 text-purple-400" />
                          )}
                          <div>
                            <h4 className="font-medium text-white">
                              {item.type === 'search' ? `Search: ${item.query}` : `Upload: ${item.fileName}`}
                            </h4>
                            <p className="text-sm text-gray-400">{formatTimestamp(item.timestamp)}</p>
                          </div>
                        </div>
                        {item.result && (
                          <div className="text-right">
                            <p className="text-sm text-gray-300">{item.result}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}