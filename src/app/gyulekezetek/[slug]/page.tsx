import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCongregationSlugs,
  getCongregationBySlug,
} from "@/lib/content/congregations";
import { congregationImage } from "@/data/images";
import { getCongregationHistory } from "@/lib/gyulekezetek";
import { getTudositasokByLocation } from "@/lib/tudositasok";
import { TudositasCard } from "@/components/TudositasCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import {
  ArrowLeftIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from "@/components/Icons";
import { isMissing, labels, orPlaceholder, splitValues } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllCongregationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const c = await getCongregationBySlug(params.slug);
  if (!c) return { title: "Gyülekezet" };
  return {
    title: c.name,
    description: c.description || `${c.name} – ${c.settlement}`,
  };
}

/** Adatsor magyar címkével és „Adatok feltöltés alatt” fallbackkel. */
function InfoRow({
  icon: Icon,
  label,
  value,
  linkType,
}: {
  icon: (p: { className?: string }) => JSX.Element;
  label: string;
  value: string;
  /** Ha megadott, az értéket (vesszővel tagolt értékeket) kattintható linkként rendereli. */
  linkType?: "tel" | "mailto";
}) {
  const missing = isMissing(value);
  const items = linkType ? splitValues(value) : [];
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
          {label}
        </p>
        {!missing && linkType ? (
          <p className="flex flex-wrap gap-x-2 text-graphite-700">
            {items.map((item, i) => (
              <a
                key={item}
                href={`${linkType}:${item}`}
                className="transition-colors hover:text-burgundy-600"
              >
                {item}
                {i < items.length - 1 ? "," : ""}
              </a>
            ))}
          </p>
        ) : (
          <p className={missing ? "italic text-graphite-400" : "text-graphite-700"}>
            {orPlaceholder(value)}
          </p>
        )}
      </div>
    </li>
  );
}

export default async function CongregationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const c = await getCongregationBySlug(params.slug);
  if (!c) notFound();

  const relatedTudositasok = getTudositasokByLocation(c.settlement);
  const history = getCongregationHistory(c.slug);
  const photo = congregationImage(c.slug, c.image);
  const hasCoords = c.latitude !== null && c.longitude !== null;

  let osmUrl = "";
  if (hasCoords) {
    const lat = c.latitude as number;
    const lng = c.longitude as number;
    const bbox = `${lng - 0.02}%2C${lat - 0.012}%2C${lng + 0.02}%2C${lat + 0.012}`;
    osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  }

  return (
    <>
      {/* Nagy fejléc a gyülekezet nevével */}
      <section className="relative overflow-hidden border-b border-cream-300/70 bg-cream-50">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 0%, rgba(184,146,74,0.12), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(110,20,35,0.07), transparent 50%)",
          }}
        />
        <div className="container-page relative py-14 sm:py-16">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-graphite-400" aria-label="Morzsamenü">
            <Link href="/" className="transition-colors hover:text-burgundy-600">
              Főoldal
            </Link>
            <span className="text-graphite-300">/</span>
            <Link href="/gyulekezetek" className="transition-colors hover:text-burgundy-600">
              Gyülekezetek
            </Link>
            <span className="text-graphite-300">/</span>
            <span className="text-graphite-600">{c.settlement}</span>
          </nav>

          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-gold-500" />
            {labels.congregation}
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-graphite-900 sm:text-5xl">
            {c.name}
          </h1>
          <p className="mt-3 inline-flex items-center gap-2 text-graphite-500">
            <MapPinIcon className="h-4 w-4 text-gold-600" />
            {c.settlement}
            {c.romanianName ? (
              <span className="text-graphite-400">({c.romanianName})</span>
            ) : null}
          </p>
        </div>
        <div className="motif-divider" />
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Fő tartalom */}
          <div className="lg:col-span-2">
            {/* Templomkép */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-cream-300/70 shadow-card">
              <Image
                src={photo.src}
                alt={`${c.settlement} – ${c.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              {!photo.isReal ? (
                <span className="absolute bottom-3 right-3 rounded-full bg-graphite-900/55 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cream-50 backdrop-blur">
                  Illusztráció – a gyülekezet hivatalos fotója feltöltés alatt
                </span>
              ) : null}
            </div>

            {/* Bemutatkozás / történet */}
            <div className="mt-12">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-graphite-900">
                {history?.title ?? labels.description}
              </h2>
              {history ? (
                <MarkdownContent content={history.content} />
              ) : isMissing(c.description) ? (
                <p className="italic text-graphite-400">Adatok feltöltés alatt</p>
              ) : (
                <p className="text-base leading-relaxed text-graphite-600">{c.description}</p>
              )}
            </div>

            {/* Térkép helye */}
            <div className="mt-12">
              <h2 className="mb-4 font-serif text-2xl font-semibold text-graphite-900">
                {labels.map}
              </h2>
              {hasCoords ? (
                <div className="overflow-hidden rounded-2xl border border-cream-300/70 shadow-card">
                  <iframe
                    title={`${c.settlement} térkép`}
                    src={osmUrl}
                    className="h-[360px] w-full"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-cream-300 bg-cream-50 text-graphite-400">
                  <MapPinIcon className="h-10 w-10 text-gold-500/70" />
                  <span className="text-sm font-medium">Térkép helye</span>
                  <span className="text-xs italic">Adatok feltöltés alatt</span>
                </div>
              )}
            </div>

            {/* Kapcsolódó tudósítások (ha van) */}
            {relatedTudositasok.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-5 font-serif text-2xl font-semibold text-graphite-900">
                  Kapcsolódó tudósítások
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {relatedTudositasok.map((item) => (
                    <TudositasCard key={item.slug} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Oldalsáv – gyülekezeti adatok */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-cream-300/70 bg-white p-7 shadow-card">
              <h3 className="mb-5 font-serif text-xl font-semibold text-graphite-900">
                Gyülekezeti adatok
              </h3>
              <ul className="space-y-4 text-sm">
                <InfoRow icon={MapPinIcon} label={labels.settlement} value={c.settlement} />
                {c.romanianName ? (
                  <InfoRow icon={MapPinIcon} label={labels.romanianName} value={c.romanianName} />
                ) : null}
                <InfoRow icon={UsersIcon} label={labels.pastor} value={c.pastor} />
                <InfoRow icon={MapPinIcon} label={labels.address} value={c.address} />
                <InfoRow icon={PhoneIcon} label={labels.phone} value={c.phone} linkType="tel" />
                {c.mobile ? (
                  <InfoRow icon={PhoneIcon} label={labels.mobile} value={c.mobile} linkType="tel" />
                ) : null}
                {c.landline ? (
                  <InfoRow icon={PhoneIcon} label={labels.landline} value={c.landline} linkType="tel" />
                ) : null}
                {c.officePhone ? (
                  <InfoRow icon={PhoneIcon} label={labels.officePhone} value={c.officePhone} linkType="tel" />
                ) : null}
                <InfoRow icon={MailIcon} label={labels.email} value={c.email} linkType="mailto" />
                <InfoRow icon={ClockIcon} label={labels.serviceTime} value={c.serviceTime} />
                {c.membership != null ? (
                  <InfoRow icon={UsersIcon} label={labels.membership} value={`${c.membership} fő`} />
                ) : null}
                {c.totalMembership != null && c.totalMembership !== c.membership ? (
                  <InfoRow
                    icon={UsersIcon}
                    label={labels.totalMembership}
                    value={`${c.totalMembership} fő`}
                  />
                ) : null}
              </ul>
            </div>

            <Link
              href="/gyulekezetek"
              className="flex items-center justify-center gap-2 rounded-2xl border border-cream-300/70 bg-cream-50 px-5 py-4 text-sm font-medium text-graphite-700 transition-colors hover:border-gold-400 hover:text-burgundy-600"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Vissza a Gyülekezetek oldalra
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
