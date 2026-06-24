"use client";

import { useMemo, useState } from "react";
import type { DocumentItem } from "@/data/types";
import { documentCategories } from "@/data/documents";
import { Badge } from "./Badge";
import { DownloadIcon, DocumentIcon } from "./Icons";
import { formatHuDate } from "@/lib/site";

export function DocumentList({ documents }: { documents: DocumentItem[] }) {
  const [active, setActive] = useState<string>("Mind");
  const categories = ["Mind", ...documentCategories];

  const filtered = useMemo(
    () => (active === "Mind" ? documents : documents.filter((d) => d.category === active)),
    [documents, active],
  );

  return (
    <div>
      {documents.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
          A dokumentumtár tartalma feltöltés alatt.
        </div>
      ) : (
        <>
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

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((doc) => (
              <a
                key={doc.id}
                href={doc.url}
                className="group flex items-start gap-4 rounded-2xl border border-cream-300/70 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-burgundy-50 text-burgundy-500">
                  <DocumentIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <Badge tone="gold">{doc.category}</Badge>
                    <span className="text-xs text-graphite-400">
                      {doc.fileType} · {doc.fileSize}
                    </span>
                  </div>
                  <h3 className="font-medium leading-snug text-graphite-900 group-hover:text-burgundy-600">
                    {doc.title}
                  </h3>
                  {doc.description && (
                    <p className="mt-1.5 line-clamp-2 text-sm text-graphite-500">
                      {doc.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-graphite-400">{formatHuDate(doc.date)}</p>
                </div>
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-graphite-400 transition-colors group-hover:bg-cream-100 group-hover:text-burgundy-500">
                  <DownloadIcon className="h-5 w-5" />
                </span>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
              Ebben a kategóriában jelenleg nincs dokumentum.
            </div>
          )}
        </>
      )}
    </div>
  );
}
