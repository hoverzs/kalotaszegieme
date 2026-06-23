import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { congregationGalleryImages } from "@/data/images";
import { getCongregations } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Templomgaléria",
  description:
    "Kalotaszeg református templomai gyülekezetenként – valós fényképek az egyházmegye településeiről.",
};

export default async function GalleryPage() {
  const congregations = await getCongregations();
  const images = congregationGalleryImages(congregations);

  return (
    <>
      <PageHeader
        eyebrow="Képek"
        title="Templomgaléria"
        description="Kalotaszeg református templomai gyülekezetenként. Kattintson egy képre a gyülekezet adatlapjáért."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Templomgaléria" }]}
      />

      <section className="container-page py-16">
        <GalleryGrid images={images} columns={3} />
      </section>
    </>
  );
}
