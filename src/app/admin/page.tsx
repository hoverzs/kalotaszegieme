import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCongregations } from "@/lib/content/congregations";
import { getEvents } from "@/lib/content/events";
import { getNews } from "@/lib/content/news";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [congregations, events, news] = await Promise.all([
    getCongregations(),
    getEvents(),
    getNews(),
  ]);

  const cards = [
    {
      title: "Gyülekezetek",
      count: congregations.length,
      href: "/admin/congregations",
      text: "Elérhetőségek, bemutatkozások, templomfotók.",
    },
    {
      title: "Események",
      count: events.length,
      href: "/admin/events",
      text: "Közelgő alkalmak és főoldali kiemelések.",
    },
    {
      title: "Hírek",
      count: news.length,
      href: "/admin/news",
      text: "Tudósítások, felhívások és hírek.",
    },
  ];

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold text-graphite-900">Tartalomkezelés</h1>
        <p className="mt-2 text-sm text-graphite-500">
          Itt szerkesztheti a honlap gyülekezeteit, eseményeit és híreit. A változtatások azonnal
          megjelennek a nyilvános oldalon.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-cream-300 bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                {card.count} tétel
              </p>
              <h2 className="mt-2 font-serif text-xl font-semibold text-graphite-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-graphite-500">{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
