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
    // Optimize image formats
    formats: ["image/avif", "image/webp"],
    // Reduce image sizes
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Minimize transformations
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
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
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache registry JSON files for 1 hour with stale-while-revalidate
        source: "/r/:path*.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Cache JS/CSS chunks
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Already doing typechecking as separate task in CI
  typescript: { ignoreBuildErrors: true },
};

export default withMDX(nextConfig);
