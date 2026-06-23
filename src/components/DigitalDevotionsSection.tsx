import { SectionTitle } from "@/components/SectionTitle";
import { DevotionAppCard } from "@/components/DevotionAppCard";
import { devotionApps } from "@/data/devotionApps";

export function DigitalDevotionsSection() {
  return (
    <section className="border-t border-cream-300/60 bg-cream-50 py-12 sm:py-14">
      <div className="container-page">
        <SectionTitle
          eyebrow="Online"
          title="Online áhitatok"
          description="Napi lelki tartalmak felnőtteknek és fiataloknak."
          link={{ label: "Áhítatok oldal", href: "/ahitatok" }}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {devotionApps.map((app) => (
            <DevotionAppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
