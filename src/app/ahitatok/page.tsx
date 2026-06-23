import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DevotionCard } from "@/components/DevotionCard";
import { ArrowRightIcon, BookIcon } from "@/components/Icons";
import { recentDevotions, todayDevotion } from "@/data/devotion";
import { formatHuDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Áhítatok",
  description:
    "Napi áhítatok előnézete – a teljes tartalom az ÁhítApp külső alkalmazásban érhető el.",
};

export default function DevotionsPage() {
  const previews = recentDevotions.filter((d) => d.date !== todayDevotion.date);

  return (
    <>
      <PageHeader
        eyebrow="Lelki útravaló"
        title="Áhítatok"
        description="Napi ige és rövid gondolat. A teljes áhítatok az ÁhítApp alkalmazásban olvashatók – innen csak előnézetet és külső linket kínálunk."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Áhítatok" }]}
      />

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <DevotionCard devotion={todayDevotion} />
          </div>

          <div className="rounded-2xl border border-gold-200/70 bg-gold-50 p-7">
            <BookIcon className="h-8 w-8 text-gold-600" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-graphite-900">
              Az ÁhítApp-ról
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite-600">
              A napi áhítatok teljes szövege a külső ÁhítApp szolgáltatásban érhető el.
              Honlapunkon az áhítatok kizárólag előnézetként, illetve külső hivatkozásként
              jelennek meg.
            </p>
            <a
              href={todayDevotion.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              Megnyitás az ÁhítAppban
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Korábbi áhítatok előnézete */}
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-graphite-900">
            Korábbi áhítatok
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((d) => (
              <article
                key={d.date}
                className="flex flex-col rounded-2xl border border-cream-300/70 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <time className="text-xs font-medium uppercase tracking-wide text-graphite-400">
                  {formatHuDate(d.date)}
                </time>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-burgundy-500">
                  {d.reference}
                </p>
                <blockquote className="mt-2 font-serif text-lg italic leading-snug text-graphite-800">
                  „{d.verse}”
                </blockquote>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-graphite-500">
                  {d.thought}
                </p>
                <a
                  href={d.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-5"
                >
                  Tovább az ÁhítAppban
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
