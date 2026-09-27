import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (empty string for a user site, "/repo" for a project site).
const pagesBasePath = process.env.PAGES_BASE_PATH;
const exporting = pagesBasePath !== undefined;
const basePath = pagesBasePath || "";

if (exporting) process.env.NEXT_PUBLIC_BASE_PATH = basePath;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  ...(exporting
    ? {
        output: "export" as const,
        trailingSlash: true,
        ...(basePath ? { basePath } : {}),
        images: { loader: "custom" as const, loaderFile: "./image-loader.ts" },
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }
    : {
        async redirects() {
          return ["personal", "family", "agri", "assisted"].map((s) => ({
            source: `/${s}`,
            destination: "/individuals",
            permanent: true,
          }));
        },
      }),
};

export default nextConfig;
