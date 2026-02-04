import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Important
  },
  typescript: {
    ignoreBuildErrors: true, // Important
  },
};

export default nextConfig;