import { siteSettings, type SiteSettings, type InsertSiteSettings } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSettings(): Promise<SiteSettings | undefined>;
  // Add more methods as needed
}

export class DatabaseStorage implements IStorage {
  async getSettings(): Promise<SiteSettings | undefined> {
    const [settings] = await db.select().from(siteSettings).limit(1);
    return settings;
  }
}

export const storage = new DatabaseStorage();
