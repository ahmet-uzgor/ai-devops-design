import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export interface AppInfo {
  name: string;
  type: string;
  framework: string;
  language: string;
  buildTool: string;
  packageManager: string;
  hasDockerfile: boolean;
  hasTests: boolean;
  dependencies: string[];
  scripts: string[];
  port: number | null;
}

export interface DatabaseInfo {
  type: string;
  detected: boolean;
  configFiles: string[];
  ormFramework: string;
}

export interface TechStack {
  languages: string[];
  frameworks: string[];
  databases: DatabaseInfo[];
  caching: string[];
  messageQueues: string[];
}

export interface Containerization {
  hasDockerfile: boolean;
  hasDockerCompose: boolean;
  dockerComposeServices: string[];
}

export interface CICD {
  hasGithubActions: boolean;
  hasOtherCI: boolean;
  workflows: string[];
}

export interface Deployment {
  hasKubernetes: boolean;
  hasHelm: boolean;
  hasServerless: boolean;
  platform: string;
}

export interface Monitoring {
  hasLogging: boolean;
  hasMetrics: boolean;
  tools: string[];
}

export interface Security {
  hasEnvFiles: boolean;
  hasSecrets: boolean;
  hasSecurityScanning: boolean;
  vulnerabilities: string[];
}

export interface Infrastructure {
  containerization: Containerization;
  cicd: CICD;
  deployment: Deployment;
  monitoring: Monitoring;
  security: Security;
}

export interface Linting {
  hasESLint: boolean;
  hasPrettier: boolean;
  tools: string[];
}

export interface Testing {
  unitTests: boolean;
  integrationTests: boolean;
  e2eTests: boolean;
  testFrameworks: string[];
  coverage: boolean;
}

export interface TypeSystem {
  hasTypeScript: boolean;
  strict: boolean;
  coverage: string;
}

export interface CodeStyle {
  hasEditorConfig: boolean;
  hasGitHooks: boolean;
  hasPrettier: boolean;
}

export interface CodeQuality {
  linting: Linting;
  testing: Testing;
  typeSystem: TypeSystem;
  codeStyle: CodeStyle;
}

export interface BundleAnalysis {
  tool: string;
  recommendations: string[];
}

export interface Performance {
  buildOptimization: string[];
  caching: string[];
  cdn: boolean;
  lazy_loading: boolean;
  bundleAnalysis: BundleAnalysis;
}

export interface Recommendations {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
}

export interface Scores {
  overall: number;
  codeQuality: number;
  infrastructure: number;
  performance: number;
  security: number;
  maintainability: number;
}

export interface AnalysisResult {
  isMonorepo: boolean;
  reason: string;
  projectType: string;
  apps: AppInfo[];
  techStack: TechStack;
  infrastructure: Infrastructure;
  codeQuality: CodeQuality;
  performance: Performance;
  recommendations: Recommendations;
  scores: Scores;
  insights: string[];
  warnings: string[];
  raw: any;
}

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  githubRepo: jsonb("github_repo").$type<{ full_name: string; url?: string }>(),
  lastAnalysisResult: jsonb("last_analysis_result").$type<AnalysisResult>(),
  envs: jsonb("envs").$type<Record<string, { values: Record<string, string>; updatedAt: string }>>(),
  domains: jsonb("domains").$type<Record<string, string>>(),
  serverId: text("server_id"),
  ciCdSetup: boolean("ci_cd_setup").default(false),
  lastDeployAt: timestamp("last_deploy_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  userId: varchar("user_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
