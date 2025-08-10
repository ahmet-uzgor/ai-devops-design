import { Button } from "@/components/ui/button";
import { Check, Play } from "lucide-react";
import { FloatingElements } from "@/components/ui/floating-elements";

export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-32 overflow-hidden relative">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
              <span className="text-sm font-medium text-blue-700">
                AI-Powered DevOps Platform
              </span>
            </div>

            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Deploy Production-Ready
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Infrastructure
                </span>
                in Minutes
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Powered by AI automation that handles deployment, scaling, and
                infrastructure maintenance so you can focus on innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg border-0">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-600 font-medium">
                  No credit card required
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-600 font-medium">
                  5-minute setup
                </span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right">
            {/* Modern dashboard mockup */}
            <div className="relative">
              {/* Main dashboard container */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500 font-mono">
                    omniinfra.dev
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="space-y-6">
                  {/* Metrics cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="text-sm text-blue-600 font-medium">
                        Deployments
                      </div>
                      <div className="text-2xl font-bold text-blue-900">
                        1,247
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                      <div className="text-sm text-green-600 font-medium">
                        Uptime
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        99.9%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                      <div className="text-sm text-purple-600 font-medium">
                        Saved
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        127h
                      </div>
                    </div>
                  </div>

                  {/* Chart area */}
                  <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20"></div>
                    <svg className="w-full h-full" viewBox="0 0 300 120">
                      <path
                        d="M0,80 Q75,20 150,40 T300,30"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                      />
                      <path
                        d="M0,100 Q100,60 200,70 T300,50"
                        stroke="url(#gradient2)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <circle
                        cx="150"
                        cy="40"
                        r="4"
                        fill="url(#gradient)"
                        className="animate-bounce"
                        style={{ animationDelay: "1s" }}
                      />
                      <circle
                        cx="75"
                        cy="20"
                        r="3"
                        fill="#10B981"
                        className="animate-ping"
                        style={{ animationDelay: "1.5s" }}
                      />
                      <circle
                        cx="225"
                        cy="35"
                        r="3"
                        fill="#F59E0B"
                        className="animate-pulse"
                        style={{ animationDelay: "2s" }}
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                        <linearGradient
                          id="gradient2"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Status indicators */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600 font-medium">
                        Live
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                      <span className="text-xs text-gray-600 font-medium">
                        Auto-scaling
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <span className="text-xs text-gray-600 font-medium">
                        Optimizing
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 shadow-xl animate-bounce">
                <div className="text-white font-bold text-sm">AI</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">
                    Auto-scaling active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
