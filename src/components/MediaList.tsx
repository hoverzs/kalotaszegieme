"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/data/types";
import { mediaTypes } from "@/data/media";
import { Badge } from "./Badge";
import { PlayIcon } from "./Icons";
import { formatHuDate } from "@/lib/site";

export function MediaList({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState<string>("Mind");
  const types = ["Mind", ...mediaTypes];

  const filtered = useMemo(
    () => (active === "Mind" ? items : items.filter((m) => m.type === active)),
    [items, active],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === t
                ? "bg-burgundy-500 text-cream-50"
                : "border border-cream-300 bg-white text-graphite-600 hover:border-gold-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <a
            key={m.id}
            href={m.url}
            target={m.url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="card group flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={m.thumbnail}
                alt={m.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-graphite-900/25 transition-colors group-hover:bg-graphite-900/40" />
              <span className="absolute left-3 top-3">
                <Badge tone="outline">{m.type}</Badge>
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-50/90 text-burgundy-500 shadow-lg transition-transform group-hover:scale-110">
                  <PlayIcon className="h-7 w-7" />
                </span>
              </span>
              {m.duration && (
                <span className="absolute bottom-3 right-3 rounded bg-graphite-900/80 px-2 py-0.5 text-xs font-medium text-cream-50">
                  {m.duration}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-lg font-semibold leading-snug text-graphite-900 group-hover:text-burgundy-600">
                {m.title}
              </h3>
              {m.speaker && (
                <p className="mt-1 text-sm text-graphite-500">{m.speaker}</p>
              )}
              {m.description && (
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-graphite-500">
                  {m.description}
                </p>
              )}
              <p className="mt-3 text-xs text-graphite-400">{formatHuDate(m.date)}</p>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
          Ebben a kategóriában jelenleg nincs tartalom.
        </div>
      )}
    </div>
  );
}
