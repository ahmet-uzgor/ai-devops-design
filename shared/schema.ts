import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  githubRepo: jsonb("github_repo").$type<{ full_name: string; url?: string }>(),
  lastAnalysisResult: jsonb("last_analysis_result").$type<{ 
    apps: Array<{ name: string; path?: string }>; 
    isMonorepo: boolean; 
    reason?: string; 
  }>(),
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
