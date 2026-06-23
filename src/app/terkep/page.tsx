import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MapPreview } from "@/components/MapPreview";
import { ArrowRightIcon, MapPinIcon } from "@/components/Icons";
import { getCongregations } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Térkép",
  description:
    "A kalotaszegi református gyülekezetek elhelyezkedése térképen (előkészítve OpenStreetMap / Leaflet integrációra).",
};

export default async function MapPage() {
  const congregations = await getCongregations();
  const sorted = [...congregations].sort((a, b) =>
    a.settlement.localeCompare(b.settlement, "hu"),
  );

  return (
    <>
      <PageHeader
        eyebrow="Tájékozódás"
        title="Térkép"
        description="Gyülekezeteink elhelyezkedése Kalotaszeg tájain. Az interaktív, OpenStreetMap-alapú térkép hamarosan elérhető lesz."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Térkép" }]}
      />

      <section className="container-page py-16">
        <MapPreview congregations={sorted} height="h-[560px]" />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((c) => (
            <Link
              key={c.slug}
              href={`/gyulekezetek/${c.slug}`}
              className="group flex items-start gap-3 rounded-2xl border border-cream-300/70 bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium text-graphite-900">
                  {c.settlement}
                </span>
                <span className="block text-xs text-graphite-400">
                  {c.latitude !== null && c.longitude !== null
                    ? `${c.latitude.toFixed(4)}, ${c.longitude.toFixed(4)}`
                    : "Koordináta feltöltés alatt"}
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-burgundy-500 opacity-0 transition-opacity group-hover:opacity-100">
                  Adatlap
                  <ArrowRightIcon className="h-3 w-3" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-cream-50 p-6 text-sm text-graphite-500">
          <strong className="font-semibold text-graphite-700">Fejlesztői megjegyzés:</strong>{" "}
          A gyülekezetek mintaadatai tartalmaznak <code>latitude</code> és{" "}
          <code>longitude</code> mezőket, így a térkép később közvetlenül lecserélhető
          interaktív OpenStreetMap + Leaflet megjelenítésre, a komponens prop-felületének
          megtartásával.
        </div>
      </section>
    </>
  );
}
