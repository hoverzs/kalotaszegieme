import type { Devotion } from "@/data/types";
import { formatHuDate } from "@/lib/site";
import { ArrowRightIcon, BookIcon } from "./Icons";

export function DevotionCard({
  devotion,
  variant = "full",
}: {
  devotion: Devotion;
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-gold-200/70 bg-gradient-to-br from-burgundy-500 to-burgundy-700 text-cream-50 shadow-premium ${
        compact ? "p-6" : "p-8 sm:p-10"
      }`}
    >
      {/* Háttér-motívum */}
      <BookIcon className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-cream-50/5" />

      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-gold-300">
          <span className="h-px w-6 bg-gold-400" />
          Mai áhítat
          <span className="ml-auto font-normal normal-case tracking-normal text-cream-200/70">
            {formatHuDate(devotion.date)}
          </span>
        </div>

        {devotion.facebookText ? (
          /* Az ÁhítApp napi Facebook-poszt szövege – változatlanul, sortörésekkel. */
          <p
            className={`mt-5 whitespace-pre-line leading-relaxed text-cream-50/95 ${
              compact ? "text-sm" : "text-base sm:text-lg"
            }`}
          >
            {devotion.facebookText}
          </p>
        ) : (
          <>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-gold-200">
              {devotion.reference}
            </p>
            <blockquote
              className={`mt-2 font-serif italic leading-snug text-cream-50 ${
                compact ? "text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              „{devotion.verse}”
            </blockquote>

            <p className="mt-5 text-sm leading-relaxed text-cream-100/85">{devotion.thought}</p>
          </>
        )}

        <a
          href={devotion.appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-graphite-900 transition-colors hover:bg-gold-400"
        >
          Tovább az ÁhítAppban
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
