import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DashboardCard, DashboardCardHeader, DashboardCardContent, DashboardCardTitle } from '@/components/ui/dashboard-card';
import { Badge } from '@/components/ui/dashboard-badge';
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/ToastProvider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import {
  getUser,
  getProjects,
  getActivity,
  connectGithub,
  analyzeProject,
  addSomeEnvs,
  configureDomainAndServer,
  setupCICD,
  deployProject,
  type Project,
  type ActivityItem
} from '@/lib/fakeApi';
import { 
  Github, 
  Search, 
  Settings, 
  Globe, 
  GitBranch, 
  Rocket, 
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface ChecklistStep {
  id: string;
  label: string;
  icon: any;
  completed: boolean;
  action: () => Promise<void>;
  buttonText: string;
}

export default function Dashboard() {
  const { success, error } = useToast();
  const [user, setUser] = useState<{ firstName: string; email: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const primaryProject = projects[0] || null;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, projectsData, activitiesData] = await Promise.all([
        getUser(),
        getProjects(),
        getActivity()
      ]);
      setUser(userData);
      setProjects(projectsData);
      setActivities(activitiesData);
    } catch (err) {
      error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (stepId: string, action: () => Promise<void>, successMessage: string) => {
    try {
      setActionLoading(stepId);
      await action();
      success(successMessage);
      await loadData();
    } catch (err) {
      error('Action failed. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const getChecklistSteps = (project: Project | null): ChecklistStep[] => {
    if (!project) return [];

    const apps = project.lastAnalysisResult?.apps || [];
    const hasAllEnvs = apps.length > 0 && apps.every(app => 
      project.envs?.[app.name]?.values && Object.keys(project.envs[app.name].values).length > 0
    );
    const hasAllDomains = apps.length > 0 && apps.every(app => 
      project.domains?.[app.name]
    );

    return [
      {
        id: 'github',
        label: 'Connect GitHub',
        icon: Github,
        completed: !!project.githubRepo?.full_name,
        action: () => connectGithub(project.id),
        buttonText: 'Connect Repository'
      },
      {
        id: 'analyze',
        label: 'Analyze Project',
        icon: Search,
        completed: !!project.lastAnalysisResult?.apps?.length,
        action: () => analyzeProject(project.id),
        buttonText: 'Run Analysis'
      },
      {
        id: 'envs',
        label: 'Add Environment Variables',
        icon: Settings,
        completed: hasAllEnvs,
        action: () => addSomeEnvs(project.id),
        buttonText: 'Configure Envs'
      },
      {
        id: 'domain',
        label: 'Domain & Server Setup',
        icon: Globe,
        completed: !!project.serverId && hasAllDomains,
        action: () => configureDomainAndServer(project.id),
        buttonText: 'Setup Infrastructure'
      },
      {
        id: 'cicd',
        label: 'Set up CI/CD Pipeline',
        icon: GitBranch,
        completed: !!project.ciCdSetup,
        action: async () => { await setupCICD(project.id); },
        buttonText: 'Configure CI/CD'
      },
      {
        id: 'deploy',
        label: 'Deploy to Production',
        icon: Rocket,
        completed: !!project.lastDeployAt,
        action: () => deployProject(project.id),
        buttonText: 'Deploy Now'
      }
    ];
  };

  const checklistSteps = getChecklistSteps(primaryProject);
  const completedSteps = checklistSteps.filter(step => step.completed).length;

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            {loading ? (
              <Skeleton className="h-8 w-64 mb-2" />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome{user?.firstName ? `, ${user.firstName}` : ' back'}
              </h1>
            )}
            <p className="text-lg text-gray-600">
              Let's get your DevOps infrastructure up and running
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Getting Started Checklist */}
              <DashboardCard>
                <DashboardCardHeader>
                  <div className="flex items-center justify-between">
                    <DashboardCardTitle>Getting Started</DashboardCardTitle>
                    {loading ? (
                      <Skeleton className="h-6 w-20" />
                    ) : (
                      <Badge variant={completedSteps === checklistSteps.length ? 'success' : 'info'}>
                        {completedSteps}/{checklistSteps.length} Complete
                      </Badge>
                    )}
                  </div>
                  {!loading && primaryProject && (
                    <p className="text-sm text-gray-600 mt-2">
                      Project: <span className="font-medium">{primaryProject.name}</span>
                    </p>
                  )}
                </DashboardCardHeader>
                <DashboardCardContent>
                  {loading ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} className="p-4" />
                      ))}
                    </div>
                  ) : !primaryProject ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No projects found. Create your first project to get started.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {checklistSteps.map((step) => {
                        const Icon = step.icon;
                        const isLoading = actionLoading === step.id;
                        
                        return (
                          <div key={step.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${step.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                                {step.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Icon className="h-5 w-5 text-gray-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-900">{step.label}</h4>
                                  <Badge variant={step.completed ? 'success' : 'warning'}>
                                    {step.completed ? 'Done' : 'Action needed'}
                                  </Badge>
                                </div>
                                {!step.completed && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleAction(step.id, step.action, `${step.label} completed successfully!`)}
                                    disabled={isLoading}
                                    className="text-xs"
                                    data-testid={`button-${step.id}`}
                                  >
                                    {isLoading ? 'Working...' : step.buttonText}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </DashboardCardContent>
              </DashboardCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <DashboardCard>
                <DashboardCardHeader>
                  <DashboardCardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </DashboardCardTitle>
                </DashboardCardHeader>
                <DashboardCardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex space-x-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="flex-1">
                            <SkeletonText lines={2} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : activities.length === 0 ? (
                    <div className="text-center py-6">
                      <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No recent activity</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activities.map((activity, index) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(activity.at)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </DashboardCardContent>
              </DashboardCard>

              {/* Quick Stats */}
              {!loading && primaryProject && (
                <DashboardCard>
                  <DashboardCardHeader>
                    <DashboardCardTitle>Project Overview</DashboardCardTitle>
                  </DashboardCardHeader>
                  <DashboardCardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Applications</span>
                        <span className="text-sm font-medium">
                          {primaryProject.lastAnalysisResult?.apps?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Last Deploy</span>
                        <span className="text-sm font-medium">
                          {primaryProject.lastDeployAt 
                            ? formatDate(primaryProject.lastDeployAt)
                            : 'Never'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Setup Progress</span>
                        <span className="text-sm font-medium">
                          {Math.round((completedSteps / checklistSteps.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}