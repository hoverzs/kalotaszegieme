import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";
import { churchImages, landscapeImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Templomgaléria",
  description:
    "Kalotaszeg templomainak és tájainak galériája. A gyülekezeti fotók feltöltése folyamatban.",
};

export default function GalleryPage() {
  // Illusztratív képek – a gyülekezetek saját templomfotóinak feltöltése
  // folyamatban van. A képek a központi képtárból (data/images.ts) származnak.
  const images = [
    { src: churchImages.stainedGlass, caption: "Templombelső", subcaption: "Kalotaszeg" },
    { src: churchImages.archesInterior, caption: "Templombelső", subcaption: "Kalotaszeg" },
    { src: churchImages.townscapeSpire, caption: "Templomtorony", subcaption: "Kalotaszeg" },
    { src: landscapeImages.greenHills, caption: "Dombvidék", subcaption: "Kalotaszeg" },
    { src: landscapeImages.wheatField, caption: "Mezők", subcaption: "Kalotaszeg" },
    { src: landscapeImages.forestLight, caption: "Erdő", subcaption: "Kalotaszeg" },
    { src: landscapeImages.mistyValley, caption: "Völgy", subcaption: "Kalotaszeg" },
    { src: landscapeImages.hillCircle, caption: "Domboldal", subcaption: "Kalotaszeg" },
    { src: landscapeImages.foggyForest, caption: "Ködös táj", subcaption: "Kalotaszeg" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Képek"
        title="Templomgaléria"
        description="Kalotaszeg templomainak és tájainak hangulata képekben."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Templomgaléria" }]}
      />

      <section className="container-page py-16">
        <div className="mb-8 rounded-2xl border border-dashed border-cream-300 bg-cream-50 p-5 text-sm text-graphite-500">
          A gyülekezetek saját templomfotóinak feltöltése folyamatban. Az alábbi képek
          egyelőre illusztratív jellegűek.
        </div>
        <GalleryGrid images={images} columns={3} />
      </section>
    </>
  );
}
