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
    <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From repository connection to production deployment in four simple steps
          </p>
        </div>
        
        {/* 2x2 Card Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 animate-fade-in group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/50 to-purple-100/50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-100/30 to-blue-100/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-6 flex items-center space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i}
                          className={`h-2 rounded-full transition-all duration-500 ${
                            i <= index 
                              ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                              : 'w-4 bg-gray-200'
                          }`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
