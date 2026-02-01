import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/docs/", "/r/", "/api/og"],
        disallow: [
          "/api/search",
          "/api/icons",
          "/api/uploadthing",
          "/_next/",
          "/private/",
          "/*.json$",
          "/_vercel/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/docs/*", "/api/og*", "/r/*"],
        disallow: ["/api/search", "/api/icons", "/_next/static/", "/private/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/api/og"],
        disallow: [],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/docs/*", "/api/og*", "/r/*"],
        disallow: ["/api/search", "/api/icons", "/_next/", "/private/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Slurp",
        allow: ["/", "/docs/*"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: ["/", "/docs/*"],
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "facebookexternalhit",
        allow: ["/", "/api/og"],
        disallow: [],
      },
      {
        userAgent: "Twitterbot",
        allow: ["/", "/api/og"],
        disallow: [],
      },
      {
        userAgent: "LinkedInBot",
        allow: ["/", "/api/og"],
        disallow: [],
      },
      // Block AI crawlers that don't respect content licensing
      {
        userAgent: "GPTBot",
        allow: ["/llms-full.txt", "/llms.mdx/"],
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
