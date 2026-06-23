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
        description="Keresse az Egyházmegyei Hivatalt az alábbi elérhetőségeken, vagy írjon nekünk üzenetet."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Elérhetőség" }]}
      />

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
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

            {/* Térkép-placeholder az iroda helyéhez */}
            <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-cream-300 bg-cream-50 text-sm text-graphite-400">
              Térkép helye (a hivatal helyszíne) – hamarosan
            </div>
          </div>

          {/* Kapcsolatfelvételi űrlap (statikus megjelenés) */}
          <div className="rounded-2xl border border-cream-300/70 bg-white p-7 shadow-card">
            <h3 className="mb-1 font-serif text-2xl font-semibold text-graphite-900">
              Írjon nekünk
            </h3>
            <p className="mb-6 text-sm text-graphite-500">
              Az űrlap a végleges verzióban lesz aktív.
            </p>
            <form className="space-y-4" aria-label="Kapcsolatfelvételi űrlap">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Név" placeholder="Teljes név" />
                <Field label="E-mail" type="email" placeholder="pelda@email.ro" />
              </div>
              <Field label="Tárgy" placeholder="Üzenet tárgya" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-graphite-700">
                  Üzenet
                </label>
                <textarea
                  rows={5}
                  placeholder="Írja le üzenetét…"
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-graphite-800 placeholder:text-graphite-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Üzenet küldése
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-graphite-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-graphite-800 placeholder:text-graphite-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
      />
    </div>
  );
}
