import { Bot, FileText, Users, Shield } from 'lucide-react';

const FeaturesSection = () => {
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

  return (
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
  );
};

export default FeaturesSection;