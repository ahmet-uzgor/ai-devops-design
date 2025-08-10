import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Brain, Shield, Zap, Users, Linkedin } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="bg-white pt-32 pb-20 overflow-hidden relative">
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <span className="text-sm font-medium text-blue-700">
                  About OmniInfra
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight max-w-5xl mx-auto">
                Pioneering the Future of DevOps with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  AI-Powered Automation
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                We're transforming how teams build, deploy, and manage infrastructure — faster, smarter, and more securely — with intelligent AI agents.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Our Mission
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    At OmniInfra, our mission is to democratize advanced DevOps capabilities. We empower teams of all sizes to leverage the same high-level automation once reserved for enterprise giants — without the complexity.
                  </p>
                  <p>
                    We believe the future of IT operations lies in intelligent automation that learns, adapts, and optimizes. Our AI agents are built to understand your unique infrastructure needs, ensure maximum uptime, and maintain security at scale — so you can focus on innovation, not configuration.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-slide-in-right">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">AI-Driven</h3>
                      <p className="text-sm text-gray-600 mt-2">Intelligent automation that learns and adapts</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Secure</h3>
                      <p className="text-sm text-gray-600 mt-2">Built-in security at every layer</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Fast</h3>
                      <p className="text-sm text-gray-600 mt-2">Deploy in minutes, not hours</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Scalable</h3>
                      <p className="text-sm text-gray-600 mt-2">Grows with your team and needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To become the world's most trusted AI-driven infrastructure platform, enabling any developer, anywhere to deploy production-ready applications in minutes, not months.
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                What Makes Us Different
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI-First Architecture</h3>
                <p className="text-gray-600 leading-relaxed">
                  Not just scripts, but intelligent systems that analyze, decide, and act.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Speed Without Sacrificing Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure by design, from pipelines to production.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Predictive Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  We don't just respond to issues, we prevent them.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Human + AI Synergy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Built for teams that want control and visibility without operational bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Founded by a team of backend and frontend engineers who had seen too many teams struggle with manual DevOps, OmniInfra started as an internal tool to speed up deployments.
                  </p>
                  <p>
                    What began as a time-saving experiment quickly became a full-fledged platform used by teams to cut deployment times from hours to minutes — all with built-in scaling, monitoring, and security.
                  </p>
                </div>
              </div>
              
              <div className="relative animate-slide-in-right">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                      <span className="text-blue-100">2022 - Founded</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                      <span className="text-blue-100">2023 - First AI automation</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                      <span className="text-blue-100">2024 - Enterprise adoption</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                      <span className="font-semibold">2025 - Full platform launch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the experienced engineers and leaders driving the future of DevOps automation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Chen",
                  role: "CEO & Co-Founder",
                  bio: "Led 500+ successful infrastructure deployments. Former Principal Engineer at major cloud providers.",
                  initials: "AC"
                },
                {
                  name: "Sarah Rodriguez",
                  role: "CTO & Co-Founder", 
                  bio: "Built and scaled cloud platforms for fintech industry. 15+ years in distributed systems.",
                  initials: "SR"
                },
                {
                  name: "Marcus Johnson",
                  role: "VP of Engineering",
                  bio: "Former Tech Lead at unicorn startups. Expert in AI/ML infrastructure and automation.",
                  initials: "MJ"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-6">{member.bio}</p>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:border-blue-300">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.3),transparent_50%)]"></div>

          <div className="max-w-4xl mx-auto text-center px-6 lg:px-8 animate-fade-in relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Want to see how OmniInfra can transform your DevOps?
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
              Join the teams already using AI-powered automation to deploy faster, scale smarter, and focus on what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                data-testid="button-start-free-trial"
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-bold text-lg border-0"
              >
                Start Free Trial
              </Button>
              <Button 
                data-testid="button-book-demo"
                className="bg-transparent border-2 border-white/30 px-10 py-5 rounded-2xl transition-all duration-300 font-medium text-lg backdrop-blur-sm text-white hover:bg-white/10"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}