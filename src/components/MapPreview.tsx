"use client";

import dynamic from "next/dynamic";
import type { Congregation } from "@/data/types";
import { ChurchIcon, MapPinIcon } from "./Icons";

const CongregationMapClient = dynamic(
  () => import("./map/CongregationMapClient").then((mod) => mod.CongregationMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-cream-200/90">
        <span className="text-sm text-graphite-400">Térkép betöltése…</span>
      </div>
    ),
  },
);

function CompassRose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <path d="M32 6 L34 26 L32 32 L30 26 Z" fill="currentColor" opacity="0.45" />
      <path d="M32 58 L30 38 L32 32 L34 38 Z" fill="currentColor" opacity="0.25" />
      <path d="M6 32 L26 30 L32 32 L26 34 Z" fill="currentColor" opacity="0.25" />
      <path d="M58 32 L38 34 L32 32 L38 30 Z" fill="currentColor" opacity="0.25" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function SteampunkCorner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 40 L8 8 L40 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="18" cy="18" r="7" stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
      <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.35" />
      <path
        d="M18 11 L18 8 M18 25 L18 28 M11 18 L8 18 M25 18 L28 18 M12.5 12.5 L10.5 10.5 M23.5 23.5 L25.5 25.5 M23.5 12.5 L25.5 10.5 M12.5 23.5 L10.5 25.5"
        stroke="currentColor"
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

/**
 * Antik atlasz hangulatú, Leaflet-alapú gyülekezeti térkép.
 * A koordináták a congregations prop-ból jönnek – nem módosítjuk őket.
 */
export function MapPreview({
  congregations,
  variant = "default",
  mapHeightClass,
  showBadge = true,
}: {
  congregations: Congregation[];
  /** Főoldali kiemelt megjelenés vagy alapértelmezett. */
  variant?: "featured" | "default";
  mapHeightClass?: string;
  showBadge?: boolean;
}) {
  const mappableCount = congregations.filter(
    (c) => c.latitude !== null && c.longitude !== null,
  ).length;

  const isFeatured = variant === "featured";
  const heightClass =
    mapHeightClass ??
    (isFeatured
      ? "h-[240px] sm:h-[300px] md:h-[340px] lg:h-[400px]"
      : "h-[300px] sm:h-[360px] lg:h-[420px]");

  const fitPadding: [number, number] = isFeatured ? [28, 28] : [56, 56];
  const boundsPad = isFeatured ? 0.05 : 0.1;

  return (
    <div className={`map-atlas-card relative w-full ${isFeatured ? "map-atlas-card--featured" : ""}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-400/30 via-transparent to-burgundy-500/10 p-px"
        aria-hidden
      />

      <div
        className={`relative w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 shadow-premium sm:rounded-3xl ${
          isFeatured
            ? "border-gold-300/55 p-2 sm:p-3"
            : "border-gold-300/45 p-2 sm:p-3"
        }`}
      >
        <div className="map-atlas-parchment pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(184,146,74,0.14), transparent 42%), radial-gradient(circle at 85% 80%, rgba(110,20,35,0.09), transparent 45%)",
          }}
          aria-hidden
        />

        <CompassRose
          className={`pointer-events-none absolute z-20 text-gold-600/20 ${
            isFeatured
              ? "right-4 top-4 h-16 w-16 sm:h-20 sm:w-20"
              : "right-3 top-3 h-14 w-14 sm:h-16 sm:w-16"
          }`}
        />
        <SteampunkCorner
          className={`pointer-events-none absolute bottom-2 left-2 z-20 text-gold-700/25 ${
            isFeatured ? "h-11 w-11 sm:h-14 sm:w-14" : "h-10 w-10 sm:h-12 sm:w-12"
          }`}
        />

        {showBadge && (
          <div
            className={`map-atlas-badge absolute z-[1000] flex items-center gap-2.5 rounded-full border bg-cream-50/95 shadow-card backdrop-blur-sm ${
              isFeatured
                ? "bottom-12 left-3 border-gold-300/90 px-4 py-2 shadow-premium"
                : "left-3 top-3 border-gold-200/90 px-3 py-1.5"
            }`}
          >
            <span
              className={`flex shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500 ${
                isFeatured ? "h-8 w-8" : "h-7 w-7"
              }`}
            >
              <ChurchIcon className={isFeatured ? "h-4 w-4" : "h-3.5 w-3.5"} />
            </span>
            <span
              className={`font-semibold tracking-wide text-graphite-800 ${
                isFeatured ? "text-sm" : "text-xs"
              }`}
            >
              {mappableCount} gyülekezet
            </span>
            <MapPinIcon
              className={`shrink-0 text-gold-600 ${isFeatured ? "h-4 w-4" : "h-3.5 w-3.5"}`}
            />
          </div>
        )}

        <div
          className={`map-atlas-inner relative z-0 overflow-hidden rounded-2xl border border-cream-300/80 ${heightClass}`}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[500] opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(110,20,35,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(110,20,35,0.07) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
            aria-hidden
          />
          <div className="map-atlas-vignette pointer-events-none absolute inset-0 z-[550]" aria-hidden />
          <CongregationMapClient
            congregations={congregations}
            className="relative z-0 h-full w-full"
            boundsPad={boundsPad}
            fitPadding={fitPadding}
            maxZoom={isFeatured ? 12 : 11}
          />
        </div>
      </div>
    </div>
  );
}
