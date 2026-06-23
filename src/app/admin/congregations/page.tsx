import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCongregations } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Gyülekezetek – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCongregationsPage() {
  const congregations = await getCongregations();
  const sorted = [...congregations].sort((a, b) =>
    a.settlement.localeCompare(b.settlement, "hu"),
  );

  return (
    <AdminShell>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-graphite-900">Gyülekezetek</h1>
        <p className="mt-2 text-sm text-graphite-500">
          Válasszon egy gyülekezetet a szerkesztéshez.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-cream-300 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-cream-200 bg-cream-50 text-xs uppercase tracking-wide text-graphite-500">
              <tr>
                <th className="px-4 py-3">Település</th>
                <th className="px-4 py-3">Név</th>
                <th className="px-4 py-3">Lelkipásztor</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((c) => (
                <tr key={c.slug} className="border-b border-cream-100 last:border-0">
                  <td className="px-4 py-3">{c.settlement}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.pastor || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/congregations/${c.slug}`} className="btn-ghost">
                      Szerkesztés
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
