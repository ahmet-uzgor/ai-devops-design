import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/users/github-repos - Fetch user's GitHub repositories
  app.get("/api/users/github-repos", async (req, res) => {
    try {
      // Mock GitHub repos data
      const repos = [
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

      res.json(repos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  });

  // POST /api/projects/set-github-repo - Set GitHub repo for a project
  app.post("/api/projects/set-github-repo", async (req, res) => {
    try {
      const { projectId, githubRepo } = req.body;

      if (!projectId || !githubRepo) {
        return res.status(400).json({ error: "Missing projectId or githubRepo" });
      }

      // In a real implementation, this would update the project in the database
      // For now, just return success
      res.json({ 
        success: true, 
        message: `GitHub repo ${githubRepo.full_name} connected to project ${projectId}` 
      });
    } catch (error) {
      console.error("Error setting GitHub repo:", error);
      res.status(500).json({ error: "Failed to set GitHub repository" });
    }
  });

  // POST /api/projects/:projectId/chat - Send message to chatbot
  app.post("/api/projects/:projectId/chat", async (req, res) => {
    try {
      const { projectId } = req.params;
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Simulate AI response based on message content
      const simulateAIResponse = (userMessage: string): string => {
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes("deploy") || lowerMsg.includes("deployment")) {
          return "I can help you deploy your project! First, make sure your CI/CD pipeline is configured. You can check the setup progress in your project dashboard. Would you like me to guide you through the deployment process?";
        } else if (lowerMsg.includes("error") || lowerMsg.includes("issue") || lowerMsg.includes("problem")) {
          return "I'll help you troubleshoot the issue. Can you provide more details about the error you're experiencing? You can also check the 'Warnings' section in your project analysis for potential issues.";
        } else if (lowerMsg.includes("environment") || lowerMsg.includes("env")) {
          return "To configure environment variables, go to the 'Environment Variables' tab in your project. You can add, edit, or remove variables for each application in your project. Remember to keep sensitive data secure!";
        } else if (lowerMsg.includes("performance") || lowerMsg.includes("optimize")) {
          return "Based on your project analysis, I see some performance optimization opportunities. Check the 'Performance' section for recommendations on build optimization, caching strategies, and CDN usage.";
        } else if (lowerMsg.includes("security")) {
          return "Security is important! Your project analysis shows some security considerations. Make sure to use HTTPS, implement proper authentication, and keep your dependencies up to date. Check the 'Infrastructure' section for security details.";
        } else if (lowerMsg.includes("ci/cd") || lowerMsg.includes("pipeline")) {
          return "Your CI/CD pipeline helps automate deployments. I can set up GitHub Actions for you with build, test, and deploy workflows. Would you like me to create a PR with the pipeline configuration?";
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
          return "Hello! I'm your OmniInfra AI assistant. I can help you with deployments, troubleshooting, environment configuration, and infrastructure optimization. How can I assist you today?";
        } else {
          return `I understand you're asking about "${userMessage}". I can help you with deployment, environment configuration, CI/CD pipelines, performance optimization, and security best practices. What specific aspect would you like to explore?`;
        }
      };

      const aiResponse = simulateAIResponse(message);

      res.json({
        id: `msg-${Date.now()}`,
        message: aiResponse,
        timestamp: new Date().toISOString(),
        role: "assistant"
      });
    } catch (error) {
      console.error("Error in chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // POST /api/projects/:projectId/chat/cleanup - Clear chat history
  app.post("/api/projects/:projectId/chat/cleanup", async (req, res) => {
    try {
      const { projectId } = req.params;

      res.json({
        success: true,
        message: `Chat history cleared for project ${projectId}`
      });
    } catch (error) {
      console.error("Error clearing chat:", error);
      res.status(500).json({ error: "Failed to clear chat history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
