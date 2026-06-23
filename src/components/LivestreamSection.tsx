import { SectionTitle } from "@/components/SectionTitle";
import { LivestreamCard } from "@/components/LivestreamCard";
import { livestreams } from "@/data/livestreams.js";

export function LivestreamSection() {
  if (livestreams.length === 0) return null;

  return (
    <section className="border-t border-cream-300/60 bg-cream-50 py-12 sm:py-14">
      <div className="container-page">
        <SectionTitle
          eyebrow="Közvetítés"
          title="Istentiszteletek online"
          description="Gyülekezeteink istentiszteletei több helyen Facebookon is követhetők."
        />

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {livestreams.map((stream) => (
            <LivestreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </section>
  );
}
