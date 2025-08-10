import { GitBranch, Brain, Settings, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: GitBranch,
      title: "Connect Repository",
      description: "Link your GitHub, GitLab, or Bitbucket repository with one click. Our platform securely accesses your codebase."
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI agents analyze your code structure, dependencies, and requirements to determine optimal deployment strategy."
    },
    {
      icon: Settings,
      title: "Auto CI/CD Setup",
      description: "Automated pipeline creation with testing, building, and deployment workflows tailored to your project needs."
    },
    {
      icon: Rocket,
      title: "Deploy & Scale",
      description: "Launch your application to production with automated scaling, monitoring, and security measures in place."
    }
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From repository connection to production deployment in four simple steps
          </p>
        </div>
        
        {/* 2x2 Card Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center mb-6 group-hover:bg-light-blue transition-colors">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-primary-blue font-bold text-sm flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
