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

if (!i18n.isInitialized) {
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
            "auth.getStarted": "Get Started",
            
            // Project Details Page
            "projectDetails.backToProjects": "Back to Projects",
            "projectDetails.tabs.overview": "Overview",
            "projectDetails.tabs.deployments": "Deployments",
            "projectDetails.tabs.envVars": "Environment Variables",
            "projectDetails.tabs.domains": "Domains",
            
            // Setup Progress
            "projectDetails.setupProgress.title": "Setup Progress",
            "projectDetails.setupProgress.complete": "Complete",
            
            // Quick Actions
            "projectDetails.quickActions.title": "Quick Actions",
            "projectDetails.quickActions.deploy": "Deploy Now",
            "projectDetails.quickActions.viewLogs": "View Logs",
            "projectDetails.quickActions.settings": "Settings",
            "projectDetails.quickActions.delete": "Delete Project",
            
            // Project Scores
            "projectDetails.scores.title": "Project Scores",
            "projectDetails.scores.security": "Security",
            "projectDetails.scores.performance": "Performance",
            "projectDetails.scores.reliability": "Reliability",
            "projectDetails.scores.maintainability": "Maintainability",
            
            // Analysis Sections
            "projectDetails.warnings.title": "Warnings",
            "projectDetails.recommendations.title": "Recommendations",
            "projectDetails.recommendations.high": "High Priority",
            "projectDetails.recommendations.medium": "Medium Priority",
            "projectDetails.recommendations.low": "Low Priority",
            "projectDetails.insights.title": "Insights",
            "projectDetails.techStack.title": "Tech Stack",
            "projectDetails.infrastructure.title": "Infrastructure",
            "projectDetails.codeQuality.title": "Code Quality",
            "projectDetails.performance.title": "Performance",
            "projectDetails.projectStructure.title": "Project Structure",
            
            // Tech Stack Sections
            "projectDetails.techStack.languages": "Languages",
            "projectDetails.techStack.frameworks": "Frameworks",
            "projectDetails.techStack.databases": "Databases",
            "projectDetails.techStack.caching": "Caching",
            "projectDetails.techStack.messageQueues": "Message Queues",
            "projectDetails.techStack.detected": "Detected",
            "projectDetails.techStack.notDetected": "Not Detected",
            "projectDetails.techStack.orm": "ORM",
            "projectDetails.techStack.config": "Config",
            
            // Infrastructure Sections
            "projectDetails.infrastructure.containerization": "Containerization",
            "projectDetails.infrastructure.cicd": "CI/CD",
            "projectDetails.infrastructure.deployment": "Deployment",
            "projectDetails.infrastructure.monitoring": "Monitoring",
            "projectDetails.infrastructure.security": "Security",
            "projectDetails.infrastructure.docker": "Docker",
            "projectDetails.infrastructure.kubernetes": "Kubernetes",
            "projectDetails.infrastructure.helmCharts": "Helm Charts",
            "projectDetails.infrastructure.dockerfile": "Dockerfile",
            "projectDetails.infrastructure.hasPipeline": "Has Pipeline",
            "projectDetails.infrastructure.provider": "Provider",
            "projectDetails.infrastructure.platforms": "Platforms",
            "projectDetails.infrastructure.autoScaling": "Auto Scaling",
            "projectDetails.infrastructure.containerized": "Containerized",
            "projectDetails.infrastructure.serverless": "Serverless",
            "projectDetails.infrastructure.platform": "Platform",
            "projectDetails.infrastructure.logging": "Logging",
            "projectDetails.infrastructure.metrics": "Metrics",
            "projectDetails.infrastructure.tools": "Tools",
            "projectDetails.infrastructure.envFiles": "Env Files",
            "projectDetails.infrastructure.secrets": "Secrets",
            "projectDetails.infrastructure.scanning": "Scanning",
            "projectDetails.infrastructure.vulnerabilities": "Vulnerabilities",
            "projectDetails.infrastructure.yes": "Yes",
            "projectDetails.infrastructure.no": "No",
            "projectDetails.infrastructure.enabled": "Enabled",
            "projectDetails.infrastructure.notSet": "Not Set",
            
            // Code Quality Sections
            "projectDetails.codeQuality.linting": "Linting",
            "projectDetails.codeQuality.testing": "Testing",
            "projectDetails.codeQuality.typeSystem": "Type System",
            "projectDetails.codeQuality.codeStyle": "Code Style",
            "projectDetails.codeQuality.eslint": "ESLint",
            "projectDetails.codeQuality.prettier": "Prettier",
            "projectDetails.codeQuality.configured": "Configured",
            "projectDetails.codeQuality.unitTests": "Unit Tests",
            "projectDetails.codeQuality.integration": "Integration",
            "projectDetails.codeQuality.e2eTests": "E2E Tests",
            "projectDetails.codeQuality.coverage": "Coverage",
            "projectDetails.codeQuality.frameworks": "Frameworks",
            "projectDetails.codeQuality.typescript": "TypeScript",
            "projectDetails.codeQuality.strictMode": "Strict Mode",
            "projectDetails.codeQuality.editorConfig": "EditorConfig",
            "projectDetails.codeQuality.gitHooks": "Git Hooks",
            
            // Performance Sections
            "projectDetails.performance.buildOptimizations": "Build Optimizations",
            "projectDetails.performance.cachingStrategies": "Caching Strategies",
            "projectDetails.performance.cdn": "CDN",
            "projectDetails.performance.lazyLoading": "Lazy Loading",
            "projectDetails.performance.bundleAnalysis": "Bundle Analysis",
            "projectDetails.performance.tool": "Tool",
            "projectDetails.performance.recommendations": "Recommendations",
            
            // Project Structure
            "projectDetails.structure.monorepo": "Monorepo",
            "projectDetails.structure.singleApp": "Single App",
            
            // Deployment Section
            "projectDetails.deployment.history": "Deployment History",
            "projectDetails.deployment.noDeployments": "No deployments yet",
            "projectDetails.deployment.deploy": "Deploy your project to see deployment history",
            
            // Environment Variables
            "projectDetails.envVars.title": "Environment Variables",
            "projectDetails.envVars.noVars": "No environment variables configured",
            "projectDetails.envVars.add": "Add environment variables to configure your project",
            
            // Domains
            "projectDetails.domains.title": "Custom Domains",
            "projectDetails.domains.noDomains": "No custom domains configured",
            "projectDetails.domains.add": "Add a custom domain to make your project accessible"
          }
        }
      }
    });
}

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