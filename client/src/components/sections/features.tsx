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
    <section id="features" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose OmniInfra</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI-driven infrastructure management that adapts to your needs
          </p>
        </div>
        
        {/* 2x2 Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center mb-6 group-hover:bg-light-blue transition-colors">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
