"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Congregation } from "@/data/types";
import { ArrowRightIcon, MailIcon, PhoneIcon, SearchIcon } from "./Icons";
import { orPlaceholder, splitValues } from "@/lib/site";

/** Kereshető címtár – lelkipásztorok és gyülekezetek elérhetőségei. */
export function DirectoryTable({ congregations }: { congregations: Congregation[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return congregations;
    return congregations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.settlement.toLowerCase().includes(q) ||
        (c.romanianName ?? "").toLowerCase().includes(q) ||
        c.pastor.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q),
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
          placeholder="Keresés gyülekezet, lelkipásztor szerint…"
          className="w-full rounded-full border border-cream-300 bg-white py-3 pl-11 pr-4 text-sm text-graphite-800 shadow-sm placeholder:text-graphite-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
        />
      </div>

      {/* Asztali táblázatos nézet */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-cream-300/70 bg-white shadow-card lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-50 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-6 py-4">Gyülekezet</th>
              <th className="px-6 py-4">Lelkipásztor</th>
              <th className="px-6 py-4">Telefon</th>
              <th className="px-6 py-4">E-mail</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {filtered.map((c) => (
              <tr key={c.slug} className="transition-colors hover:bg-cream-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-graphite-900">{c.settlement}</p>
                  <p className="text-xs text-graphite-400">{c.name}</p>
                  {c.romanianName ? (
                    <p className="text-xs italic text-graphite-400">{c.romanianName}</p>
                  ) : null}
                </td>
                <td className="px-6 py-4">
                  {c.pastor ? (
                    <span className="text-graphite-700">{c.pastor}</span>
                  ) : (
                    <span className="text-sm italic text-graphite-400">{orPlaceholder(c.pastor)}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {c.phone ? (
                    <a href={`tel:${c.phone}`} className="text-graphite-600 hover:text-burgundy-600">
                      {c.phone}
                    </a>
                  ) : (
                    <span className="text-sm italic text-graphite-400">{orPlaceholder(c.phone)}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {c.email ? (
                    <span className="flex flex-wrap gap-x-2">
                      {splitValues(c.email).map((e, i, arr) => (
                        <a
                          key={e}
                          href={`mailto:${e}`}
                          className="text-graphite-600 hover:text-burgundy-600"
                        >
                          {e}
                          {i < arr.length - 1 ? "," : ""}
                        </a>
                      ))}
                    </span>
                  ) : (
                    <span className="text-sm italic text-graphite-400">{orPlaceholder(c.email)}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/gyulekezetek/${c.slug}`} className="btn-ghost">
                    Adatlap
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil kártyás nézet */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filtered.map((c) => (
          <div key={c.slug} className="rounded-2xl border border-cream-300/70 bg-white p-5 shadow-card">
            <p className="font-serif text-lg font-semibold text-graphite-900">{c.settlement}</p>
            <p className="text-xs text-graphite-400">{c.name}</p>
            {c.romanianName ? (
              <p className="text-xs italic text-graphite-400">{c.romanianName}</p>
            ) : null}
            <p className={`mt-3 text-sm font-medium ${c.pastor ? "text-graphite-700" : "italic text-graphite-400"}`}>
              {orPlaceholder(c.pastor)}
            </p>
            <div className="mt-3 space-y-2 text-sm text-graphite-600">
              {c.phone ? (
                <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:text-burgundy-600">
                  <PhoneIcon className="h-4 w-4 text-gold-600" />
                  {c.phone}
                </a>
              ) : (
                <span className="flex items-center gap-2 italic text-graphite-400">
                  <PhoneIcon className="h-4 w-4 text-gold-600" />
                  {orPlaceholder(c.phone)}
                </span>
              )}
              {c.email ? (
                <span className="flex items-start gap-2">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  <span className="flex flex-wrap gap-x-2">
                    {splitValues(c.email).map((e, i, arr) => (
                      <a key={e} href={`mailto:${e}`} className="hover:text-burgundy-600">
                        {e}
                        {i < arr.length - 1 ? "," : ""}
                      </a>
                    ))}
                  </span>
                </span>
              ) : (
                <span className="flex items-center gap-2 italic text-graphite-400">
                  <MailIcon className="h-4 w-4 text-gold-600" />
                  {orPlaceholder(c.email)}
                </span>
              )}
            </div>
            <Link href={`/gyulekezetek/${c.slug}`} className="btn-ghost mt-4">
              Adatlap
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-cream-300 bg-white p-12 text-center text-graphite-500">
          Nincs találat.
        </div>
      )}
    </div>
  );
}
