import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-primary-blue py-24">
      <div className="max-w-4xl mx-auto text-center px-6 lg:px-8 animate-fade-in">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Deploy in Minutes?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of teams who've streamlined their DevOps with AI-powered automation. 
          Start your free trial today and experience the future of infrastructure management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button className="bg-white text-primary-blue px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg">
            Start Free Trial
          </Button>
          <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-blue transition-colors font-semibold text-lg">
            Schedule Demo
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-blue-100">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
