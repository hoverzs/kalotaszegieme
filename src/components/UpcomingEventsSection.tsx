import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { SectionTitle } from "@/components/SectionTitle";
import { ArrowRightIcon } from "@/components/Icons";
import { getHomepageEvents } from "@/lib/content/events";

export async function UpcomingEventsSection() {
  const { featured, events } = await getHomepageEvents(3);
  const display = featured ? [featured, ...events] : events;
  const hasEvents = display.length > 0;

  return (
    <section className="bg-cream-50 pt-10 pb-10 sm:pt-12 sm:pb-12">
      <div className="container-page">
        <SectionTitle
          eyebrow="Naptár"
          title="Közelgő események"
          description="A Kalotaszegi Református Egyházmegye következő alkalmai és programjai."
        />

        {hasEvents ? (
          <div
            className={`mt-8 grid grid-cols-1 gap-5 ${
              display.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
            }`}
          >
            {display.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-cream-300 bg-white px-6 py-10 text-center text-sm text-graphite-500">
            Jelenleg nincs közelgő esemény a naptárban. Az új alkalmak hamarosan megjelennek itt.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Link href="/esemenyek" className="btn-primary">
            Összes esemény
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
