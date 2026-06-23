import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DocumentList } from "@/components/DocumentList";
import { documents } from "@/data/documents";

export const metadata: Metadata = {
  title: "Dokumentumtár",
  description:
    "Letölthető körlevelek, űrlapok, szabályzatok és konferenciaanyagok az egyházmegye gyülekezetei számára.",
};

export default function DocumentsPage() {
  const sorted = [...documents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <>
      <PageHeader
        eyebrow="Letöltések"
        title="Dokumentumtár"
        description="Körlevelek, űrlapok, szabályzatok és konferenciaanyagok egy helyen, kategóriák szerint."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Dokumentumtár" }]}
      />

      <section className="container-page py-16">
        <DocumentList documents={sorted} />
      </section>
    </>
  );
}
