import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define resources directly to avoid import issues
const resources = {
  en: { 
    translation: {} // Will be loaded dynamically
  },
  es: { 
    translation: {} // Will be loaded dynamically
  },
  fr: { 
    translation: {} // Will be loaded dynamically
  },
  de: { 
    translation: {} // Will be loaded dynamically
  },
  zh: { 
    translation: {} // Will be loaded dynamically
  },
  ja: { 
    translation: {} // Will be loaded dynamically
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.MODE === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },

    // Load translations dynamically
    resources: {
      en: {
        translation: {
          // Basic fallback translations
          "common.loading": "Loading...",
          "navigation.home": "Home",
          "navigation.about": "About",
          "navigation.contact": "Contact", 
          "navigation.dashboard": "Dashboard",
          "navigation.projects": "Projects",
          "navigation.login": "Sign In",
          "projects.title": "Projects",
          "dashboard.title": "Dashboard",
          "features.title": "Features",
          "howItWorks.title": "How It Works", 
          "testimonials.title": "Testimonials",
          "auth.getStarted": "Get Started"
        }
      }
    }
  });

export default i18n;

// Language options for the language selector
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];