export type AppInfo = { name: string; path?: string };

export type Project = {
  id: string;
  name: string;
  githubRepo?: { full_name: string };
  lastAnalysisResult?: Record<string, any>;
  envs?: Record<string, { values: Record<string, string>; updatedAt: string }>;
  domains?: Record<string, string>;
  serverId?: string;
  ciCdSetup?: boolean;
  lastDeployAt?: string | null;
};

export type ActivityItem = { id: string; text: string; at: string };

// In-memory state
let user = {
  firstName: "Alex",
  email: "alex@company.com"
};

let projects: Project[] = [
  {
    id: "proj-1",
    name: "OmniInfra Backend",
    githubRepo: undefined,
    lastAnalysisResult: undefined,
    envs: undefined,
    domains: undefined,
    serverId: undefined,
    ciCdSetup: false,
    lastDeployAt: null
  },
  {
    id: "proj-2", 
    name: "Analytics Service",
    githubRepo: { full_name: "company/analytics" },
    lastAnalysisResult: { apps: [{ name: "api" }, { name: "worker" }], isMonorepo: true },
    envs: {
      api: { values: { DATABASE_URL: "postgres://...", API_KEY: "sk-..." }, updatedAt: "2024-12-10T10:00:00Z" },
      worker: { values: { REDIS_URL: "redis://..." }, updatedAt: "2024-12-10T10:00:00Z" }
    },
    domains: { api: "api.omniinfra.co", worker: "worker.omniinfra.co" },
    serverId: "srv-analytics-1",
    ciCdSetup: true,
    lastDeployAt: "2024-12-10T15:30:00Z"
  },
  {
    id: "proj-3",
    name: "E-commerce Platform",
    githubRepo: { full_name: "company/ecommerce" },
    lastAnalysisResult: { apps: [{ name: "frontend" }, { name: "backend" }, { name: "admin" }], isMonorepo: true },
    envs: {
      frontend: { values: { API_URL: "https://api.example.com" }, updatedAt: "2024-12-09T14:20:00Z" },
      backend: { values: { DATABASE_URL: "postgres://...", STRIPE_KEY: "sk_..." }, updatedAt: "2024-12-09T14:20:00Z" }
    },
    domains: { frontend: "shop.omniinfra.co", backend: "api.shop.omniinfra.co", admin: "admin.shop.omniinfra.co" },
    serverId: "srv-ecommerce-1",
    ciCdSetup: true,
    lastDeployAt: "2024-12-09T16:45:00Z"
  },
  {
    id: "proj-4",
    name: "Marketing Website",
    githubRepo: { full_name: "company/marketing-site" },
    lastAnalysisResult: { apps: [{ name: "website" }], isMonorepo: false },
    envs: {
      website: { values: { CMS_API: "https://cms.example.com" }, updatedAt: "2024-12-08T11:30:00Z" }
    },
    domains: { website: "marketing.omniinfra.co" },
    serverId: "srv-marketing-1",
    ciCdSetup: true,
    lastDeployAt: "2024-12-08T12:15:00Z"
  },
  {
    id: "proj-5",
    name: "Mobile API Gateway",
    githubRepo: { full_name: "company/mobile-gateway" },
    lastAnalysisResult: { apps: [{ name: "gateway" }], isMonorepo: false },
    envs: undefined,
    domains: undefined,
    serverId: undefined,
    ciCdSetup: false,
    lastDeployAt: null
  },
  {
    id: "proj-6",
    name: "Data Processing Pipeline",
    githubRepo: undefined,
    lastAnalysisResult: undefined,
    envs: undefined,
    domains: undefined,
    serverId: undefined,
    ciCdSetup: false,
    lastDeployAt: null
  }
];

let activities: ActivityItem[] = [
  { id: "act-1", text: "Deployed Analytics Service to production", at: "2024-12-10T15:30:00Z" },
  { id: "act-2", text: "CI/CD pipeline configured for Analytics Service", at: "2024-12-10T14:15:00Z" },
  { id: "act-3", text: "Domain configured for Analytics Service", at: "2024-12-10T13:45:00Z" },
  { id: "act-4", text: "Environment variables added to Analytics Service", at: "2024-12-10T12:20:00Z" },
  { id: "act-5", text: "Analytics Service project analyzed", at: "2024-12-10T11:10:00Z" }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getUser(): Promise<{ firstName: string; email: string }> {
  await delay(300);
  return user;
}

export async function getProjects(): Promise<Project[]> {
  await delay(400);
  return [...projects];
}

export async function connectGithub(projectId: string): Promise<void> {
  await delay(500);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.githubRepo = { full_name: "company/omniinfra-backend" };
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Connected GitHub repository to ${project.name}`,
      at: new Date().toISOString()
    });
  }
}

export async function analyzeProject(projectId: string): Promise<void> {
  await delay(600);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.lastAnalysisResult = {
      isMonorepo: false,
      reason: "The project structure does not indicate multiple projects or packages managed within a single repository. The package.json and file structure suggest a single application focus.",
      projectType: "api-service",
      apps: [
        {
          name: "main-api",
          type: "backend",
          framework: "LoopBack",
          language: "TypeScript",
          buildTool: "webpack",
          packageManager: "npm",
          hasDockerfile: true,
          hasTests: true,
          dependencies: ["@loopback/core", "@loopback/rest", "amqplib"],
          scripts: ["build", "start", "test", "docker:build"],
          port: null
        }
      ],
      techStack: {
        languages: ["TypeScript", "JavaScript"],
        frameworks: ["LoopBack"],
        databases: [
          {
            type: "PostgreSQL",
            detected: true,
            configFiles: [".env"],
            ormFramework: "Prisma"
          }
        ],
        caching: ["Redis"],
        messageQueues: ["RabbitMQ"]
      },
      infrastructure: {
        containerization: {
          hasDockerfile: true,
          hasDockerCompose: false,
          dockerComposeServices: []
        },
        cicd: {
          hasGithubActions: true,
          hasOtherCI: false,
          workflows: ["build", "test", "deploy"]
        },
        deployment: {
          hasKubernetes: true,
          hasHelm: false,
          hasServerless: false,
          platform: "AWS"
        },
        monitoring: {
          hasLogging: true,
          hasMetrics: false,
          tools: ["Winston"]
        },
        security: {
          hasEnvFiles: false,
          hasSecrets: false,
          hasSecurityScanning: false,
          vulnerabilities: ["HTTP URLs detected (should use HTTPS)"]
        }
      },
      codeQuality: {
        linting: {
          hasESLint: true,
          hasPrettier: true,
          tools: ["ESLint", "Prettier"]
        },
        testing: {
          unitTests: true,
          integrationTests: true,
          e2eTests: false,
          testFrameworks: ["Jest"],
          coverage: true
        },
        typeSystem: {
          hasTypeScript: true,
          strict: true,
          coverage: "high"
        },
        codeStyle: {
          hasEditorConfig: false,
          hasGitHooks: true,
          hasPrettier: true
        }
      },
      performance: {
        buildOptimization: ["Tree shaking", "Code splitting"],
        caching: ["Redis caching strategies"],
        cdn: false,
        lazy_loading: false,
        bundleAnalysis: {
          tool: "webpack-bundle-analyzer",
          recommendations: ["Consider reducing bundle size by analyzing dependencies"]
        }
      },
      recommendations: {
        immediate: [
          "Switch all HTTP URLs to HTTPS to enhance security",
          "Implement environment files for configuration management"
        ],
        shortTerm: [
          "Integrate Docker Compose for local development",
          "Enhance CI/CD pipelines with additional checks"
        ],
        longTerm: [
          "Consider adopting Helm for Kubernetes deployments",
          "Implement comprehensive monitoring and metrics collection"
        ]
      },
      scores: {
        overall: 85,
        codeQuality: 90,
        infrastructure: 75,
        performance: 80,
        security: 70,
        maintainability: 85
      },
      insights: [
        "The use of TypeScript with strict settings indicates a strong emphasis on type safety and code reliability.",
        "The integration of Kubernetes suggests a forward-thinking approach to scalability and deployment."
      ],
      warnings: [
        "The absence of environment files could lead to configuration management issues.",
        "HTTP URLs pose a significant security risk and should be addressed immediately."
      ]
    };
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Analyzed ${project.name} - detected comprehensive infrastructure analysis`,
      at: new Date().toISOString()
    });
  }
}

export async function addSomeEnvs(projectId: string): Promise<void> {
  await delay(450);
  const project = projects.find(p => p.id === projectId);
  if (project && project.lastAnalysisResult?.apps && Array.isArray(project.lastAnalysisResult.apps)) {
    project.envs = {};
    const timestamp = new Date().toISOString();
    
    for (const app of project.lastAnalysisResult.apps) {
      const appName = app.name || 'app';
      project.envs[appName] = {
        values: {
          NODE_ENV: "production",
          PORT: appName === "backend" ? "5000" : "3000",
          DATABASE_URL: "postgres://prod-db.omniinfra.co/app"
        },
        updatedAt: timestamp
      };
    }
    
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Added environment variables to ${project.name}`,
      at: new Date().toISOString()
    });
  }
}

export async function configureDomainAndServer(projectId: string): Promise<void> {
  await delay(550);
  const project = projects.find(p => p.id === projectId);
  if (project && project.lastAnalysisResult?.apps && Array.isArray(project.lastAnalysisResult.apps)) {
    project.serverId = `srv-${project.name.toLowerCase().replace(/\s+/g, '-')}-1`;
    project.domains = {};
    
    for (const app of project.lastAnalysisResult.apps) {
      const appName = app.name || 'app';
      const subdomain = appName === "frontend" ? "app" : appName;
      project.domains[appName] = `${subdomain}.omniinfra.co`;
    }
    
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Configured domains and server for ${project.name}`,
      at: new Date().toISOString()
    });
  }
}

export async function setupCICD(projectId: string): Promise<{ prUrl: string }> {
  await delay(500);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.ciCdSetup = true;
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `CI/CD pipeline configured for ${project.name}`,
      at: new Date().toISOString()
    });
  }
  return { prUrl: "https://github.com/company/omniinfra-backend/pull/42" };
}

export async function deployProject(projectId: string): Promise<void> {
  await delay(600);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.lastDeployAt = new Date().toISOString();
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Successfully deployed ${project.name} to production`,
      at: new Date().toISOString()
    });
  }
}

export async function getActivity(): Promise<ActivityItem[]> {
  await delay(350);
  return activities.slice(0, 5);
}

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  await delay(600);
  // Mock GitHub repositories
  return [
    {
      id: 101,
      name: "omniinfra-backend",
      full_name: "company/omniinfra-backend",
      description: "Backend API service for OmniInfra platform",
      private: false,
      html_url: "https://github.com/company/omniinfra-backend",
      language: "TypeScript",
      stargazers_count: 42,
      updated_at: "2024-12-15T10:30:00Z"
    },
    {
      id: 102,
      name: "analytics",
      full_name: "company/analytics",
      description: "Real-time analytics and data processing pipeline",
      private: true,
      html_url: "https://github.com/company/analytics",
      language: "Python",
      stargazers_count: 15,
      updated_at: "2024-12-14T14:20:00Z"
    },
    {
      id: 103,
      name: "ecommerce",
      full_name: "company/ecommerce",
      description: "Full-stack e-commerce platform with React and Node.js",
      private: false,
      html_url: "https://github.com/company/ecommerce",
      language: "JavaScript",
      stargazers_count: 87,
      updated_at: "2024-12-13T16:45:00Z"
    },
    {
      id: 104,
      name: "marketing-site",
      full_name: "company/marketing-site",
      description: "Marketing website with CMS integration",
      private: false,
      html_url: "https://github.com/company/marketing-site",
      language: "TypeScript",
      stargazers_count: 23,
      updated_at: "2024-12-12T11:30:00Z"
    },
    {
      id: 105,
      name: "mobile-gateway",
      full_name: "company/mobile-gateway",
      description: "API gateway for mobile applications",
      private: true,
      html_url: "https://github.com/company/mobile-gateway",
      language: "Go",
      stargazers_count: 34,
      updated_at: "2024-12-11T09:15:00Z"
    },
    {
      id: 106,
      name: "data-pipeline",
      full_name: "company/data-pipeline",
      description: "ETL data processing pipeline",
      private: true,
      html_url: "https://github.com/company/data-pipeline",
      language: "Python",
      stargazers_count: 19,
      updated_at: "2024-12-10T13:20:00Z"
    },
    {
      id: 107,
      name: "auth-service",
      full_name: "company/auth-service",
      description: "Centralized authentication and authorization service",
      private: false,
      html_url: "https://github.com/company/auth-service",
      language: "TypeScript",
      stargazers_count: 56,
      updated_at: "2024-12-09T15:10:00Z"
    },
    {
      id: 108,
      name: "notification-service",
      full_name: "company/notification-service",
      description: "Multi-channel notification system",
      private: true,
      html_url: "https://github.com/company/notification-service",
      language: "JavaScript",
      stargazers_count: 12,
      updated_at: "2024-12-08T12:00:00Z"
    }
  ];
}

export async function setGitHubRepo(projectId: string, githubRepo: { full_name: string; url?: string }): Promise<void> {
  await delay(400);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.githubRepo = githubRepo;
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Connected GitHub repository ${githubRepo.full_name} to ${project.name}`,
      at: new Date().toISOString()
    });
  }
}