import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Reduce memory usage
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
    webpackMemoryOptimizations: true,
  },
  // Disable source maps in development to save memory
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "9jxzamsunn.ufs.sh",
      },
      {
        hostname: "ui.aceternity.com",
      },
      {
        hostname: "ui.paceui.com",
      },
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: "/docs/introduction",
      },
      {
        source: "/r/index",
        destination: "/r/index.json",
      },
      {
        source: "/r/registry",
        destination: "/r/registry.json",
      },
      {
        source: "/r/:name((?!index|registry|styles/).*).json",
        destination: "/r/:name.json",
      },
      {
        source: "/r/:name((?!index|registry|styles/|.*\\.json$).*)",
        destination: "/r/:name.json",
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
  // Already doing typechecking as separate task in CI
  typescript: { ignoreBuildErrors: true },
};

export default withMDX(nextConfig);
