import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Github, 
  Search,
  Star,
  Lock,
  Globe,
  ExternalLink
} from "lucide-react";

type GitHubRepo = {
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

export default function NewProjectPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch GitHub repositories
  const { data: repos, isLoading: reposLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/users/github-repos"],
    enabled: step === 2,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async () => {
      // First create the project (this would be a real endpoint)
      const projectId = `proj-${Date.now()}`;
      
      // Then set the GitHub repo
      if (selectedRepo) {
        await apiRequest("POST", "/api/projects/set-github-repo", {
          projectId,
          githubRepo: {
            full_name: selectedRepo.full_name,
            url: selectedRepo.html_url,
          },
        });
      }
      
      return projectId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project created!",
        description: `${projectName} has been successfully created.`,
      });
      setLocation("/dashboard/projects");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const filteredRepos = repos?.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (step === 1 && !projectName.trim()) {
      toast({
        title: "Project name required",
        description: "Please enter a name for your project",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && !selectedRepo) {
      toast({
        title: "Repository required",
        description: "Please select a GitHub repository",
        variant: "destructive",
      });
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      createProjectMutation.mutate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setLocation("/dashboard/projects");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/dashboard/projects")}
            className="mb-4"
            data-testid="button-back-to-projects"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Project
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up your infrastructure project in a few simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { num: 1, label: "Project Details" },
              { num: 2, label: "Select Repository" },
              { num: 3, label: "Review & Create" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s.num
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                    data-testid={`step-indicator-${s.num}`}
                  >
                    {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                  </div>
                  <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > s.num ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Project Details */}
          {step === 1 && (
            <Card data-testid="step-1-content">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Give your project a name to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., My E-commerce Platform"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    data-testid="input-project-name"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a descriptive name for your infrastructure project
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Repository */}
          {step === 2 && (
            <Card data-testid="step-2-content">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  Select GitHub Repository
                </CardTitle>
                <CardDescription>
                  Choose the repository you want to deploy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-repos"
                  />
                </div>

                {/* Repository List */}
                {reposLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Loading repositories...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredRepos?.map((repo) => (
                      <div
                        key={repo.id}
                        onClick={() => setSelectedRepo(repo)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedRepo?.id === repo.id
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                        data-testid={`repo-card-${repo.id}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {repo.name}
                              </h3>
                              {repo.private ? (
                                <Badge variant="default" className="text-xs">
                                  <Lock className="h-3 w-3 mr-1" />
                                  Private
                                </Badge>
                              ) : (
                                <Badge variant="default" className="text-xs bg-green-600">
                                  <Globe className="h-3 w-3 mr-1" />
                                  Public
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {repo.full_name}
                            </p>
                            {repo.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                                {repo.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {repo.language && (
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {repo.stargazers_count}
                              </span>
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-blue-600 hover:underline"
                              >
                                View on GitHub
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                          {selectedRepo?.id === repo.id && (
                            <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                    {filteredRepos?.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No repositories found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Create */}
          {step === 3 && (
            <Card data-testid="step-3-content">
              <CardHeader>
                <CardTitle>Review & Create</CardTitle>
                <CardDescription>
                  Review your project details before creating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-600 dark:text-gray-400">Project Name</Label>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white" data-testid="text-review-name">
                    {projectName}
                  </p>
                </div>

                {selectedRepo && (
                  <div>
                    <Label className="text-gray-600 dark:text-gray-400">GitHub Repository</Label>
                    <div className="mt-2 border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Github className="h-5 w-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {selectedRepo.name}
                        </h3>
                        {selectedRepo.private ? (
                          <Badge variant="default" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        ) : (
                          <Badge variant="default" className="text-xs bg-green-600">
                            <Globe className="h-3 w-3 mr-1" />
                            Public
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-review-repo">
                        {selectedRepo.full_name}
                      </p>
                      {selectedRepo.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          {selectedRepo.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Next steps:</strong> After creating your project, you'll be able to:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-200">
                    <li>• Analyze your project structure</li>
                    <li>• Configure environment variables</li>
                    <li>• Set up CI/CD pipelines</li>
                    <li>• Deploy to production</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={createProjectMutation.isPending}
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={handleNext}
              disabled={createProjectMutation.isPending}
              data-testid="button-next"
            >
              {createProjectMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : step === 3 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Project
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
