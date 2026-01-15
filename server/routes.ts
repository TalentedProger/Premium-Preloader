import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.settings.get.path, async (req, res) => {
    const settings = await storage.getSettings();
    if (!settings) {
      // Return default settings if none exist
      return res.json({ id: 0, maintenanceMode: false, welcomeMessage: "Welcome" });
    }
    res.json(settings);
  });

  return httpServer;
}
