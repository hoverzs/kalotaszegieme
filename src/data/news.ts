import type { NewsItem } from "./types";

/** Üres alapállapot – a nyilvános oldal a tudósításokat használja. */
export const seedNews: NewsItem[] = [];

export function getNewsBySlugFromSeed(slug: string): NewsItem | undefined {
  return seedNews.find((n) => n.slug === slug);
}
