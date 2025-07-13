import { X, Clock, Search, Upload, FileText } from 'lucide-react';

const HistoryModal = ({ isOpen, onClose, user }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Activity History</h3>
            <button 
              onClick={onClose}
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
  );
};

export default HistoryModal;
