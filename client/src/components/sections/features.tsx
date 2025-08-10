import { Brain, TrendingUp, Maximize, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "Autonomous AI Agents",
      description: "Our intelligent agents analyze your code, set up CI/CD pipelines, and configure secure, production-ready environments instantly without manual intervention."
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Advanced analytics anticipate issues before they happen, ensuring your operations run smoothly with proactive monitoring and automated resolution."
    },
    {
      icon: Maximize,
      title: "Dynamic Auto-Scaling",
      description: "Keep your resources optimized with intelligent scaling that responds to real-time demand, ensuring peak performance while minimizing costs."
    },
    {
      icon: Shield,
      title: "Built-in Security Automation",
      description: "Continuous threat detection and automated response systems protect your infrastructure 24/7 without requiring manual security management."
    }
  ];

  return (
    <section id="features" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose OmniInfra</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI-driven infrastructure management that adapts to your needs
          </p>
        </div>
        
        {/* 2x2 Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
