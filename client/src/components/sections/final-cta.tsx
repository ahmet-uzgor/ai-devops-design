import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.3),transparent_50%)]"></div>
      
      <div className="max-w-4xl mx-auto text-center px-6 lg:px-8 animate-fade-in relative z-10">
        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
          Ready to Deploy in Minutes?
        </h2>
        <p className="text-2xl text-blue-100 mb-4 leading-relaxed font-medium">
          Don't let manual DevOps slow you down — launch your next app today.
        </p>
        <p className="text-lg text-blue-200 mb-12 leading-relaxed max-w-2xl mx-auto">
          Join thousands of teams who've streamlined their DevOps with AI-powered automation. 
          Start your free trial today and experience the future of infrastructure management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Button className="bg-white text-blue-600 px-10 py-5 rounded-2xl hover:bg-gray-50 hover:shadow-xl transition-all duration-300 font-bold text-lg border-0">
            Start Free Trial
          </Button>
          <Button variant="outline" className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl hover:bg-white/10 hover:border-white transition-all duration-300 font-medium text-lg backdrop-blur-sm">
            Schedule Demo
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 text-blue-100">
          <div className="flex items-center space-x-3">
            <Check className="h-6 w-6 text-emerald-400" />
            <span className="font-medium">No credit card required</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-6 w-6 text-emerald-400" />
            <span className="font-medium">14-day free trial</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check className="h-6 w-6 text-emerald-400" />
            <span className="font-medium">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
