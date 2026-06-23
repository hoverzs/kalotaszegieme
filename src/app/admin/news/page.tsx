import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsManager } from "@/components/admin/NewsManager";
import { getNews } from "@/lib/content/news";

export const metadata: Metadata = {
  title: "Hírek – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <AdminShell>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-graphite-900">Hírek</h1>
        <p className="mt-2 text-sm text-graphite-500">
          Hírek és tudósítások szerkesztése a főoldal és a hírek oldal számára.
        </p>
        <div className="mt-6">
          <NewsManager initialNews={news} />
        </div>
      </div>
    </AdminShell>
  );
}
