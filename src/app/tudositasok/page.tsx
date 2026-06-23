import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TudositasCard } from "@/components/TudositasCard";
import { getAllTudositasok } from "@/lib/tudositasok";

export const metadata: Metadata = {
  title: "Tudósítások",
  description:
    "Tudósítások és beszámolók a Kalotaszegi Református Egyházmegye életéből.",
};

export default function TudositasokPage() {
  const items = getAllTudositasok();

  return (
    <>
      <PageHeader
        eyebrow="Aktuális"
        title="Tudósítások"
        description="Beszámolók gyülekezeteink és az egyházmegye életéből."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Tudósítások" }]}
      />

      <section className="container-page py-16">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <TudositasCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-cream-300 bg-cream-50 px-6 py-12 text-center text-graphite-500">
            Még nincs tudósítás. Hozzon létre egy új .md fájlt a{" "}
            <code className="text-sm">content/tudositasok</code> mappában.
          </p>
        )}
      </section>
    </>
  );
}
