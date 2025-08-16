import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DashboardCard, DashboardCardHeader, DashboardCardContent, DashboardCardTitle } from '@/components/ui/dashboard-card';
import { Badge } from '@/components/ui/dashboard-badge';
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/ToastProvider';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import { RequireAuth } from '@/lib/auth';
import {
  getProjects,
  type Project
} from '@/lib/fakeApi';
import { 
  Plus,
  Github,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Settings,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'wouter';

export default function Projects() {
  const { t } = useTranslation();
  const { success } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectStatus = (project: Project) => {
    if (project.lastDeployAt) {
      return { status: 'deployed', label: 'Deployed', color: 'success' as const };
    }
    if (project.ciCdSetup) {
      return { status: 'configured', label: 'Configured', color: 'info' as const };
    }
    if (project.githubRepo) {
      return { status: 'connected', label: 'Connected', color: 'warning' as const };
    }
    return { status: 'setup', label: 'Setup Required', color: 'warning' as const };
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCreateProject = () => {
    success('Project creation will be available soon!');
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <DashboardSidebar />
        <main className="lg:ml-64 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('projects.title', 'Projects')}</h1>
                <p className="text-lg text-gray-600">
                  {t('projects.subtitle', 'Manage your infrastructure projects and deployments')}
                </p>
              </div>
              <Button 
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0"
                data-testid="button-create-project"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </Button>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} className="h-64" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <DashboardCard className="text-center py-12">
                <DashboardCardContent>
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Plus className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('projects.noProjects', 'No projects yet')}</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    {t('projects.noProjectsDesc', 'Get started by creating your first project. Connect your repository and let OmniInfra handle the rest.')}
                  </p>
                  <Button 
                    onClick={handleCreateProject}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold border-0"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    {t('projects.createFirst', 'Create Your First Project')}
                  </Button>
                </DashboardCardContent>
              </DashboardCard>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const status = getProjectStatus(project);
                  const appsCount = project.lastAnalysisResult?.apps?.length || 0;
                  
                  return (
                    <DashboardCard key={project.id} className="hover:shadow-lg transition-all duration-200">
                      <DashboardCardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <DashboardCardTitle className="text-lg mb-2 truncate">
                              {project.name}
                            </DashboardCardTitle>
                            <Badge variant={status.color} className="mb-3">
                              {status.label}
                            </Badge>
                          </div>
                          <div className="relative group">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                              <div className="py-1">
                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Settings
                                </button>
                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Live
                                </button>
                                <hr className="my-1" />
                                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DashboardCardHeader>
                      <DashboardCardContent>
                        <div className="space-y-4">
                          {/* Project Info */}
                          <div className="space-y-3">
                            {project.githubRepo && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Github className="h-4 w-4 mr-2" />
                                <span className="truncate">{project.githubRepo.full_name}</span>
                              </div>
                            )}
                            
                            {appsCount > 0 && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Globe className="h-4 w-4 mr-2" />
                                <span>{appsCount} application{appsCount !== 1 ? 's' : ''}</span>
                              </div>
                            )}
                            
                            {project.lastDeployAt && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>Deployed {formatDate(project.lastDeployAt)}</span>
                              </div>
                            )}
                          </div>

                          {/* Progress Indicators */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Setup Progress</span>
                              <span className="font-medium">
                                {Math.round(getSetupProgress(project))}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getSetupProgress(project)}%` }}
                              />
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex space-x-2 pt-2">
                            <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                data-testid={`button-manage-${project.id}`}
                              >
                                {t('projects.viewDetails', 'View Details')}
                              </Button>
                            </Link>
                            {project.lastDeployAt && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="px-3"
                                title="View Live"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </DashboardCardContent>
                    </DashboardCard>
                  );
                })}
              </div>
            )}

            {/* Stats Summary */}
            {!loading && projects.length > 0 && (
              <div className="mt-12 grid md:grid-cols-4 gap-6">
                <DashboardCard>
                  <DashboardCardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Projects</p>
                        <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>

                <DashboardCard>
                  <DashboardCardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Globe className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Deployed</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {projects.filter(p => p.lastDeployAt).length}
                        </p>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>

                <DashboardCard>
                  <DashboardCardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {projects.filter(p => !p.lastDeployAt && p.githubRepo).length}
                        </p>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>

                <DashboardCard>
                  <DashboardCardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Need Setup</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {projects.filter(p => !p.githubRepo).length}
                        </p>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              </div>
            )}
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}

function getSetupProgress(project: Project): number {
  let completed = 0;
  const total = 6;

  if (project.githubRepo?.full_name) completed++;
  if (project.lastAnalysisResult?.apps?.length) completed++;
  if (project.envs && Object.keys(project.envs).length > 0) completed++;
  if (project.serverId && project.domains) completed++;
  if (project.ciCdSetup) completed++;
  if (project.lastDeployAt) completed++;

  return (completed / total) * 100;
}