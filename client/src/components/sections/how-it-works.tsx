export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Connect Repository",
      description: "Link your GitHub, GitLab, or Bitbucket repository with one click. Our platform securely accesses your codebase."
    },
    {
      number: 2,
      title: "AI Analysis",
      description: "Our AI agents analyze your code structure, dependencies, and requirements to determine optimal deployment strategy."
    },
    {
      number: 3,
      title: "Auto CI/CD Setup",
      description: "Automated pipeline creation with testing, building, and deployment workflows tailored to your project needs."
    },
    {
      number: 4,
      title: "Deploy & Scale",
      description: "Launch your application to production with automated scaling, monitoring, and security measures in place."
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From repository connection to production deployment in four simple steps
          </p>
        </div>
        
        {/* Linear Timeline Flow */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative text-center lg:text-left animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue text-white rounded-full text-xl font-bold mb-6 relative z-10 hover:bg-light-blue transition-colors">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
