import type { Livestream } from "@/data/livestreams";
import { ClockIcon, ExternalLinkIcon, PlayIcon } from "./Icons";

export function LivestreamCard({ stream }: { stream: Livestream }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-cream-300/70 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300/80 hover:shadow-card-hover sm:p-6">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-200 bg-burgundy-50 text-burgundy-500 transition-colors group-hover:bg-burgundy-500 group-hover:text-cream-50">
          <PlayIcon className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="font-serif text-lg font-semibold leading-snug text-graphite-900 sm:text-xl">
            {stream.congregation}
          </h3>

          <p className="mt-2 inline-flex items-center gap-2 text-sm text-graphite-500">
            <ClockIcon className="h-4 w-4 shrink-0 text-gold-600" />
            {stream.serviceTime}
          </p>
        </div>
      </div>

      <div className="mt-auto border-t border-cream-200/80 pt-5">
        <a
          href={stream.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full sm:w-auto"
        >
          Közvetítés megtekintése
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
