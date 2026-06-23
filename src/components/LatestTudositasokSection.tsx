import { SectionTitle } from "@/components/SectionTitle";
import { TudositasCard } from "@/components/TudositasCard";
import { getLatestTudositasok } from "@/lib/tudositasok";

export function LatestTudositasokSection() {
  const items = getLatestTudositasok(3);

  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section className="bg-cream-50 py-14 sm:py-16">
      <div className="container-page">
        <SectionTitle
          eyebrow="Aktuális"
          title="Friss tudósítások"
          description="Beszámolók gyülekezeteink és az egyházmegye életéből."
          link={{ label: "Összes tudósítás", href: "/tudositasok" }}
        />

        <div className="mt-8 space-y-6">
          {featured && <TudositasCard item={featured} featured={items.length === 1} />}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {rest.map((item) => (
                <TudositasCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
