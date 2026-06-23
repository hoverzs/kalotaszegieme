"use client";

import { useMemo, useState } from "react";
import type { NewsCategory, NewsItem } from "@/data/types";
import { NewsCard } from "./NewsCard";

const categories: (NewsCategory | "Mind")[] = [
  "Mind",
  "Tudósítás",
  "Felhívás",
  "Hír",
  "Ifjúság",
  "Presbiteri",
];

export function NewsList({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<NewsCategory | "Mind">("Mind");

  const filtered = useMemo(
    () => (active === "Mind" ? items : items.filter((n) => n.category === active)),
    [items, active],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-burgundy-500 text-cream-50"
                : "border border-cream-300 bg-white text-graphite-600 hover:border-gold-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
          Ebben a kategóriában jelenleg nincs hír.
        </div>
      )}
    </div>
  );
}
