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

      {/* Gyülekezetek térképe – közvetlenül a hero alatt */}
      <section className="relative z-10 border-b border-cream-300/60 bg-gradient-to-b from-cream-50 to-cream-100/80 py-8 sm:py-10 lg:py-12">
        <div className="w-full px-3 sm:px-5 lg:px-8">
          <MapPreview congregations={congregations} variant="featured" />
        </div>

        <div className="container-page mt-8 sm:mt-10 lg:mt-12">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-gold-500" />
              Kalotaszeg
            </span>
            <h2 className="text-4xl font-semibold leading-tight text-graphite-900 sm:text-[2.75rem] lg:text-5xl">
              Térkép
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-graphite-600 sm:text-xl">
              Fedezze fel a Kalotaszegi Református Egyházmegye gyülekezeteit térképen.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link href="/terkep" className="btn-primary map-section-cta px-8 py-3.5 text-base">
                Részletes térkép megnyitása
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gyors elérés – alacsony, keskeny sáv */}
      <section className="relative z-20 pt-2 sm:pt-4">
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
