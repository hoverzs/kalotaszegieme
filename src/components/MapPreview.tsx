"use client";

import dynamic from "next/dynamic";
import type { Congregation } from "@/data/types";
import { ChurchIcon, MapPinIcon } from "./Icons";

const CongregationMapClient = dynamic(
  () => import("./map/CongregationMapClient").then((mod) => mod.CongregationMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[260px] items-center justify-center bg-cream-200/90">
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
  mapHeightClass = "h-[300px] sm:h-[360px] lg:h-[420px]",
  showBadge = true,
}: {
  congregations: Congregation[];
  /** Tailwind magasság osztályok a térképhez (pl. főoldal vs. /terkep). */
  mapHeightClass?: string;
  showBadge?: boolean;
}) {
  const mappableCount = congregations.filter(
    (c) => c.latitude !== null && c.longitude !== null,
  ).length;

  return (
    <div className="map-atlas-card relative">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/25 via-transparent to-burgundy-500/10 p-px"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-gold-300/45 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 p-2 shadow-premium sm:p-3">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(184,146,74,0.12), transparent 42%), radial-gradient(circle at 85% 80%, rgba(110,20,35,0.08), transparent 45%)",
          }}
          aria-hidden
        />

        <CompassRose className="pointer-events-none absolute right-3 top-3 z-20 h-14 w-14 text-gold-600/25 sm:h-16 sm:w-16" />
        <SteampunkCorner className="pointer-events-none absolute bottom-2 left-2 z-20 h-10 w-10 text-gold-700/30 sm:h-12 sm:w-12" />

        {showBadge && (
          <div className="absolute left-3 top-3 z-[1000] flex items-center gap-2 rounded-full border border-gold-200/90 bg-cream-50/95 px-3 py-1.5 shadow-card backdrop-blur-sm">
            <ChurchIcon className="h-4 w-4 shrink-0 text-burgundy-500" />
            <span className="text-xs font-semibold tracking-wide text-graphite-700">
              {mappableCount} gyülekezet
            </span>
            <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-gold-600" />
          </div>
        )}

        <div
          className={`map-atlas-inner relative z-0 overflow-hidden rounded-xl border border-cream-300/80 ${mapHeightClass}`}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[500] opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(110,20,35,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(110,20,35,0.07) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
            aria-hidden
          />
          <CongregationMapClient
            congregations={congregations}
            className="relative z-0 h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
