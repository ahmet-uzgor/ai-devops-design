import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

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
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">OmniInfra</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {location === "/" ? (
              <>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('features.title', 'Features')}
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('howItWorks.title', 'How It Works')}
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('testimonials.title', 'Testimonials')}
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('navigation.home', 'Home')}
                </Link>
              </>
            )}
            <Link 
              href="/about" 
              className={`transition-colors ${location === "/about" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              {t('navigation.about', 'About')}
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors ${location === "/contact" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              {t('navigation.contact', 'Contact')}
            </Link>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {t('navigation.login', 'Sign In')}
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0">
                  {t('auth.getStarted', 'Get Started')}
                </Button>
              </Link>
            </div>
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
              {location === "/" ? (
                <>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    Testimonials
                  </button>
                </>
              ) : (
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              )}
              <Link 
                href="/about" 
                className={`transition-colors text-left ${location === "/about" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors text-left ${location === "/contact" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="space-y-3">
                <Link 
                  href="/login" 
                  className="text-gray-600 hover:text-blue-600 transition-colors text-left font-medium block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold w-full border-0">
                    Start Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
