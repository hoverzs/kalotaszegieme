import Image from "next/image";
import type { EventItem } from "@/data/types";
import { formatEventTime } from "@/data/events";
import { dateParts } from "@/lib/site";
import { eventCategoryStyles } from "@/lib/events";
import { ClockIcon, MapPinIcon } from "./Icons";

function EventDateBlock({
  date,
  size = "default",
}: {
  date: string;
  size?: "default" | "large";
}) {
  const { day, month, year } = dateParts(date);
  const large = size === "large";

  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-xl bg-burgundy-500 text-cream-50 shadow-sm ${
        large ? "h-24 w-24 sm:h-28 sm:w-28" : "h-20 w-20"
      }`}
    >
      <span
        className={`font-semibold leading-none ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}
      >
        {day}
      </span>
      <span
        className={`mt-1 font-medium uppercase tracking-wide text-gold-300 ${
          large ? "text-sm" : "text-xs"
        }`}
      >
        {month}
      </span>
      <span className={`text-cream-200/70 ${large ? "text-xs" : "text-[10px]"}`}>{year}</span>
    </div>
  );
}

function EventMeta({ event }: { event: EventItem }) {
  const time = formatEventTime(event);
  const styles = eventCategoryStyles[event.category];

  return (
    <>
      <span
        className={`mb-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${styles.badge}`}
      >
        {event.category}
      </span>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-graphite-500">
        {time && (
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-gold-600" />
            {time}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon className="h-4 w-4 text-gold-600" />
          {event.location}
        </span>
      </div>
    </>
  );
}

export function EventCard({
  event,
  featured = false,
}: {
  event: EventItem;
  featured?: boolean;
}) {
  const styles = eventCategoryStyles[event.category];

  if (featured) {
    return (
      <article className="group overflow-hidden rounded-2xl border border-cream-300/60 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover lg:flex">
        {event.image && (
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:w-2/5">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className={`absolute left-0 top-0 h-1 w-full ${styles.accent}`} />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8 lg:flex-row">
          {!event.image && (
            <EventDateBlock date={event.date} size="large" />
          )}

          <div className="flex flex-1 flex-col">
            {event.image && (
              <div className="mb-4 flex items-start gap-5">
                <EventDateBlock date={event.date} size="large" />
                <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-burgundy-700">
                  Kiemelt esemény
                </span>
              </div>
            )}

            {!event.image && (
              <span className="mb-2 inline-flex w-fit rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-burgundy-700">
                Kiemelt esemény
              </span>
            )}

            <h3 className="font-serif text-2xl font-semibold leading-snug text-graphite-900 sm:text-3xl">
              {event.title}
            </h3>

            <EventMeta event={event} />

            {event.organizer && (
              <p className="mt-2 text-sm text-graphite-400">Szervező: {event.organizer}</p>
            )}

            <p className="mt-3 line-clamp-3 text-base leading-relaxed text-graphite-500">
              {event.description}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-300/60 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row">
      {event.image && (
        <div className="relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-36 md:w-44">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`} />
        </div>
      )}

      <div className="flex flex-1 gap-5 p-5">
        <EventDateBlock date={event.date} />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="font-serif text-lg font-semibold leading-snug text-graphite-900">
            {event.title}
          </h3>

          <EventMeta event={event} />

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-graphite-500">
            {event.description}
          </p>
        </div>
      </div>
    </article>
  );
}
