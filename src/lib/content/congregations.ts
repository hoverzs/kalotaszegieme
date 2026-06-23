import { revalidateTag, unstable_cache } from "next/cache";
import type { Congregation } from "@/data/types";
import { seedCongregations } from "@/data/congregations";
import { readContentJson, writeContentJson } from "./store";

const TAG = "congregations";
const FILE = "congregations.json";

async function loadRaw(): Promise<Congregation[]> {
  return readContentJson<Congregation[]>(FILE, async () => seedCongregations);
}

export const getCongregations = unstable_cache(loadRaw, [TAG], { tags: [TAG] });

export async function saveCongregations(data: Congregation[]): Promise<void> {
  await writeContentJson(FILE, data);
  revalidateTag(TAG);
}

export async function getCongregationBySlug(slug: string): Promise<Congregation | undefined> {
  const list = await getCongregations();
  return list.find((c) => c.slug === slug);
}

export async function getAllCongregationSlugs(): Promise<string[]> {
  const list = await getCongregations();
  return list.map((c) => c.slug);
}

export async function getMappableCongregations(): Promise<Congregation[]> {
  const list = await getCongregations();
  return list.filter((c) => c.latitude !== null && c.longitude !== null);
}

export async function updateCongregation(
  slug: string,
  patch: Partial<Congregation>,
): Promise<Congregation | null> {
  const list = await loadRaw();
  const index = list.findIndex((c) => c.slug === slug);
  if (index === -1) return null;
  list[index] = { ...list[index], ...patch, slug: list[index].slug, id: list[index].id };
  await saveCongregations(list);
  return list[index];
}
