"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Bejelentkezés sikertelen.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md rounded-2xl border border-cream-300 bg-white p-8 shadow-card">
      <h1 className="font-serif text-2xl font-semibold text-graphite-900">Admin bejelentkezés</h1>
      <p className="mt-2 text-sm text-graphite-500">
        A tartalom szerkesztéséhez admin jelszó szükséges.
      </p>
      <label className="mt-6 block text-sm font-medium text-graphite-700">
        Jelszó
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-cream-300 px-4 py-2.5 text-sm outline-none ring-burgundy-500 focus:ring-2"
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60">
        {loading ? "Bejelentkezés…" : "Bejelentkezés"}
      </button>
    </form>
  );
}
