import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ContactBlock } from "@/components/ContactBlock";
import { ArrowRightIcon, BookIcon, ChurchIcon, UsersIcon } from "@/components/Icons";
import { getCongregations } from "@/lib/content/congregations";
import { churchImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Az egyházmegye",
  description:
    "A Kalotaszegi Református Egyházmegye bemutatása: története, gyülekezetei és szolgálata.",
};

export default async function DiocesePage() {
  const congregations = await getCongregations();
  const stats = [
    { value: `${congregations.length}+`, label: "gyülekezet", icon: ChurchIcon },
    { value: "700+", label: "év hagyomány", icon: BookIcon },
    { value: "3", label: "egyházkör", icon: UsersIcon },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Bemutatkozás"
        title="Az egyházmegye"
        description="Kalotaszeg református közössége: hagyomány, hit és élő gyülekezeti élet Erdély szívében."
        breadcrumbs={[{ label: "Főoldal", href: "/" }, { label: "Az egyházmegye" }]}
      />

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
              <Image
                src={churchImages.archesInterior}
                alt="Kalotaszegi református templom belső tere"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            <div className="prose-custom space-y-5 text-base leading-relaxed text-graphite-600">
              <p>
                A Kalotaszegi Református Egyházmegye Erdély egyik legjellegzetesebb
                néprajzi tájegységének, Kalotaszegnek a református gyülekezeteit fogja
                össze. A terület a Királyhágómelléki, illetve az Erdélyi Református
                Egyházkerület gyülekezeteivel együtt évszázadok óta őrzi a reformáció
                örökségét.
              </p>
              <p>
                Kalotaszeg három történeti tájegységre tagolódik: a Felszegre, az
                Alszegre és a Nádas mentére. E vidék templomai – köztük számos középkori
                eredetű, festett kazettás mennyezetű épület – a magyar művészet- és
                egyháztörténet kiemelkedő emlékei.
              </p>
              <p>
                Az egyházmegye gyülekezetei élő közösségek: istentiszteletek, bibliaórák,
                ifjúsági alkalmak, nőszövetségi és presbiteri találkozók, valamint
                diakóniai szolgálat jellemzi mindennapjaikat. Célunk, hogy a hit és a
                hagyomány egyszerre legyen jelen a közösség életében.
              </p>
              <h3 className="font-serif text-2xl font-semibold text-graphite-900">
                Küldetésünk
              </h3>
              <p>
                „Hitben járva, közösségben élve” – ez a mottó fejezi ki szolgálatunk
                lényegét. Az evangélium hirdetése, a gyülekezetek építése, az ifjúság
                nevelése és a kalotaszegi örökség megőrzése együttesen alkotja
                küldetésünket.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-2xl border border-cream-300/70 bg-white p-6 text-center shadow-card"
                >
                  <s.icon className="h-7 w-7 text-gold-600" />
                  <p className="mt-3 font-serif text-3xl font-semibold text-burgundy-600">
                    {s.value}
                  </p>
                  <p className="text-sm text-graphite-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <ContactBlock />
            <div className="rounded-2xl border border-cream-300/70 bg-cream-50 p-7">
              <h3 className="mb-4 font-serif text-xl font-semibold text-graphite-900">
                Gyors elérés
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Gyülekezetek listája", href: "/gyulekezetek" },
                  { label: "Címtár", href: "/cimtar" },
                  { label: "Események", href: "/esemenyek" },
                  { label: "Dokumentumtár", href: "/dokumentumtar" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-graphite-700 transition-colors hover:bg-white hover:text-burgundy-600"
                    >
                      {l.label}
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
