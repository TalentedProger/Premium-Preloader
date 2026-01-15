import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  maintenanceMode: boolean("maintenance_mode").default(false),
  welcomeMessage: text("welcome_message").default("Welcome"),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings);

export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
