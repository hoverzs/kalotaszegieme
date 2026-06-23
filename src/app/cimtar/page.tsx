import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DirectoryTable } from "@/components/DirectoryTable";
import { getCongregations } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Címtár",
  description:
    "A Kalotaszegi Református Egyházmegye gyülekezeteinek és lelkipásztorainak elérhetőségei.",
};

export default async function DirectoryPage() {
  const congregations = await getCongregations();
  const sorted = [...congregations].sort((a, b) =>
    a.settlement.localeCompare(b.settlement, "hu"),
  );

  return (
    <>
      <PageHeader
        eyebrow="Elérhetőségek"
        title="Címtár"
        description="Gyülekezeteink, lelkipásztoraink és elérhetőségeik kereshető jegyzéke."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Címtár" }]}
      />

      <section className="container-page py-16">
        <DirectoryTable congregations={sorted} />
      </section>
    </>
  );
}
