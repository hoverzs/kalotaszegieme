"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { createRoot, type Root } from "react-dom/client";
import type { Congregation } from "@/data/types";

type MappableCongregation = Congregation & { latitude: number; longitude: number };

function PopupContent({ congregation }: { congregation: MappableCongregation }) {
  return (
    <div className="congregation-map-popup__inner">
      <p className="congregation-map-popup__title">{congregation.name}</p>
      <p className="congregation-map-popup__settlement">{congregation.settlement}</p>
      <Link href={`/gyulekezetek/${congregation.slug}`} className="congregation-map-popup__link">
        Adatlap megnyitása
      </Link>
    </div>
  );
}

export function CongregationMapClient({
  congregations,
  className = "h-full w-full",
  boundsPad = 0.1,
  fitPadding = [56, 56] as [number, number],
  maxZoom = 11,
}: {
  congregations: Congregation[];
  className?: string;
  /** Bounds enyhén tágítása, hogy a markerek ne szoruljanak a szélre. */
  boundsPad?: number;
  fitPadding?: [number, number];
  maxZoom?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRootsRef = useRef<Root[]>([]);

  const mappable = useMemo(
    () =>
      congregations.filter(
        (c): c is MappableCongregation => c.latitude !== null && c.longitude !== null,
      ),
    [congregations],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mappable.length === 0) return;

    let map: import("leaflet").Map | null = null;
    let cancelled = false;

    void (async () => {
      const L = await import("leaflet");

      if (cancelled || !containerRef.current) return;

      popupRootsRef.current.forEach((root) => root.unmount());
      popupRootsRef.current = [];
      container.innerHTML = "";

      map = L.map(container, {
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "congregation-map-marker",
        html: `<span class="congregation-map-marker__pin" aria-hidden="true"><span class="congregation-map-marker__core"></span><span class="congregation-map-marker__stem"></span></span>`,
        iconSize: [26, 34],
        iconAnchor: [13, 34],
        popupAnchor: [0, -32],
      });

      const points: [number, number][] = [];

      for (const congregation of mappable) {
        const point: [number, number] = [congregation.latitude, congregation.longitude];
        points.push(point);

        const marker = L.marker(point, { icon }).addTo(map);
        const popupNode = document.createElement("div");
        const root = createRoot(popupNode);
        root.render(<PopupContent congregation={congregation} />);
        popupRootsRef.current.push(root);

        marker.bindPopup(popupNode, {
          className: "congregation-map-popup",
          closeButton: false,
          offset: [0, -2],
        });
      }

      if (points.length === 1) {
        map.setView(points[0], 12);
      } else {
        const bounds = L.latLngBounds(points).pad(boundsPad);
        map.fitBounds(bounds, { padding: fitPadding, maxZoom });
      }
    })();

    return () => {
      cancelled = true;
      popupRootsRef.current.forEach((root) => root.unmount());
      popupRootsRef.current = [];
      map?.remove();
      map = null;
    };
  }, [mappable, boundsPad, fitPadding, maxZoom]);

  if (mappable.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-cream-200 text-sm text-graphite-500 ${className}`}
      >
        Nincs megjeleníthető gyülekezet a térképen.
      </div>
    );
  }

  return <div ref={containerRef} className={className} aria-label="Gyülekezetek térképe" />;
}
