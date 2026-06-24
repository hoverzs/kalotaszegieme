"use client";

import { useMemo, useState } from "react";
import type { Congregation } from "@/data/types";
import { CongregationCard } from "./CongregationCard";
import { SearchIcon } from "./Icons";

export function CongregationList({ congregations }: { congregations: Congregation[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return congregations;
    // Keresés: gyülekezetnév, település, román név és lelkipásztor szerint.
    return congregations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.settlement.toLowerCase().includes(q) ||
        (c.romanianName ?? "").toLowerCase().includes(q) ||
        c.pastor.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q),
    );
  }, [congregations, query]);

  return (
    <div>
      <div className="relative w-full sm:max-w-md">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keresés gyülekezet, település vagy lelkipásztor szerint…"
          aria-label="Keresés a gyülekezetek között"
          className="w-full rounded-full border border-cream-300 bg-white py-3 pl-11 pr-4 text-sm text-graphite-800 shadow-sm placeholder:text-graphite-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
        />
      </div>

      <p className="mt-5 text-sm text-graphite-400">{filtered.length} gyülekezet</p>

      {filtered.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CongregationCard key={c.slug} congregation={c} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
          Nincs a keresésnek megfelelő gyülekezet.
        </div>
      )}
    </div>
  );
}
