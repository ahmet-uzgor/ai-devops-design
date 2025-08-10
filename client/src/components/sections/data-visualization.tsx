import { Activity, Database, Server, Shield, TrendingUp, Zap } from "lucide-react";

export default function DataVisualization() {
  const metrics = [
    { icon: Server, label: "Active Deployments", value: "2,847", color: "from-blue-500 to-cyan-500" },
    { icon: Database, label: "Data Processed", value: "15.2TB", color: "from-green-500 to-emerald-500" },
    { icon: Shield, label: "Security Scans", value: "99.9%", color: "from-purple-500 to-violet-500" },
    { icon: TrendingUp, label: "Performance Boost", value: "340%", color: "from-orange-500 to-amber-500" },
    { icon: Zap, label: "Response Time", value: "12ms", color: "from-pink-500 to-rose-500" },
    { icon: Activity, label: "Uptime", value: "99.99%", color: "from-indigo-500 to-blue-500" }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-32 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-green-500/20 rounded-full blur-lg animate-ping"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            Real-Time Infrastructure
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Analytics</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Monitor your entire infrastructure ecosystem with AI-powered insights and predictive analytics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="h-7 w-7 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-400 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Central Dashboard Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chart Visualization */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Performance Overview</h3>
              
              {/* Animated bars */}
              <div className="space-y-4">
                {['CPU Usage', 'Memory', 'Network', 'Storage'].map((label, index) => (
                  <div key={label} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>{label}</span>
                      <span>{Math.floor(Math.random() * 40 + 60)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${metrics[index]?.color || 'from-blue-500 to-cyan-500'} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${Math.floor(Math.random() * 40 + 60)}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network Visualization */}
            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Network nodes */}
                <circle cx="200" cy="150" r="8" fill="url(#centralGradient)" className="animate-pulse"/>
                <circle cx="100" cy="80" r="6" fill="#3B82F6" className="animate-ping" style={{animationDelay: '0.5s'}}/>
                <circle cx="300" cy="80" r="6" fill="#10B981" className="animate-ping" style={{animationDelay: '1s'}}/>
                <circle cx="80" cy="220" r="6" fill="#8B5CF6" className="animate-ping" style={{animationDelay: '1.5s'}}/>
                <circle cx="320" cy="220" r="6" fill="#F59E0B" className="animate-ping" style={{animationDelay: '2s'}}/>
                
                {/* Connections */}
                <line x1="200" y1="150" x2="100" y2="80" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse"/>
                <line x1="200" y1="150" x2="300" y2="80" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
                <line x1="200" y1="150" x2="80" y2="220" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
                <line x1="200" y1="150" x2="320" y2="220" stroke="url(#connectionGradient)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
                
                <defs>
                  <radialGradient id="centralGradient">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="100%" stopColor="#8B5CF6"/>
                  </radialGradient>
                  <linearGradient id="connectionGradient">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Status indicators */}
              <div className="absolute top-4 right-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All Systems Operational</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  <span>Auto-scaling Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}