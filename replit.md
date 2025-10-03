# OmniInfra - AI-Powered DevOps Platform

## Overview

OmniInfra is an AI-powered DevOps platform designed to simplify infrastructure management and deployment processes. The application provides automated CI/CD pipeline setup, intelligent scaling, and comprehensive security features for modern development teams. Built as a full-stack web application, it features a React-based frontend with a Node.js/Express backend, targeting teams who want to deploy production-ready infrastructure quickly without manual DevOps complexity.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **Analysis Result Type System** (October 3, 2025): Created comprehensive TypeScript interfaces for project analysis results in shared schema, including AppInfo, TechStack, Infrastructure, CodeQuality, Performance, Recommendations, Scores, and AnalysisResult. Updated projects table to use strongly-typed AnalysisResult interface instead of generic Record type.
- **Enhanced Analysis Display** (October 3, 2025): Reorganized project details page with dedicated cards for each analysis section (Warnings, Recommendations, Insights, Tech Stack, Infrastructure, Code Quality, Performance, Project Structure). Added custom scores card in sidebar with color-coded progress bars (green/yellow/orange/red based on score values).
- **Project Details Page Added** (August 13, 2025): Created comprehensive project details page with tabbed interface showing overview, deployments, environment variables, and domains. Includes setup progress tracking, project analysis results, and quick actions sidebar.
- **Enhanced Navigation** (August 13, 2025): Updated projects page to link to individual project detail pages for better user experience.
- **Project Schema Enhancement** (August 13, 2025): Extended shared schema to include detailed project model with proper database fields for project management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Hookform resolvers for validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation (MemStorage)
- **Session Management**: Express sessions with PostgreSQL session store support
- **Development Server**: Vite integration for hot module replacement in development

### Component Structure
- **Layout Components**: Modular header and footer components
- **Page Sections**: Hero, Features, How It Works, Social Proof, Testimonials, and Final CTA sections
- **UI Components**: Comprehensive set of reusable components (buttons, cards, forms, etc.)
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Development Workflow
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Comprehensive TypeScript configuration across client, server, and shared modules
- **Code Organization**: Monorepo structure with shared schema definitions
- **Path Aliases**: Configured for clean imports (@/ for client, @shared/ for shared modules)

### Data Management
- **Schema**: Centralized schema definitions in shared directory using Drizzle
- **User Model**: Basic user system with username/password authentication structure
- **Database Migrations**: Drizzle Kit for schema migrations and database management
- **Type Generation**: Automatic TypeScript type generation from database schema

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for frontend functionality
- **Backend Framework**: Express.js with TypeScript support (tsx for development)
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation

### Database and ORM
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: Neon Database serverless driver for PostgreSQL connections
- **Session Store**: connect-pg-simple for PostgreSQL-backed session storage

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter font family from Google Fonts

### State Management and Data Fetching
- **Query Management**: TanStack React Query for server state management
- **Form Validation**: Zod for schema validation with Drizzle integration
- **Utility Libraries**: clsx and tailwind-merge for conditional styling

### Development and Deployment
- **Development**: Replit-specific plugins for development environment integration
- **Type Checking**: TypeScript with strict configuration
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer
- **Runtime**: ES modules with Node.js native module resolution