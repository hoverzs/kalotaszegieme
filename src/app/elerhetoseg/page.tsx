import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactBlock } from "@/components/ContactBlock";
import { siteConfig, telHref } from "@/lib/site";
import { MailIcon, PhoneIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Elérhetőség",
  description: "A Kalotaszegi Református Egyházmegye Hivatalának elérhetőségei.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kapcsolat"
        title="Elérhetőség"
        description="Keresse az Egyházmegyei Hivatalt az alábbi elérhetőségeken."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Elérhetőség" }]}
      />

      <section className="container-page py-16">
        <div className="max-w-2xl">
          <ContactBlock />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={`tel:${telHref(siteConfig.contact.phone)}`}
              className="flex items-center gap-3 rounded-2xl border border-cream-300/70 bg-white p-5 shadow-card transition-colors hover:border-gold-400"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-graphite-400">
                  Hívjon minket
                </span>
                <span className="text-sm font-medium text-graphite-800">
                  {siteConfig.contact.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-3 rounded-2xl border border-cream-300/70 bg-white p-5 shadow-card transition-colors hover:border-gold-400"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-graphite-400">
                  Írjon e-mailt
                </span>
                <span className="text-sm font-medium text-graphite-800">
                  {siteConfig.contact.email}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-cream-50 text-sm text-graphite-400">
            Térkép helye (a hivatal helyszíne) – hamarosan
          </div>
        </div>
      </section>
    </>
  );
}
