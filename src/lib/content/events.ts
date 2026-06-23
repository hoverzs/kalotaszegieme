import type { EventItem } from "@/data/types";
import { seedEvents } from "@/data/events";
import { readContentJson, writeContentJson } from "./store";

const FILE = "events.json";

function startOfDay(date: Date): number {
  return new Date(date.toDateString()).getTime();
}

/** Nyilvános oldalak – a `src/data/events.ts` fájlból (git-alapú szerkesztés). */
export async function getEvents(): Promise<EventItem[]> {
  return seedEvents;
}

async function loadAdminEvents(): Promise<EventItem[]> {
  return readContentJson<EventItem[]>(FILE, async () => seedEvents);
}

export async function saveEvents(data: EventItem[]): Promise<void> {
  await writeContentJson(FILE, data);
}

export async function createEvent(item: EventItem): Promise<EventItem> {
  const list = await loadAdminEvents();
  list.push(item);
  await saveEvents(list);
  return item;
}

export async function updateEvent(id: string, patch: Partial<EventItem>): Promise<EventItem | null> {
  const list = await loadAdminEvents();
  const index = list.findIndex((e) => e.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...patch, id: list[index].id };
  await saveEvents(list);
  return list[index];
}

export async function deleteEvent(id: string): Promise<boolean> {
  const list = await loadAdminEvents();
  const next = list.filter((e) => e.id !== id);
  if (next.length === list.length) return false;
  await saveEvents(next);
  return true;
}

export async function getUpcomingEvents(from: Date = new Date()): Promise<EventItem[]> {
  const fromTime = startOfDay(from);
  const list = await getEvents();
  return [...list]
    .filter((e) => new Date(e.date).getTime() >= fromTime)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getSortedEvents(): Promise<EventItem[]> {
  const list = await getEvents();
  return [...list].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export async function getPastEvents(from: Date = new Date()): Promise<EventItem[]> {
  const fromTime = startOfDay(from);
  const list = await getEvents();
  return [...list]
    .filter((e) => new Date(e.date).getTime() < fromTime)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getHomepageEvents(limit = 4): Promise<{
  featured: EventItem | null;
  events: EventItem[];
}> {
  const upcoming = await getUpcomingEvents();
  const featured = upcoming.find((e) => e.featured) ?? null;
  const rest = upcoming.filter((e) => e.id !== featured?.id);
  const slots = limit - (featured ? 1 : 0);
  return {
    featured,
    events: rest.slice(0, Math.max(slots, 0)),
  };
}

export async function getEventById(id: string): Promise<EventItem | undefined> {
  const list = await getEvents();
  return list.find((e) => e.id === id);
}
