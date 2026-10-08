import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  // In-memory browser route cache; successful mutations invalidate owner views.
  experimental: { staleTimes: { dynamic: 60, static: 180 } },
};

export default nextConfig;
