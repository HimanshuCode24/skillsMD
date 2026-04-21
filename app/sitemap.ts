import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = ["", "/skills", "/submit", "/pricing", "/community"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "daily") as
        | "weekly"
        | "daily",
      priority: route === "" ? 1 : 0.8,
    })),
  ];
}
