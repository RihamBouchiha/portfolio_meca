import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignore les erreurs ESLint lors du déploiement
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore les erreurs TypeScript lors du déploiement
    ignoreBuildErrors: true,
  },
};

export default nextConfig;