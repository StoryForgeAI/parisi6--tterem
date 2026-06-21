import type { NextConfig } from "next";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadLocalSettings(): Record<string, string> {
  const path = join(process.cwd(), "local-settings.json");
  if (existsSync(path)) {
    try {
      const raw = readFileSync(path, "utf-8");
      const parsed = JSON.parse(raw);
      const result: Record<string, string> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === "string" && value.length > 0) {
          result[key] = value;
          process.env[key] = value;
        }
      }
      return result;
    } catch {
      // local-settings.json is optional
    }
  }
  return {};
}

loadLocalSettings();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
