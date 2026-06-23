"use client";

import { useState } from "react";
import type { EventCategory, EventItem } from "@/data/types";

const categories: EventCategory[] = [
  "Egyházmegyei esemény",
  "Gyülekezeti alkalom",
  "Ifjúsági alkalom",
  "Konferencia",
  "Ünnepi istentisztelet",
  "Kulturális esemény",
];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-cream-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-burgundy-500/30";

const emptyEvent: Partial<EventItem> = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  startTime: "",
  endTime: "",
  location: "",
  organizer: "",
  category: "Egyházmegyei esemény",
  description: "",
  image: "",
  featured: false,
};

export function EventsManager({ initialEvents }: { initialEvents: EventItem[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<EventItem>>(emptyEvent);
  const [message, setMessage] = useState("");

  function startEdit(event: EventItem) {
    setEditing(event);
    setCreating(false);
    setForm(event);
  }

  function startCreate() {
    setEditing(null);
    setCreating(true);
    setForm(emptyEvent);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = creating
      ? await fetch("/api/admin/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      : await fetch("/api/admin/events", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing?.id, patch: form }),
        });

    if (!res.ok) {
      setMessage("Mentés sikertelen.");
      return;
    }

    const saved = (await res.json()) as EventItem;
    setEvents((prev) => {
      if (creating) return [...prev, saved].sort((a, b) => a.date.localeCompare(b.date));
      return prev.map((item) => (item.id === saved.id ? saved : item));
    });
    setCreating(false);
    setEditing(null);
    setMessage("Mentve.");
  }

  async function remove(id: string) {
    if (!confirm("Biztosan törli az eseményt?")) return;
    const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) {
      setMessage("Törlés sikertelen.");
      return;
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setEditing(null);
    setMessage("Törölve.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-graphite-500">{events.length} esemény</p>
        <button type="button" onClick={startCreate} className="btn-primary">
          Új esemény
        </button>
      </div>

      {(creating || editing) && (
        <form onSubmit={save} className="space-y-4 rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl font-semibold text-graphite-900">
            {creating ? "Új esemény" : "Esemény szerkesztése"}
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
                onChange={(e) => setForm({ ...form, category: e.target.value as EventCategory })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Kezdés
              <input
                className={fieldClass}
                value={form.startTime ?? ""}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium">
              Befejezés
              <input
                className={fieldClass}
                value={form.endTime ?? ""}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Helyszín
              <input
                className={fieldClass}
                value={form.location ?? ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>
            <label className="block text-sm font-medium md:col-span-2">
              Leírás
              <textarea
                className={`${fieldClass} min-h-[100px]`}
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>
            <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Kiemelt a főoldalon
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Mentés
            </button>
            {!creating && editing && (
              <button type="button" onClick={() => remove(editing.id)} className="btn-outline">
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
            {events.map((event) => (
              <tr key={event.id} className="border-b border-cream-100 last:border-0">
                <td className="px-4 py-3 whitespace-nowrap">{event.date}</td>
                <td className="px-4 py-3">{event.title}</td>
                <td className="px-4 py-3">{event.category}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => startEdit(event)} className="btn-ghost">
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
