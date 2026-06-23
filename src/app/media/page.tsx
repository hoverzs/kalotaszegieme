import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MediaList } from "@/components/MediaList";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Média",
  description:
    "Videók, hanganyagok és előadások a Kalotaszegi Református Egyházmegye életéből.",
};

export default function MediaPage() {
  const sorted = [...media].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHeader
        eyebrow="Hang és kép"
        title="Média"
        description="Istentiszteletek, áhítatok, előadások és koncertek felvételei egy helyen."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Média" }]}
      />

      <section className="container-page py-16">
        <MediaList items={sorted} />
      </section>
    </>
  );
}
