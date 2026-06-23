import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { CongregationEditor } from "@/components/admin/CongregationEditor";
import { getCongregationBySlug } from "@/lib/content/congregations";

export const metadata: Metadata = {
  title: "Gyülekezet szerkesztése – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCongregationEditPage({
  params,
}: {
  params: { slug: string };
}) {
  const congregation = await getCongregationBySlug(params.slug);
  if (!congregation) notFound();

  return (
    <AdminShell>
      <div className="max-w-4xl">
        <Link href="/admin/congregations" className="text-sm text-burgundy-500 hover:text-burgundy-700">
          ← Vissza a listához
        </Link>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-graphite-900">
          {congregation.settlement}
        </h1>
        <p className="mt-1 text-sm text-graphite-500">{congregation.name}</p>
        <div className="mt-6">
          <CongregationEditor congregation={congregation} />
        </div>
      </div>
    </AdminShell>
  );
}
