import { revalidateTag, unstable_cache } from "next/cache";
import type { NewsItem } from "@/data/types";
import { seedNews } from "@/data/news";
import { readContentJson, writeContentJson } from "./store";

const TAG = "news";
const FILE = "news.json";

async function loadRaw(): Promise<NewsItem[]> {
  return readContentJson<NewsItem[]>(FILE, async () => seedNews);
}

export const getNews = unstable_cache(loadRaw, [TAG], { tags: [TAG] });

export async function saveNews(data: NewsItem[]): Promise<void> {
  await writeContentJson(FILE, data);
  revalidateTag(TAG);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const list = await getNews();
  return list.find((n) => n.slug === slug);
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const list = await getNews();
  return list.map((n) => n.slug);
}

export async function getNewsByCongregation(slug: string): Promise<NewsItem[]> {
  const list = await getNews();
  return list.filter((n) => n.congregationSlug === slug);
}

export async function createNewsItem(item: NewsItem): Promise<NewsItem> {
  const list = await loadRaw();
  list.unshift(item);
  await saveNews(list);
  return item;
}

export async function updateNewsItem(
  slug: string,
  patch: Partial<NewsItem>,
): Promise<NewsItem | null> {
  const list = await loadRaw();
  const index = list.findIndex((n) => n.slug === slug);
  if (index === -1) return null;
  list[index] = { ...list[index], ...patch, slug: list[index].slug, id: list[index].id };
  await saveNews(list);
  return list[index];
}

export async function deleteNewsItem(slug: string): Promise<boolean> {
  const list = await loadRaw();
  const next = list.filter((n) => n.slug !== slug);
  if (next.length === list.length) return false;
  await saveNews(next);
  return true;
}
