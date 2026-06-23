import Link from "next/link";
import type { Congregation } from "@/data/types";
import { MapPinIcon } from "./Icons";

/**
 * Statikus térkép-placeholder.
 *
 * Előkészítve OpenStreetMap + Leaflet integrációra: a gyülekezetek
 * latitude/longitude mezői alapján a pontokat a befoglaló téglalapra
 * normalizálva, arányosan helyezzük el. A későbbi Leaflet-térkép ezt a
 * komponenst válthatja le (azonos prop-felület mellett).
 */
export function MapPreview({
  congregations,
  height = "h-[420px]",
  showLegend = true,
}: {
  congregations: Congregation[];
  height?: string;
  showLegend?: boolean;
}) {
  // Csak a koordinátával rendelkező gyülekezeteket jelenítjük meg.
  const mappable = congregations.filter(
    (c): c is Congregation & { latitude: number; longitude: number } =>
      c.latitude !== null && c.longitude !== null,
  );

  const lats = mappable.map((c) => c.latitude);
  const lngs = mappable.map((c) => c.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const padLat = (maxLat - minLat) * 0.18 || 0.02;
  const padLng = (maxLng - minLng) * 0.18 || 0.02;

  const project = (c: { latitude: number; longitude: number }) => {
    const x = ((c.longitude - (minLng - padLng)) / (maxLng - minLng + 2 * padLng)) * 100;
    const y = (1 - (c.latitude - (minLat - padLat)) / (maxLat - minLat + 2 * padLat)) * 100;
    return { x, y };
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-cream-300/70 bg-cream-200 ${height}`}>
      {/* Stilizált térkép-háttér (rács + finom domborzat) */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(110,20,35,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(110,20,35,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 35%, rgba(184,146,74,0.18), transparent 45%), radial-gradient(ellipse at 70% 70%, rgba(110,20,35,0.10), transparent 50%)",
        }}
      />

      {/* Pontok */}
      {mappable.map((c) => {
        const { x, y } = project(c);
        return (
          <Link
            key={c.slug}
            href={`/gyulekezetek/${c.slug}`}
            className="group/pin absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={`${c.settlement} – ${c.name}`}
          >
            <span className="relative flex flex-col items-center">
              <span className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream-50 bg-burgundy-500 text-cream-50 shadow-md transition-transform group-hover/pin:scale-110">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <span className="-mt-1 h-2 w-2 rotate-45 bg-burgundy-500" />
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-graphite-900 px-2 py-1 text-[11px] font-medium text-cream-50 opacity-0 shadow-lg transition-opacity group-hover/pin:opacity-100">
                {c.settlement}
              </span>
            </span>
          </Link>
        );
      })}

      {/* Előkészítés-jelölés */}
      <div className="absolute bottom-3 right-3 rounded-md bg-cream-50/90 px-3 py-1.5 text-[11px] font-medium text-graphite-500 backdrop-blur">
        Interaktív térkép (OpenStreetMap / Leaflet) – hamarosan
      </div>

      {showLegend && (
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-cream-50/90 px-3 py-1.5 text-[11px] font-medium text-graphite-600 backdrop-blur">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-burgundy-500 text-cream-50">
            <MapPinIcon className="h-2.5 w-2.5" />
          </span>
          {mappable.length} gyülekezet
        </div>
      )}
    </div>
  );
}
