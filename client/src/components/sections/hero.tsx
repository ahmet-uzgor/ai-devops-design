import { Button } from "@/components/ui/button";
import { Check, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Deploy Production-Ready
                <span className="text-primary-blue"> Infrastructure</span>
                in Minutes
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Powered by AI automation that handles deployment, scaling, and infrastructure maintenance 
                so you can focus on innovation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary-blue text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">5-minute setup</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            {/* Modern tech infrastructure visualization */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-xl">
              {/* Abstract network/infrastructure representation */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-12 bg-primary-blue rounded-lg opacity-80 animate-pulse"></div>
                <div className="h-12 bg-accent-blue rounded-lg opacity-60 animate-pulse delay-100"></div>
                <div className="h-12 bg-light-blue rounded-lg opacity-70 animate-pulse delay-200"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-16 bg-gradient-to-r from-primary-blue to-light-blue rounded-lg opacity-50"></div>
                <div className="h-16 bg-gradient-to-r from-accent-blue to-primary-blue rounded-lg opacity-60"></div>
              </div>
              <div className="h-8 bg-primary-blue rounded-lg opacity-30"></div>
              
              {/* Floating AI indicator */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                <div className="w-6 h-6 bg-primary-blue rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
