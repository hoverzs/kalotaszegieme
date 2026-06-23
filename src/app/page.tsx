import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { DigitalDevotionsSection } from "@/components/DigitalDevotionsSection";
import { LivestreamSection } from "@/components/LivestreamSection";
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection";
import { LatestTudositasokSection } from "@/components/LatestTudositasokSection";
import { MapPreview } from "@/components/MapPreview";
import { GalleryGrid } from "@/components/GalleryGrid";
import {
  BookIcon,
  CalendarIcon,
  ChurchIcon,
  MapPinIcon,
  SunIcon,
  ArrowRightIcon,
} from "@/components/Icons";
import { getCongregations } from "@/lib/content/congregations";
import {
  congregationGalleryImages,
  featuredGallerySlugs,
  localImages,
} from "@/data/images";

const quickAccess = [
  { label: "Gyülekezetek", href: "/gyulekezetek", icon: ChurchIcon },
  { label: "Címtár", href: "/cimtar", icon: BookIcon },
  { label: "Események", href: "/esemenyek", icon: CalendarIcon },
  { label: "Mai áhítat", href: "/ahitatok", icon: SunIcon },
  { label: "Térkép", href: "/terkep", icon: MapPinIcon },
];

export default async function HomePage() {
  const congregations = await getCongregations();
  const galleryImages = congregationGalleryImages(congregations, {
    slugs: featuredGallerySlugs,
    limit: 3,
  });

  return (
    <>
      <Hero
        size="full"
        eyebrow="Kalotaszeg · Erdély"
        title="Kalotaszegi Református Egyházmegye"
        subtitle="Hitben járva, közösségben élve"
        image={localImages.headerBanner}
        imageAlt="Kalotaszegi református templom naplementében"
        showLogo
        primaryCta={{ label: "Gyülekezeteink", href: "/gyulekezetek" }}
        secondaryCta={{ label: "Az egyházmegyéről", href: "/egyhazmegye" }}
        sidePanel={{
          eyebrow: "Köszöntő",
          title: "Egy közösség, amely a hitből és a hagyományból él",
          body:
            "A Kalotaszegi Református Egyházmegye Erdély egyik legnagyobb hagyományú tájegységének gyülekezeteit foglalja magában. Középkori templomok, festett kazettás mennyezetek, varrottasok és élő közösségek őrzik itt évszázadok óta a református hitet és a magyar népi kultúrát.",
        }}
      />

      {/* Gyors elérés – alacsony, keskeny sáv */}
      <section className="relative z-20 -mt-12 sm:-mt-14">
        <div className="container-page">
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-cream-300/70 bg-white/95 p-3 shadow-premium backdrop-blur sm:gap-3 sm:p-4 lg:grid-cols-5">
            {quickAccess.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-colors hover:bg-cream-100"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-200 bg-burgundy-50 text-burgundy-500 transition-colors group-hover:bg-burgundy-500 group-hover:text-cream-50">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium text-graphite-700 sm:text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <UpcomingEventsSection />

      <LivestreamSection />

      <DigitalDevotionsSection />

      <LatestTudositasokSection />

      {/* Gyülekezetek a térképen */}
      <section className="bg-graphite-900 py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-gold-400">
                <span className="h-px w-6 bg-gold-400" />
                Térkép
              </span>
              <h2 className="text-3xl font-semibold leading-tight text-cream-50 sm:text-4xl">
                Gyülekezeteink a térképen
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-cream-200/70">
                Fedezze fel a kalotaszegi gyülekezeteket Felszegtől Alszegig, a Nádas mentéig.
                Kattintson egy pontra a részletes adatlapért. Az interaktív, OpenStreetMap-alapú
                térkép hamarosan elérhető lesz.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/terkep" className="btn-primary">
                  Térkép megnyitása
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/gyulekezetek"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/30 px-6 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-cream-50/10"
                >
                  Gyülekezetek listája
                </Link>
              </div>
            </div>
            <MapPreview congregations={congregations} />
          </div>
        </div>
      </section>

      {/* Templomgaléria – rövidített (3 kép) */}
      <section className="container-page py-14 sm:py-16">
        <SectionTitle
          eyebrow="Templomgaléria"
          title="Templomok galériája"
          description="Kalotaszeg középkori és népi építészeti öröksége képekben."
          link={{ label: "Teljes galéria", href: "/templomgaleria" }}
        />
        <div className="mt-8">
          <GalleryGrid images={galleryImages} columns={3} />
        </div>
      </section>
    </>
  );
}
