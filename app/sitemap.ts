import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteForHost } from "@/lib/domains";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const site = siteForHost(headersList.get("host"));

  const entries: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  if (site.key === "main") {
    entries.push({
      url: `${site.url}/tours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return entries;
}
