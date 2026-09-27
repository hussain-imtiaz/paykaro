import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  // The five earlier segment pages became the Individuals pathway.
  async redirects() {
    return ["personal", "family", "agri", "assisted"].map((s) => ({ source: `/${s}`, destination: "/individuals", permanent: true }));
  },
};

export default nextConfig;
