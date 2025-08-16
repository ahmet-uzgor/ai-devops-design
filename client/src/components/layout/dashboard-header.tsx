import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Menu, X, Home, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function DashboardHeader() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold text-gray-900">OmniInfra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className={`transition-colors ${location === "/dashboard" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              {t('navigation.dashboard', 'Dashboard')}
            </Link>
            <Link 
              href="/dashboard/projects" 
              className={`transition-colors ${location === "/dashboard/projects" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              {t('navigation.projects', 'Projects')}
            </Link>
            <Link 
              href="/dashboard/deployments" 
              className={`transition-colors ${location === "/dashboard/deployments" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              Deployments
            </Link>
            <Link 
              href="/dashboard/settings" 
              className={`transition-colors ${location === "/dashboard/settings" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
            >
              Settings
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>{t('navigation.home', 'Homepage')}</span>
            </Link>
            
            <div className="relative group">
              <Button
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                <User className="h-4 w-4" />
                <span>{user?.firstName || 'User'}</span>
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link 
                    href="/dashboard/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link
                href="/dashboard"
                className={`transition-colors text-left block ${location === "/dashboard" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/projects"
                className={`transition-colors text-left block ${location === "/dashboard/projects" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/dashboard/deployments"
                className={`transition-colors text-left block ${location === "/dashboard/deployments" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Deployments
              </Link>
              <Link
                href="/dashboard/settings"
                className={`transition-colors text-left block ${location === "/dashboard/settings" ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
              
              <hr className="my-4" />
              
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left block"
                onClick={() => setIsMenuOpen(false)}
              >
                Homepage
              </Link>
              
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-gray-600 hover:text-blue-600 transition-colors text-left block w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}