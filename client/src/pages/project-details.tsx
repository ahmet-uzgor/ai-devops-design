import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { DashboardCard, DashboardCardHeader, DashboardCardContent, DashboardCardTitle } from '@/components/ui/dashboard-card';
import { Badge } from '@/components/ui/dashboard-badge';
import { Skeleton, SkeletonText, SkeletonCard } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/ToastProvider';
import DashboardSidebar from '@/components/layout/dashboard-sidebar';
import { AnalysisRenderer } from '@/components/ui/analysis-renderer';
import { RequireAuth } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  getProjects,
  type Project,
  connectGithub,
  analyzeProject,
  setupCICD,
  addSomeEnvs,
  configureDomainAndServer,
  deployProject
} from '@/lib/fakeApi';
import { 
  ArrowLeft,
  Github,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  ExternalLink,
  Server,
  GitBranch,
  Database,
  Shield,
  Activity,
  Code,
  Package,
  Play,
  RefreshCw,
  Eye,
  Edit
} from 'lucide-react';
import { Link } from 'wouter';

export default function ProjectDetails() {
  const [match, params] = useRoute('/dashboard/projects/:id');
  const { success, error } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [setupCiCdLoading, setSetupCiCdLoading] = useState(false);

  const projectId = params?.id;

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const projects = await getProjects();
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject || null);
    } catch (err) {
      console.error('Failed to load project:', err);
      error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGithub = async () => {
    if (!project) return;
    try {
      await connectGithub(project.id);
      success('GitHub repository connected successfully!');
      await loadProject();
    } catch (err) {
      error('Failed to connect GitHub repository');
    }
  };

  const handleAnalyzeProject = async () => {
    if (!project) return;
    try {
      setAnalyzing(true);
      await analyzeProject(project.id);
      success('Project analyzed successfully!');
      await loadProject();
    } catch (err) {
      error('Failed to analyze project');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSetupCiCd = async () => {
    if (!project) return;
    try {
      setSetupCiCdLoading(true);
      await setupCICD(project.id);
      success('CI/CD pipeline configured successfully!');
      await loadProject();
    } catch (err) {
      error('Failed to setup CI/CD pipeline');
    } finally {
      setSetupCiCdLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!project) return;
    try {
      setDeploying(true);
      await deployProject(project.id);
      success('Project deployed successfully!');
      await loadProject();
    } catch (err) {
      error('Failed to deploy project');
    } finally {
      setDeploying(false);
    }
  };

  const getProjectStatus = (project: Project) => {
    if (project.lastDeployAt) {
      return { status: 'deployed', label: 'Deployed', color: 'success' as const, icon: CheckCircle };
    }
    if (project.ciCdSetup) {
      return { status: 'configured', label: 'Configured', color: 'info' as const, icon: Settings };
    }
    if (project.githubRepo) {
      return { status: 'connected', label: 'Connected', color: 'warning' as const, icon: Github };
    }
    return { status: 'setup', label: 'Setup Required', color: 'warning' as const, icon: AlertCircle };
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!match) {
    return null;
  }

  if (loading) {
    return (
      <RequireAuth>
        <div className="min-h-screen bg-background">
          <DashboardSidebar />
          <div className="lg:pl-64">
            <div className="px-6 py-8">
              <div className="mb-6">
                <SkeletonText className="h-8 w-48 mb-2" />
                <SkeletonText className="h-4 w-96" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <SkeletonCard className="h-96" />
                  <SkeletonCard className="h-64" />
                </div>
                <div className="space-y-6">
                  <SkeletonCard className="h-48" />
                  <SkeletonCard className="h-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RequireAuth>
    );
  }

  if (!project) {
    return (
      <RequireAuth>
        <div className="min-h-screen bg-background">
          <DashboardSidebar />
          <div className="lg:pl-64">
            <div className="px-6 py-8">
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Project Not Found</h3>
                <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist or has been removed.</p>
                <Link href="/dashboard/projects">
                  <Button>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RequireAuth>
    );
  }

  const status = getProjectStatus(project);
  const StatusIcon = status.icon;

  return (
    <RequireAuth>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link href="/dashboard/projects">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Projects
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant={status.color} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                    {project.githubRepo && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Github className="h-4 w-4" />
                        {project.githubRepo.full_name}
                      </div>
                    )}
                    {project.lastDeployAt && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Last deployed {formatDate(project.lastDeployAt)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {project.ciCdSetup && (
                    <Button 
                      onClick={handleDeploy} 
                      disabled={deploying}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {deploying ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Deploy
                        </>
                      )}
                    </Button>
                  )}
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="deployments">Deployments</TabsTrigger>
                    <TabsTrigger value="environment">Environment</TabsTrigger>
                    <TabsTrigger value="domains">Domains</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    {/* Setup Progress */}
                    <DashboardCard>
                      <DashboardCardHeader>
                        <DashboardCardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          Setup Progress
                        </DashboardCardTitle>
                      </DashboardCardHeader>
                      <DashboardCardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${project.githubRepo ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className="font-medium">Connect GitHub Repository</span>
                            </div>
                            {!project.githubRepo ? (
                              <Button onClick={handleConnectGithub} size="sm">
                                <Github className="h-4 w-4 mr-2" />
                                Connect
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Connected
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${project.lastAnalysisResult ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className="font-medium">Analyze Project Structure</span>
                            </div>
                            {!project.lastAnalysisResult ? (
                              <Button 
                                onClick={handleAnalyzeProject} 
                                size="sm" 
                                disabled={!project.githubRepo || analyzing}
                              >
                                {analyzing ? (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Analyzing...
                                  </>
                                ) : (
                                  <>
                                    <Code className="h-4 w-4 mr-2" />
                                    Analyze
                                  </>
                                )}
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Analyzed
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${project.ciCdSetup ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className="font-medium">Setup CI/CD Pipeline</span>
                            </div>
                            {!project.ciCdSetup ? (
                              <Button 
                                onClick={handleSetupCiCd} 
                                size="sm" 
                                disabled={!project.lastAnalysisResult || setupCiCdLoading}
                              >
                                {setupCiCdLoading ? (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Setting up...
                                  </>
                                ) : (
                                  <>
                                    <GitBranch className="h-4 w-4 mr-2" />
                                    Setup
                                  </>
                                )}
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Configured
                              </div>
                            )}
                          </div>
                        </div>
                      </DashboardCardContent>
                    </DashboardCard>

                    {/* Project Analysis */}
                    {project.lastAnalysisResult && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-500" />
                            Project Analysis
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <AnalysisRenderer data={project.lastAnalysisResult} />
                        </DashboardCardContent>
                      </DashboardCard>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="deployments" className="space-y-6">
                    <DashboardCard>
                      <DashboardCardHeader>
                        <DashboardCardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-500" />
                          Deployment History
                        </DashboardCardTitle>
                      </DashboardCardHeader>
                      <DashboardCardContent>
                        {project.lastDeployAt ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <div>
                                  <p className="font-medium">Production Deployment</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(project.lastDeployAt)}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="default">Active</Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No deployments yet</p>
                          </div>
                        )}
                      </DashboardCardContent>
                    </DashboardCard>
                  </TabsContent>
                  
                  <TabsContent value="environment" className="space-y-6">
                    <DashboardCard>
                      <DashboardCardHeader>
                        <DashboardCardTitle className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-blue-500" />
                          Environment Variables
                        </DashboardCardTitle>
                      </DashboardCardHeader>
                      <DashboardCardContent>
                        {project.envs && Object.keys(project.envs).length > 0 ? (
                          <div className="space-y-4">
                            {Object.entries(project.envs).map(([appName, env]) => (
                              <div key={appName} className="border rounded-lg p-4">
                                <h4 className="font-medium mb-3 flex items-center gap-2">
                                  <Code className="h-4 w-4" />
                                  {appName}
                                </h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Variable</TableHead>
                                      <TableHead>Value</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {Object.entries(env.values).map(([key, value]) => (
                                      <TableRow key={key}>
                                        <TableCell className="font-mono text-sm">{key}</TableCell>
                                        <TableCell className="font-mono text-sm">
                                          <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">••••••••</span>
                                            <Button variant="ghost" size="sm">
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No environment variables configured</p>
                            <Button className="mt-4">
                              <Settings className="h-4 w-4 mr-2" />
                              Configure Environment
                            </Button>
                          </div>
                        )}
                      </DashboardCardContent>
                    </DashboardCard>
                  </TabsContent>
                  
                  <TabsContent value="domains" className="space-y-6">
                    <DashboardCard>
                      <DashboardCardHeader>
                        <DashboardCardTitle className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-purple-500" />
                          Custom Domains
                        </DashboardCardTitle>
                      </DashboardCardHeader>
                      <DashboardCardContent>
                        {project.domains && Object.keys(project.domains).length > 0 ? (
                          <div className="space-y-3">
                            {Object.entries(project.domains).map(([appName, domain]) => (
                              <div key={appName} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Globe className="h-4 w-4 text-purple-500" />
                                  <div>
                                    <p className="font-medium">{domain}</p>
                                    <p className="text-sm text-muted-foreground">{appName}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="default">Active</Badge>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No custom domains configured</p>
                            <Button className="mt-4">
                              <Globe className="h-4 w-4 mr-2" />
                              Add Domain
                            </Button>
                          </div>
                        )}
                      </DashboardCardContent>
                    </DashboardCard>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <DashboardCard>
                  <DashboardCardHeader>
                    <DashboardCardTitle>Quick Actions</DashboardCardTitle>
                  </DashboardCardHeader>
                  <DashboardCardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Project
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Project Settings
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Security Scan
                      </Button>
                      {project.domains && Object.values(project.domains)[0] && (
                        <Button className="w-full justify-start" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Site
                        </Button>
                      )}
                    </div>
                  </DashboardCardContent>
                </DashboardCard>

                {/* Project Info */}
                <DashboardCard>
                  <DashboardCardHeader>
                    <DashboardCardTitle>Project Information</DashboardCardTitle>
                  </DashboardCardHeader>
                  <DashboardCardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Project ID</p>
                        <p className="text-sm font-mono">{project.id}</p>
                      </div>
                      {project.serverId && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Server ID</p>
                          <p className="text-sm font-mono">{project.serverId}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge variant={status.color} className="mt-1">
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  </DashboardCardContent>
                </DashboardCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}