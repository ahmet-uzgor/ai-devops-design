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

      // Simulate AI response based on message content with structured format
      const simulateAIResponse = (userMessage: string) => {
        const lowerMsg = userMessage.toLowerCase();
        
        if (lowerMsg.includes("deploy") || lowerMsg.includes("deployment")) {
          return {
            response: `**Deployment Guide**\n\nI can help you deploy your project! Here's what you need to know:\n\n1. **Pre-deployment Checklist:**\n   - Ensure your CI/CD pipeline is configured\n   - Verify all environment variables are set\n   - Check that your application builds successfully\n\n2. **Deployment Steps:**\n   - Review your setup progress in the project dashboard\n   - Run the deployment from the Deployments tab\n   - Monitor the deployment logs for any issues\n\n3. **Post-deployment:**\n   - Verify your application is running correctly\n   - Check the domain configuration\n   - Monitor performance metrics`,
            suggestions: [
              "How do I configure CI/CD pipeline?",
              "What environment variables do I need?",
              "How to monitor my deployment?"
            ],
            actionItems: [
              "**Pre-deployment Checklist:**",
              "Ensure your CI/CD pipeline is configured",
              "Verify all environment variables are set"
            ]
          };
        } else if (lowerMsg.includes("error") || lowerMsg.includes("issue") || lowerMsg.includes("problem")) {
          return {
            response: `**Troubleshooting Guide**\n\nI'll help you resolve the issue. Here's a systematic approach:\n\n1. **Identify the Problem:**\n   - Check the Warnings section in your project analysis\n   - Review recent deployment logs\n   - Look for error messages in the console\n\n2. **Common Issues:**\n   - **Build Failures:** Check dependencies and build configuration\n   - **Runtime Errors:** Verify environment variables and API endpoints\n   - **Performance Issues:** Review the Performance section for optimization tips\n\n3. **Next Steps:**\n   - Share specific error messages for targeted help\n   - Check project documentation for known issues\n   - Review recent changes that might have caused the problem`,
            suggestions: [
              "How to check deployment logs?",
              "What are common build errors?",
              "How to debug runtime issues?"
            ],
            actionItems: [
              "Check the Warnings section in your project analysis",
              "Review recent deployment logs",
              "Look for error messages in the console"
            ]
          };
        } else if (lowerMsg.includes("environment") || lowerMsg.includes("env")) {
          return {
            response: `**Environment Variables Setup**\n\nHere's how to configure environment variables properly:\n\n1. **Access Environment Variables:**\n   - Navigate to the 'Environment Variables' tab in your project\n   - Click 'Add Variable' to create a new one\n\n2. **Best Practices:**\n   - **Never commit secrets** to version control\n   - Use different values for development/staging/production\n   - Group related variables with prefixes (e.g., DB_HOST, DB_PORT)\n   - Document required variables in your README\n\n3. **Security Tips:**\n   - Rotate secrets regularly\n   - Use encryption for sensitive data\n   - Limit access to production variables`,
            suggestions: [
              "How to manage secrets securely?",
              "What variables are required for deployment?",
              "How to use different env configs per environment?"
            ],
            actionItems: [
              "Navigate to the 'Environment Variables' tab",
              "Never commit secrets to version control",
              "Use different values for each environment"
            ]
          };
        } else if (lowerMsg.includes("performance") || lowerMsg.includes("optimize")) {
          return {
            response: `**Performance Optimization Guide**\n\nBased on your project analysis, here are optimization opportunities:\n\n1. **Build Optimization:**\n   - Enable code minification and tree-shaking\n   - Implement lazy loading for routes and components\n   - Use production builds for deployment\n\n2. **Caching Strategies:**\n   - Configure CDN caching for static assets\n   - Implement browser caching headers\n   - Use service workers for offline support\n\n3. **Database & API:**\n   - Add database indexing for frequent queries\n   - Implement API response caching\n   - Use pagination for large datasets\n\n4. **Monitoring:**\n   - Set up performance metrics tracking\n   - Monitor Core Web Vitals\n   - Track error rates and response times`,
            suggestions: [
              "How to implement CDN caching?",
              "What are Core Web Vitals?",
              "How to optimize database queries?"
            ],
            actionItems: [
              "Enable code minification and tree-shaking",
              "Configure CDN caching for static assets",
              "Set up performance metrics tracking"
            ]
          };
        } else if (lowerMsg.includes("security")) {
          return {
            response: `**Security Best Practices**\n\nLet's ensure your infrastructure is secure:\n\n1. **SSL/TLS Configuration:**\n   - **Switch to HTTPS:** All traffic should use secure connections\n   - Obtain SSL certificates (use Let's Encrypt for free certificates)\n   - Configure automatic certificate renewal\n\n2. **Authentication & Authorization:**\n   - Implement strong authentication mechanisms\n   - Use OAuth 2.0 or JWT for API security\n   - Enable multi-factor authentication (MFA)\n\n3. **Dependency Security:**\n   - Regularly update all dependencies\n   - Use automated security scanning (e.g., Snyk, Dependabot)\n   - Review and patch vulnerabilities promptly\n\n4. **Infrastructure Security:**\n   - Use secrets management tools (AWS Secrets Manager, HashiCorp Vault)\n   - Implement proper firewall rules\n   - Enable audit logging for all critical operations`,
            suggestions: [
              "How to set up HTTPS?",
              "What is OAuth 2.0?",
              "How to scan for security vulnerabilities?"
            ],
            actionItems: [
              "Switch to HTTPS for all traffic",
              "Implement strong authentication mechanisms",
              "Regularly update all dependencies"
            ]
          };
        } else if (lowerMsg.includes("ci/cd") || lowerMsg.includes("pipeline")) {
          return {
            response: `**CI/CD Pipeline Setup**\n\nLet's set up automated deployments for your project:\n\n1. **Pipeline Basics:**\n   - **Continuous Integration:** Automated building and testing on every commit\n   - **Continuous Deployment:** Automated deployment to staging/production\n\n2. **GitHub Actions Setup:**\n   - Create workflow files in \`.github/workflows/\`\n   - Define build, test, and deploy stages\n   - Configure environment-specific deployments\n\n3. **Pipeline Features:**\n   - **Automated Testing:** Run unit and integration tests\n   - **Security Scanning:** Check for vulnerabilities\n   - **Build Optimization:** Cache dependencies for faster builds\n   - **Deployment Strategy:** Use blue-green or canary deployments\n\n4. **Monitoring & Notifications:**\n   - Set up Slack/email notifications for pipeline status\n   - Monitor deployment success rates\n   - Track build times and optimize bottlenecks`,
            suggestions: [
              "Show me a sample GitHub Actions workflow",
              "How to run tests in CI/CD?",
              "What is blue-green deployment?"
            ],
            actionItems: [
              "Create workflow files in .github/workflows/",
              "Define build, test, and deploy stages",
              "Set up notifications for pipeline status"
            ]
          };
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
          return {
            response: `**Hello! Welcome to OmniInfra AI Assistant** 👋\n\nI'm here to help you with:\n\n1. **Deployment & Infrastructure:**\n   - Deploy your applications\n   - Configure servers and domains\n   - Manage deployment environments\n\n2. **CI/CD Pipelines:**\n   - Set up automated workflows\n   - Configure build and test pipelines\n   - Implement deployment strategies\n\n3. **Optimization & Performance:**\n   - Improve application performance\n   - Optimize build processes\n   - Implement caching strategies\n\n4. **Security & Best Practices:**\n   - Secure your infrastructure\n   - Manage secrets and credentials\n   - Follow DevOps best practices\n\nHow can I assist you today?`,
            suggestions: [
              "How can I improve my deployment process?",
              "What security best practices should I implement?",
              "How do I set up monitoring and alerts?"
            ],
            actionItems: []
          };
        } else {
          return {
            response: `I understand you're asking about **"${userMessage}"**\n\nI can help you with several DevOps and infrastructure topics:\n\n1. **Deployment & Infrastructure:**\n   - Application deployment\n   - Server configuration\n   - Domain and SSL setup\n\n2. **Development Workflow:**\n   - CI/CD pipeline setup\n   - Environment variable management\n   - GitHub integration\n\n3. **Optimization:**\n   - Performance tuning\n   - Security hardening\n   - Cost optimization\n\nCould you provide more details about what you'd like to explore?`,
            suggestions: [
              "How can I improve my deployment process?",
              "What security best practices should I implement?",
              "How do I set up monitoring and alerts?"
            ],
            actionItems: []
          };
        }
      };

      const aiResponse = simulateAIResponse(message);

      res.json({
        id: `msg-${Date.now()}`,
        response: aiResponse.response,
        timestamp: new Date().toISOString(),
        role: "assistant",
        suggestions: aiResponse.suggestions,
        actionItems: aiResponse.actionItems,
        conversationId: `conv-${projectId}-${Date.now()}`
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
