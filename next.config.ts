import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Prevent workspace root detection issues (multiple lockfiles)
  // Explicitly set the project root for Turbopack
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
