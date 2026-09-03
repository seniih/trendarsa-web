import type { MetadataRoute } from "next";
import { getSiteInfo } from "@/data/site-content";
import { getProjects } from "@/data/projects";
import { getPosts } from "@/data/posts";
import { routing } from "@/i18n/routing";

const staticPaths = ["", "/projeler", "/neden-arsa", "/hakkimizda", "/blog", "/iletisim"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteInfo();
  const projects = await getProjects();
  const dynamicPaths = [
    ...projects.map((p) => `/projeler/${p.slug}`),
    ...getPosts().map((p) => `/blog/${p.slug}`),
  ];
  const allPaths = [...staticPaths, ...dynamicPaths];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of allPaths) {
    for (const locale of routing.locales) {
      // TR (varsayılan) prefix'siz, EN /en ile
      const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
      entries.push({
        url: `${site.url}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
