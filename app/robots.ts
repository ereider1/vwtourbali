import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteForHost } from "@/lib/domains";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const site = siteForHost(headersList.get("host"));

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
