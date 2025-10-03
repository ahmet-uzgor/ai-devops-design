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
  Edit,
  AlertTriangle,
  Lightbulb,
  Layers,
  Cloud,
  FileCode,
  Zap,
  TrendingUp,
  Container,
  Workflow,
  BarChart,
  Lock
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

                    {/* Warnings & Alerts */}
                    {project.lastAnalysisResult?.warnings && project.lastAnalysisResult.warnings.length > 0 && (
                      <DashboardCard className="border-orange-200 dark:border-orange-900">
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                            <AlertTriangle className="h-5 w-5" />
                            Warnings
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <ul className="space-y-2">
                            {project.lastAnalysisResult.warnings.map((warning: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Recommendations */}
                    {project.lastAnalysisResult?.recommendations && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            Recommendations
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-4">
                            {project.lastAnalysisResult.recommendations.immediate && (
                              <div>
                                <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Immediate Actions</h4>
                                <ul className="space-y-1 ml-4">
                                  {project.lastAnalysisResult.recommendations.immediate.map((rec: string, index: number) => (
                                    <li key={index} className="text-sm list-disc">{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.lastAnalysisResult.recommendations.shortTerm && (
                              <div>
                                <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-2">Short-Term</h4>
                                <ul className="space-y-1 ml-4">
                                  {project.lastAnalysisResult.recommendations.shortTerm.map((rec: string, index: number) => (
                                    <li key={index} className="text-sm list-disc">{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {project.lastAnalysisResult.recommendations.longTerm && (
                              <div>
                                <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Long-Term</h4>
                                <ul className="space-y-1 ml-4">
                                  {project.lastAnalysisResult.recommendations.longTerm.map((rec: string, index: number) => (
                                    <li key={index} className="text-sm list-disc">{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Insights */}
                    {project.lastAnalysisResult?.insights && project.lastAnalysisResult.insights.length > 0 && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            Key Insights
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <ul className="space-y-2">
                            {project.lastAnalysisResult.insights.map((insight: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Tech Stack */}
                    {project.lastAnalysisResult?.techStack && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Layers className="h-5 w-5 text-blue-500" />
                            Tech Stack
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-6">
                            {/* Languages */}
                            {project.lastAnalysisResult.techStack.languages && 
                             project.lastAnalysisResult.techStack.languages.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Code className="h-4 w-4 text-blue-500" />
                                  Languages
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.lastAnalysisResult.techStack.languages.map((lang: string, index: number) => (
                                    <Badge key={index} variant="info" data-testid={`language-${index}`}>
                                      {lang}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Frameworks */}
                            {project.lastAnalysisResult.techStack.frameworks && 
                             project.lastAnalysisResult.techStack.frameworks.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Package className="h-4 w-4 text-purple-500" />
                                  Frameworks
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.lastAnalysisResult.techStack.frameworks.map((framework: string, index: number) => (
                                    <Badge key={index} variant="success" data-testid={`framework-${index}`}>
                                      {framework}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Databases */}
                            {project.lastAnalysisResult.techStack.databases && 
                             project.lastAnalysisResult.techStack.databases.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Database className="h-4 w-4 text-green-500" />
                                  Databases
                                </h4>
                                <div className="space-y-3">
                                  {project.lastAnalysisResult.techStack.databases.map((db: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-3" data-testid={`database-${index}`}>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                          {db.type}
                                        </span>
                                        <Badge variant={db.detected ? "success" : "default"}>
                                          {db.detected ? "Detected" : "Not Detected"}
                                        </Badge>
                                      </div>
                                      {db.ormFramework && (
                                        <p className="text-xs text-muted-foreground mb-1">
                                          ORM: <span className="font-medium">{db.ormFramework}</span>
                                        </p>
                                      )}
                                      {db.configFiles && db.configFiles.length > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                          Config: <span className="font-mono">{db.configFiles.join(', ')}</span>
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Caching */}
                            {project.lastAnalysisResult.techStack.caching && 
                             project.lastAnalysisResult.techStack.caching.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Zap className="h-4 w-4 text-orange-500" />
                                  Caching
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.lastAnalysisResult.techStack.caching.map((cache: string, index: number) => (
                                    <Badge key={index} variant="warning" data-testid={`caching-${index}`}>
                                      {cache}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Message Queues */}
                            {project.lastAnalysisResult.techStack.messageQueues && 
                             project.lastAnalysisResult.techStack.messageQueues.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Workflow className="h-4 w-4 text-indigo-500" />
                                  Message Queues
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.lastAnalysisResult.techStack.messageQueues.map((queue: string, index: number) => (
                                    <Badge key={index} variant="info" data-testid={`message-queue-${index}`}>
                                      {queue}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Infrastructure */}
                    {project.lastAnalysisResult?.infrastructure && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Cloud className="h-5 w-5 text-purple-500" />
                            Infrastructure
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-6">
                            {/* Containerization */}
                            {project.lastAnalysisResult.infrastructure.containerization && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Container className="h-4 w-4 text-blue-500" />
                                  Containerization
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Dockerfile</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.containerization.hasDockerfile ? "success" : "default"}
                                      data-testid="dockerfile-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.containerization.hasDockerfile ? "Present" : "Not Found"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Docker Compose</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.containerization.hasDockerCompose ? "success" : "default"}
                                      data-testid="docker-compose-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.containerization.hasDockerCompose ? "Present" : "Not Found"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.infrastructure.containerization.dockerComposeServices && 
                                 project.lastAnalysisResult.infrastructure.containerization.dockerComposeServices.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-muted-foreground mb-1">Services:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.lastAnalysisResult.infrastructure.containerization.dockerComposeServices.map((service: string, index: number) => (
                                        <Badge key={index} variant="info" className="text-xs">
                                          {service}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* CI/CD */}
                            {project.lastAnalysisResult.infrastructure.cicd && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Workflow className="h-4 w-4 text-green-500" />
                                  CI/CD
                                </h4>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">GitHub Actions</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.cicd.hasGithubActions ? "success" : "default"}
                                      data-testid="github-actions-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.cicd.hasGithubActions ? "Enabled" : "Not Set"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Other CI</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.cicd.hasOtherCI ? "success" : "default"}
                                      data-testid="other-ci-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.cicd.hasOtherCI ? "Configured" : "Not Set"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.infrastructure.cicd.workflows && 
                                 project.lastAnalysisResult.infrastructure.cicd.workflows.length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Workflows:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.lastAnalysisResult.infrastructure.cicd.workflows.map((workflow: string, index: number) => (
                                        <Badge key={index} variant="info" className="text-xs" data-testid={`workflow-${index}`}>
                                          {workflow}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Deployment */}
                            {project.lastAnalysisResult.infrastructure.deployment && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Server className="h-4 w-4 text-purple-500" />
                                  Deployment
                                </h4>
                                <div className="grid grid-cols-3 gap-3 mb-2">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Kubernetes</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.deployment.hasKubernetes ? "success" : "default"}
                                      data-testid="kubernetes-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.deployment.hasKubernetes ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Helm</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.deployment.hasHelm ? "success" : "default"}
                                      data-testid="helm-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.deployment.hasHelm ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Serverless</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.deployment.hasServerless ? "success" : "default"}
                                      data-testid="serverless-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.deployment.hasServerless ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.infrastructure.deployment.platform && (
                                  <div className="border rounded-lg p-3 bg-purple-50 dark:bg-purple-950">
                                    <p className="text-xs text-muted-foreground mb-1">Platform</p>
                                    <p className="font-semibold text-purple-700 dark:text-purple-300" data-testid="deployment-platform">
                                      {project.lastAnalysisResult.infrastructure.deployment.platform}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Monitoring */}
                            {project.lastAnalysisResult.infrastructure.monitoring && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <BarChart className="h-4 w-4 text-orange-500" />
                                  Monitoring
                                </h4>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Logging</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.monitoring.hasLogging ? "success" : "warning"}
                                      data-testid="logging-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.monitoring.hasLogging ? "Enabled" : "Not Set"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Metrics</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.monitoring.hasMetrics ? "success" : "warning"}
                                      data-testid="metrics-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.monitoring.hasMetrics ? "Enabled" : "Not Set"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.infrastructure.monitoring.tools && 
                                 project.lastAnalysisResult.infrastructure.monitoring.tools.length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Tools:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.lastAnalysisResult.infrastructure.monitoring.tools.map((tool: string, index: number) => (
                                        <Badge key={index} variant="info" className="text-xs" data-testid={`monitoring-tool-${index}`}>
                                          {tool}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Security */}
                            {project.lastAnalysisResult.infrastructure.security && (
                              <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950 p-4 rounded">
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Lock className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  Security
                                </h4>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Env Files</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.security.hasEnvFiles ? "success" : "warning"}
                                      data-testid="env-files-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.security.hasEnvFiles ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Secrets</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.security.hasSecrets ? "success" : "warning"}
                                      data-testid="secrets-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.security.hasSecrets ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Scanning</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.infrastructure.security.hasSecurityScanning ? "success" : "warning"}
                                      data-testid="security-scanning-status"
                                    >
                                      {project.lastAnalysisResult.infrastructure.security.hasSecurityScanning ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.infrastructure.security.vulnerabilities && 
                                 project.lastAnalysisResult.infrastructure.security.vulnerabilities.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-1">
                                      Vulnerabilities:
                                    </p>
                                    <ul className="space-y-1 ml-4">
                                      {project.lastAnalysisResult.infrastructure.security.vulnerabilities.map((vuln: string, index: number) => (
                                        <li key={index} className="text-sm list-disc text-red-700 dark:text-red-300" data-testid={`vulnerability-${index}`}>
                                          {vuln}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Code Quality */}
                    {project.lastAnalysisResult?.codeQuality && (
                      <DashboardCard>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <FileCode className="h-5 w-5 text-indigo-500" />
                            Code Quality
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-6">
                            {/* Linting */}
                            {project.lastAnalysisResult.codeQuality.linting && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-blue-500" />
                                  Linting
                                </h4>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">ESLint</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.linting.hasESLint ? "success" : "warning"}
                                      data-testid="eslint-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.linting.hasESLint ? "Configured" : "Not Set"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Prettier</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.linting.hasPrettier ? "success" : "warning"}
                                      data-testid="prettier-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.linting.hasPrettier ? "Configured" : "Not Set"}
                                    </Badge>
                                  </div>
                                </div>
                                {project.lastAnalysisResult.codeQuality.linting.tools && 
                                 project.lastAnalysisResult.codeQuality.linting.tools.length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Tools:</p>
                                    <div className="flex flex-wrap gap-1">
                                      {project.lastAnalysisResult.codeQuality.linting.tools.map((tool: string, index: number) => (
                                        <Badge key={index} variant="info" className="text-xs" data-testid={`linting-tool-${index}`}>
                                          {tool}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Testing */}
                            {project.lastAnalysisResult.codeQuality.testing && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Activity className="h-4 w-4 text-green-500" />
                                  Testing
                                </h4>
                                <div className="grid grid-cols-3 gap-3 mb-2">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Unit Tests</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.testing.unitTests ? "success" : "warning"}
                                      data-testid="unit-tests-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.testing.unitTests ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Integration</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.testing.integrationTests ? "success" : "warning"}
                                      data-testid="integration-tests-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.testing.integrationTests ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">E2E Tests</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.testing.e2eTests ? "success" : "warning"}
                                      data-testid="e2e-tests-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.testing.e2eTests ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-2">
                                  <div className="border rounded-lg p-3 bg-green-50 dark:bg-green-950">
                                    <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.testing.coverage ? "success" : "warning"}
                                      data-testid="test-coverage-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.testing.coverage ? "Enabled" : "Not Set"}
                                    </Badge>
                                  </div>
                                  {project.lastAnalysisResult.codeQuality.testing.testFrameworks && 
                                   project.lastAnalysisResult.codeQuality.testing.testFrameworks.length > 0 && (
                                    <div className="border rounded-lg p-3">
                                      <p className="text-xs text-muted-foreground mb-1">Frameworks</p>
                                      <div className="flex flex-wrap gap-1">
                                        {project.lastAnalysisResult.codeQuality.testing.testFrameworks.map((framework: string, index: number) => (
                                          <Badge key={index} variant="success" className="text-xs" data-testid={`test-framework-${index}`}>
                                            {framework}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Type System */}
                            {project.lastAnalysisResult.codeQuality.typeSystem && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Code className="h-4 w-4 text-purple-500" />
                                  Type System
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">TypeScript</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.typeSystem.hasTypeScript ? "success" : "default"}
                                      data-testid="typescript-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.typeSystem.hasTypeScript ? "Enabled" : "Not Set"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Strict Mode</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.typeSystem.strict ? "success" : "warning"}
                                      data-testid="strict-mode-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.typeSystem.strict ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3 bg-purple-50 dark:bg-purple-950">
                                    <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                                    <p className="font-semibold text-purple-700 dark:text-purple-300" data-testid="type-coverage">
                                      {project.lastAnalysisResult.codeQuality.typeSystem.coverage}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Code Style */}
                            {project.lastAnalysisResult.codeQuality.codeStyle && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Settings className="h-4 w-4 text-orange-500" />
                                  Code Style
                                </h4>
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">EditorConfig</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.codeStyle.hasEditorConfig ? "success" : "default"}
                                      data-testid="editorconfig-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.codeStyle.hasEditorConfig ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Git Hooks</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.codeStyle.hasGitHooks ? "success" : "warning"}
                                      data-testid="git-hooks-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.codeStyle.hasGitHooks ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                  <div className="border rounded-lg p-3">
                                    <p className="text-xs text-muted-foreground mb-1">Prettier</p>
                                    <Badge 
                                      variant={project.lastAnalysisResult.codeQuality.codeStyle.hasPrettier ? "success" : "warning"}
                                      data-testid="code-style-prettier-status"
                                    >
                                      {project.lastAnalysisResult.codeQuality.codeStyle.hasPrettier ? "Yes" : "No"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Performance */}
                    {project.lastAnalysisResult?.performance && (
                      <DashboardCard collapsible={true} defaultOpen={false}>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Performance
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-6">
                            {/* Build Optimizations */}
                            {project.lastAnalysisResult.performance.buildOptimization && 
                             project.lastAnalysisResult.performance.buildOptimization.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Settings className="h-4 w-4 text-blue-500" />
                                  Build Optimizations
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.lastAnalysisResult.performance.buildOptimization.map((opt: string, index: number) => (
                                    <Badge key={index} variant="info" data-testid={`build-opt-${index}`}>
                                      {opt}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Caching Strategies */}
                            {project.lastAnalysisResult.performance.caching && 
                             project.lastAnalysisResult.performance.caching.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Database className="h-4 w-4 text-purple-500" />
                                  Caching Strategies
                                </h4>
                                <ul className="space-y-1 ml-4">
                                  {project.lastAnalysisResult.performance.caching.map((cache: string, index: number) => (
                                    <li key={index} className="text-sm list-disc" data-testid={`caching-${index}`}>
                                      {cache}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* CDN Status */}
                              <div className="border rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Globe className="h-4 w-4 text-indigo-500" />
                                  <span className="text-sm font-medium">CDN</span>
                                </div>
                                <Badge 
                                  variant={project.lastAnalysisResult.performance.cdn ? "success" : "warning"}
                                  data-testid="cdn-status"
                                >
                                  {project.lastAnalysisResult.performance.cdn ? "Enabled" : "Not Enabled"}
                                </Badge>
                              </div>

                              {/* Lazy Loading Status */}
                              <div className="border rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Eye className="h-4 w-4 text-green-500" />
                                  <span className="text-sm font-medium">Lazy Loading</span>
                                </div>
                                <Badge 
                                  variant={project.lastAnalysisResult.performance.lazy_loading ? "success" : "warning"}
                                  data-testid="lazy-loading-status"
                                >
                                  {project.lastAnalysisResult.performance.lazy_loading ? "Enabled" : "Not Enabled"}
                                </Badge>
                              </div>
                            </div>

                            {/* Bundle Analysis */}
                            {project.lastAnalysisResult.performance.bundleAnalysis && (
                              <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950 p-4 rounded">
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                  <Package className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                  Bundle Analysis
                                </h4>
                                {project.lastAnalysisResult.performance.bundleAnalysis.tool && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Tool: <span className="font-mono font-medium">{project.lastAnalysisResult.performance.bundleAnalysis.tool}</span>
                                  </p>
                                )}
                                {project.lastAnalysisResult.performance.bundleAnalysis.recommendations && 
                                 project.lastAnalysisResult.performance.bundleAnalysis.recommendations.length > 0 && (
                                  <div>
                                    <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">
                                      Recommendations:
                                    </p>
                                    <ul className="space-y-1 ml-4">
                                      {project.lastAnalysisResult.performance.bundleAnalysis.recommendations.map((rec: string, index: number) => (
                                        <li key={index} className="text-sm list-disc" data-testid={`bundle-rec-${index}`}>
                                          {rec}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </DashboardCardContent>
                      </DashboardCard>
                    )}

                    {/* Project Type & Apps */}
                    {project.lastAnalysisResult?.apps && (
                      <DashboardCard collapsible={true} defaultOpen={false}>
                        <DashboardCardHeader>
                          <DashboardCardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-500" />
                            Project Structure
                          </DashboardCardTitle>
                        </DashboardCardHeader>
                        <DashboardCardContent>
                          <div className="space-y-3">
                            {project.lastAnalysisResult.isMonorepo !== undefined && (
                              <div className="flex items-center gap-2">
                                <Badge variant="default">
                                  {project.lastAnalysisResult.isMonorepo ? 'Monorepo' : 'Single App'}
                                </Badge>
                                {project.lastAnalysisResult.projectType && (
                                  <Badge variant="info">{project.lastAnalysisResult.projectType}</Badge>
                                )}
                              </div>
                            )}
                            <AnalysisRenderer data={project.lastAnalysisResult.apps} />
                          </div>
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
                {/* Project Scores */}
                {project.lastAnalysisResult?.scores && (
                  <DashboardCard>
                    <DashboardCardHeader>
                      <DashboardCardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-500" />
                        Project Scores
                      </DashboardCardTitle>
                    </DashboardCardHeader>
                    <DashboardCardContent>
                      <div className="space-y-4" data-testid="scores-container">
                        {Object.entries(project.lastAnalysisResult.scores).map(([key, value]) => {
                          const score = value as number;
                          let barColor = 'bg-red-500';
                          let textColor = 'text-red-600';
                          
                          if (score >= 80) {
                            barColor = 'bg-green-500';
                            textColor = 'text-green-600';
                          } else if (score >= 60) {
                            barColor = 'bg-yellow-500';
                            textColor = 'text-yellow-600';
                          } else if (score >= 40) {
                            barColor = 'bg-orange-500';
                            textColor = 'text-orange-600';
                          }
                          
                          const formattedLabel = key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, str => str.toUpperCase())
                            .trim();
                          
                          return (
                            <div key={key} data-testid={`score-${key}`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{formattedLabel}</span>
                                <span className={`text-sm font-bold ${textColor}`} data-testid={`score-value-${key}`}>
                                  {score}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${barColor} transition-all duration-300`}
                                  style={{ width: `${score}%` }}
                                  data-testid={`score-bar-${key}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </DashboardCardContent>
                  </DashboardCard>
                )}

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