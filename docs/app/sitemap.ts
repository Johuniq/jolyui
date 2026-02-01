import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const docRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => {
    // Higher priority for component pages
    const isComponentPage = page.slugs[0] === "components";
    const isGettingStarted = page.slugs.includes("getting-started");
    const isIntroduction = page.slugs.includes("introduction");

    let priority = 0.6;
    if (isComponentPage) priority = 0.8;
    if (isGettingStarted) priority = 0.85;
    if (isIntroduction) priority = 0.9;

    // Use actual lastModified from page data if available, otherwise fallback to current date
    const lastModified = page.data.lastModified
      ? new Date(page.data.lastModified)
      : currentDate;

    return {
      url: `${baseUrl}${page.url}`,
      lastModified,
      changeFrequency: isComponentPage ? "weekly" : "monthly",
      priority,
    };
  });

  return [...staticRoutes, ...docRoutes];
}
