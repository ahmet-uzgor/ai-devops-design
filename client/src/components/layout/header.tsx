import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">OmniInfra</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-primary-blue transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 hover:text-primary-blue transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-600 hover:text-primary-blue transition-colors"
            >
              Testimonials
            </button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0">
              Start Free
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-primary-blue transition-colors text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-primary-blue transition-colors text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-600 hover:text-primary-blue transition-colors text-left"
              >
                Testimonials
              </button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold w-full border-0">
                Start Free
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
