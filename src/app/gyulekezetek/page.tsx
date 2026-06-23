import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CongregationList } from "@/components/CongregationList";
import { getCongregations } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Gyülekezetek",
  description:
    "A Kalotaszegi Református Egyházmegye gyülekezetei – kereshető lista templomképekkel és adatlapokkal.",
};

export default async function CongregationsPage() {
  const congregations = await getCongregations();
  const sorted = [...congregations].sort((a, b) =>
    a.settlement.localeCompare(b.settlement, "hu"),
  );

  return (
    <>
      <PageHeader
        eyebrow="Közösségeink"
        title="Gyülekezetek"
        description="Ismerje meg a kalotaszegi református gyülekezeteket. Keressen település vagy lelkipásztor szerint, és nézze meg a részletes adatlapokat."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Gyülekezetek" }]}
      />

      <section className="container-page py-16">
        <CongregationList congregations={sorted} />
      </section>
    </>
  );
}
