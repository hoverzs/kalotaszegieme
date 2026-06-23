"use client";

import { useState } from "react";
import type { NewsCategory, NewsItem } from "@/data/types";

const categories: NewsCategory[] = [
  "Tudósítás",
  "Felhívás",
  "Hír",
  "Ifjúság",
  "Presbiteri",
];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-cream-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-burgundy-500/30";

const emptyNews: Partial<NewsItem> = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Hír",
  author: "",
  excerpt: "",
  coverImage: "",
  congregationSlug: "",
};

export function NewsManager({ initialNews }: { initialNews: NewsItem[] }) {
  const [items, setItems] = useState(initialNews);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<NewsItem> & { bodyText?: string }>(emptyNews);
  const [message, setMessage] = useState("");

  function startEdit(item: NewsItem) {
    setEditing(item);
    setCreating(false);
    setForm({ ...item, bodyText: item.body.join("\n\n") });
  }

  function startCreate() {
    setEditing(null);
    setCreating(true);
    setForm({ ...emptyNews, bodyText: "" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      body: (form.bodyText ?? "").split("\n\n").filter(Boolean),
    };

    const res = creating
      ? await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/news", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: editing?.slug, patch: payload }),
        });

    if (!res.ok) {
      setMessage("Mentés sikertelen.");
      return;
    }

    const saved = (await res.json()) as NewsItem;
    setItems((prev) => {
      if (creating) return [saved, ...prev];
      return prev.map((item) => (item.slug === saved.slug ? saved : item));
    });
    setCreating(false);
    setEditing(null);
    setMessage("Mentve.");
  }

  async function remove(slug: string) {
    if (!confirm("Biztosan törli a hírt?")) return;
    const res = await fetch(`/api/admin/news?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Törlés sikertelen.");
      return;
    }
    setItems((prev) => prev.filter((n) => n.slug !== slug));
    setEditing(null);
    setMessage("Törölve.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-graphite-500">{items.length} hír</p>
        <button type="button" onClick={startCreate} className="btn-primary">
          Új hír
        </button>
      </div>

      {(creating || editing) && (
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl font-semibold text-graphite-900">
            {creating ? "Új hír" : "Hír szerkesztése"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium md:col-span-2">
              Cím
              <input
                className={fieldClass}
                required
                value={form.title ?? ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              Dátum
              <input
                type="date"
                className={fieldClass}
                required
                value={form.date ?? ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              Kategória
              <select
                className={fieldClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as NewsCategory })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Rövid összefoglaló
              <textarea
                className={`${fieldClass} min-h-[80px]`}
                value={form.excerpt ?? ""}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Teljes szöveg (bekezdések között üres sor)
              <textarea
                className={`${fieldClass} min-h-[160px]`}
                value={form.bodyText ?? ""}
                onChange={(e) => setForm({ ...form, bodyText: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Borítókép URL
              <input
                className={fieldClass}
                value={form.coverImage ?? ""}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Mentés
            </button>
            {!creating && editing && (
              <button type="button" onClick={() => remove(editing.slug)} className="btn-outline">
                Törlés
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
              className="text-sm text-graphite-500"
            >
              Mégse
            </button>
          </div>
        </form>
      )}

      {message && <p className="text-sm text-graphite-600">{message}</p>}

      <div className="overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-cream-200 bg-cream-50 text-xs uppercase tracking-wide text-graphite-500">
            <tr>
              <th className="px-4 py-3">Dátum</th>
              <th className="px-4 py-3">Cím</th>
              <th className="px-4 py-3">Kategória</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-cream-100 last:border-0">
                <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3">{item.title}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => startEdit(item)} className="btn-ghost">
                    Szerkesztés
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
