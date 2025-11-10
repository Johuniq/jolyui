import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  outputFileTracingIncludes: {
    "/**": ["components/jolyui/**/*"],
  },
  async headers() {
    return [
      {
        source: "/r/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);
