import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DevotionCard } from "@/components/DevotionCard";
import { DevotionAppCard } from "@/components/DevotionAppCard";
import { ArrowRightIcon, BookIcon } from "@/components/Icons";
import { devotionApps } from "@/data/devotionApps";
import { getDailyDevotion } from "@/data/devotion";

export const metadata: Metadata = {
  title: "Áhítatok",
  description:
    "Napi áhítatok – a teljes tartalom az ÁhítApp és az IFIge külső alkalmazásokban érhető el.",
};

export default async function DevotionsPage() {
  const hasLiveFeed = Boolean(process.env.AHITAPP_DEVOTION_URL);
  const devotion = hasLiveFeed ? await getDailyDevotion() : null;

  return (
    <>
      <PageHeader
        eyebrow="Lelki útravaló"
        title="Áhítatok"
        description="Napi ige és rövid gondolat. A teljes áhítatok külső alkalmazásokban olvashatók – innen előnézetet és közvetlen linkeket kínálunk."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Áhítatok" }]}
      />

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            {devotion ? (
              <DevotionCard devotion={devotion} />
            ) : (
              <div className="rounded-2xl border border-dashed border-cream-300 bg-white p-10 text-center shadow-card">
                <BookIcon className="mx-auto h-10 w-10 text-gold-500" />
                <h2 className="mt-4 font-serif text-2xl font-semibold text-graphite-900">
                  Napi áhítatok online
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-graphite-500">
                  A mai áhítat és a korábbi bejegyzések az alábbi alkalmazásokban érhetők el.
                  A honlap nem tartalmaz mintaszöveget – csak valós, naponta frissülő tartalom
                  jelenik meg, amint az integráció be van kapcsolva.
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gold-200/70 bg-gold-50 p-7">
            <BookIcon className="h-8 w-8 text-gold-600" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-graphite-900">
              Külső alkalmazások
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-graphite-600">
              A napi áhítatok teljes szövege az ÁhítApp és az IFIge szolgáltatásokban érhető el.
            </p>
            <a
              href="https://ahit-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              Megnyitás az ÁhítAppban
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-graphite-900">
            Online áhítatok
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {devotionApps.map((app) => (
              <DevotionAppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
