import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { CalendarIcon } from "@/components/Icons";
import type { EventItem } from "@/data/types";
import { getUpcomingEvents, getPastEvents } from "@/lib/content/events";
import { formatHuDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Események",
  description:
    "A Kalotaszegi Református Egyházmegye eseményei, alkalmai és ünnepei.",
};

function groupByMonth(events: EventItem[]) {
  return events.reduce<Record<string, EventItem[]>>((acc, e) => {
    const key = new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "long",
    }).format(new Date(e.date));
    (acc[key] ??= []).push(e);
    return acc;
  }, {});
}

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents();
  const past = await getPastEvents();
  const groups = groupByMonth(upcoming);

  return (
    <>
      <PageHeader
        eyebrow="Alkalmaink"
        title="Események"
        description="Egyházmegyei találkozók, konferenciák, ünnepek és közösségi alkalmak."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Események" }]}
      />

      <section className="container-page py-16">
        {upcoming.length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groups).map(([month, items]) => (
              <div key={month}>
                <h2 className="mb-5 flex items-center gap-3 font-serif text-2xl font-semibold capitalize text-graphite-900">
                  <CalendarIcon className="h-6 w-6 text-gold-600" />
                  {month}
                </h2>
                <div className="space-y-4">
                  {items.map((e) => (
                    <EventCard key={e.id} event={e} featured={e.featured} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-50 px-6 py-12 text-center text-graphite-500">
            Jelenleg nincs közelgő esemény. Kérjük, látogasson vissza később.
          </p>
        )}

        {past.length > 0 && (
          <div className="mt-16 border-t border-cream-300 pt-12">
            <h2 className="mb-6 font-serif text-xl font-semibold text-graphite-700">
              Korábbi események
            </h2>
            <div className="space-y-4 opacity-80">
              {past.slice(0, 5).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}

        <aside className="mt-16">
          <div className="rounded-2xl bg-burgundy-500 p-8 text-cream-50 shadow-premium sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h3 className="font-serif text-xl font-semibold">Eseményt szervezne?</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-100/85">
                Gyülekezeti alkalmait szívesen megjelenítjük a közös naptárban. Vegye fel a
                kapcsolatot az egyházmegyei hivatallal.
              </p>
            </div>
            <Link
              href="/elerhetoseg"
              className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full border border-cream-50/30 px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-cream-50/10 sm:mt-0"
            >
              Kapcsolatfelvétel
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-graphite-400">
            Utolsó frissítés: {formatHuDate(new Date().toISOString())}
          </p>
        </aside>
      </section>
    </>
  );
}
