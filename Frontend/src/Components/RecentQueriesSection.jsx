import { ChevronRight } from 'lucide-react';

const RecentQueriesSection = ({ onQuickQuery }) => {
  const recentQueries = [
    "Privacy Policy Updates 2025",
    "GDPR Compliance Requirements",
    "Data Protection Regulations",
    "Employment Law Changes",
    "Environmental Policy Framework"
  ];

  return (
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
              onClick={() => onQuickQuery(query)}
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
  );
};

export default RecentQueriesSection;