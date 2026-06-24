import type { MetadataRoute } from "next";
import { getAllCongregationSlugs } from "@/lib/content/congregations";
import { getAllTudositasSlugs } from "@/lib/tudositasok";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/egyhazmegye",
  "/gyulekezetek",
  "/cimtar",
  "/terkep",
  "/esemenyek",
  "/esemenynaptar",
  "/tudositasok",
  "/dokumentumtar",
  "/ahitatok",
  "/templomgaleria",
  "/elerhetoseg",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${siteConfig.domain}`;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const congregationSlugs = await getAllCongregationSlugs();
  const congregationEntries: MetadataRoute.Sitemap = congregationSlugs.map((slug) => ({
    url: `${base}/gyulekezetek/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tudositasSlugs = getAllTudositasSlugs();
  const tudositasEntries: MetadataRoute.Sitemap = tudositasSlugs.map((slug) => ({
    url: `${base}/tudositasok/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...congregationEntries, ...tudositasEntries];
}
