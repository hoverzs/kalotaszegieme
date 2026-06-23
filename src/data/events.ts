import type { EventItem } from "./types";

/**
 * Események – itt adhatók hozzá vagy módosíthatók az alkalom adatai.
 * Új esemény: másoljon egy meglévő blokkot, állítson be egyedi `id` és `slug` értéket.
 * A főoldal és az /esemenyek oldal közvetlenül ebből a fájlból olvas.
 */
export const seedEvents: EventItem[] = [
  {
    id: "noszovetseg-bonyha-2026",
    slug: "noszovetseg-bonyha-2026",
    title: "Országos nőszövetségi találkozó – Bonyha",
    date: "2026-07-04",
    location: "Bonyha",
    organizer: "Református Nőszövetség",
    description:
      "2026. július 4. · A gyermekek évében a találkozó programjai a családokra és a gyermekekre fókuszálnak. Részletek és jelentkezés az egyházmegyei hivatalnál.",
    category: "Egyházmegyei esemény",
    image: "/images/events/noszovetseg-bonyha-2026.jpg",
  },
  {
    id: "ifjusagi-tabor-2026",
    slug: "ifjusagi-tabor-2026",
    title: "Kalotaszegi egyházmegyei ifjúsági tábor",
    date: "2026-07-21",
    location: "Kalotaszeg",
    organizer: "Kalotaszegi Református Egyházmegye",
    description:
      "2026. július 21–25. · Felhívás a 14–18 éves fiataloknak. Jelentkezés és részletek az egyházmegyei hivatalnál.",
    category: "Ifjúsági alkalom",
    image: "/images/events/ifjusagi-tabor-2026.jpg",
  },
];

/** Esemény időpont szövege (pl. „10:00 – 16:00”). */
export function formatEventTime(event: EventItem): string | null {
  if (event.startTime && event.endTime) {
    return `${event.startTime} – ${event.endTime}`;
  }
  return event.startTime ?? event.endTime ?? null;
}
