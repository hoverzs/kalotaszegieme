"use client";

import { useState } from "react";
import type { Congregation } from "@/data/types";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-cream-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-burgundy-500/30";

export function CongregationEditor({ congregation }: { congregation: Congregation }) {
  const [form, setForm] = useState(congregation);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Congregation>(key: K, value: Congregation[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/congregations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: congregation.slug, patch: form }),
    });
    setSaving(false);
    setMessage(res.ok ? "Mentve." : "Hiba a mentés során.");
  }

  async function uploadPhoto(file: File) {
    setUploading(true);
    setMessage("");
    const data = new FormData();
    data.append("file", file);
    data.append("slug", congregation.slug);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    setUploading(false);
    if (!res.ok) {
      setMessage("Képfeltöltés sikertelen.");
      return;
    }
    const json = (await res.json()) as { url: string };
    update("image", json.url);
    setMessage("Kép feltöltve. Mentse el a gyülekezet adatait.");
  }

  return (
    <form onSubmit={save} className="space-y-6 rounded-2xl border border-cream-300 bg-white p-6 shadow-card">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Név
          <input className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Település
          <input
            className={fieldClass}
            value={form.settlement}
            onChange={(e) => update("settlement", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Román név
          <input
            className={fieldClass}
            value={form.romanianName ?? ""}
            onChange={(e) => update("romanianName", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Lelkipásztor
          <input className={fieldClass} value={form.pastor} onChange={(e) => update("pastor", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Cím
          <input className={fieldClass} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Telefon
          <input className={fieldClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          E-mail
          <input className={fieldClass} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Szélesség (latitude)
          <input
            type="number"
            step="any"
            className={fieldClass}
            value={form.latitude ?? ""}
            onChange={(e) =>
              update("latitude", e.target.value === "" ? null : Number(e.target.value))
            }
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Hosszúság (longitude)
          <input
            type="number"
            step="any"
            className={fieldClass}
            value={form.longitude ?? ""}
            onChange={(e) =>
              update("longitude", e.target.value === "" ? null : Number(e.target.value))
            }
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Istentiszteleti idő
          <input
            className={fieldClass}
            value={form.serviceTime}
            onChange={(e) => update("serviceTime", e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700">
          Lélekszám
          <input
            type="number"
            className={fieldClass}
            value={form.membership ?? ""}
            onChange={(e) =>
              update("membership", e.target.value ? Number(e.target.value) : null)
            }
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Kép URL
          <input className={fieldClass} value={form.image} onChange={(e) => update("image", e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Templomfotó feltöltése
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="mt-1.5 block w-full text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadPhoto(file);
            }}
          />
        </label>
        <label className="block text-sm font-medium text-graphite-700 md:col-span-2">
          Bemutatkozás
          <textarea
            className={`${fieldClass} min-h-[160px]`}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
          {saving ? "Mentés…" : "Mentés"}
        </button>
        {message && <span className="text-sm text-graphite-600">{message}</span>}
      </div>
    </form>
  );
}
