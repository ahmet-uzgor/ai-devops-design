export type AppInfo = { name: string; path?: string };

export type Project = {
  id: string;
  name: string;
  githubRepo?: { full_name: string };
  lastAnalysisResult?: { apps: AppInfo[]; isMonorepo: boolean; reason?: string };
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
      apps: [{ name: "backend", path: "/server" }, { name: "frontend", path: "/client" }],
      isMonorepo: true,
      reason: "Detected multiple applications in monorepo structure"
    };
    activities.unshift({
      id: `act-${Date.now()}`,
      text: `Analyzed ${project.name} - detected 2 applications`,
      at: new Date().toISOString()
    });
  }
}

export async function addSomeEnvs(projectId: string): Promise<void> {
  await delay(450);
  const project = projects.find(p => p.id === projectId);
  if (project && project.lastAnalysisResult?.apps) {
    project.envs = {};
    const timestamp = new Date().toISOString();
    
    for (const app of project.lastAnalysisResult.apps) {
      project.envs[app.name] = {
        values: {
          NODE_ENV: "production",
          PORT: app.name === "backend" ? "5000" : "3000",
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
  if (project && project.lastAnalysisResult?.apps) {
    project.serverId = `srv-${project.name.toLowerCase().replace(/\s+/g, '-')}-1`;
    project.domains = {};
    
    for (const app of project.lastAnalysisResult.apps) {
      const subdomain = app.name === "frontend" ? "app" : app.name;
      project.domains[app.name] = `${subdomain}.omniinfra.co`;
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