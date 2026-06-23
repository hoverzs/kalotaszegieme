import Image from "next/image";
import Link from "next/link";
import type { Congregation } from "@/data/types";
import { congregationImage } from "@/data/images";
import { isMissing, labels, orPlaceholder, splitValues } from "@/lib/site";
import {
  ArrowRightIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from "./Icons";

/** Egy adat-sor: ikon + magyar címke + érték (vagy „Adatok feltöltés alatt”). */
function DataRow({
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
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wide text-graphite-400">
          {label}
        </dt>
        {!missing && linkType ? (
          <dd className="flex flex-wrap gap-x-2 text-sm text-graphite-700">
            {items.map((item, i) => (
              <a
                key={item}
                href={`${linkType}:${item}`}
                className="truncate transition-colors hover:text-burgundy-600"
              >
                {item}
                {i < items.length - 1 ? "," : ""}
              </a>
            ))}
          </dd>
        ) : (
          <dd
            className={`text-sm ${missing ? "italic text-graphite-400" : "text-graphite-700"}`}
          >
            {orPlaceholder(value)}
          </dd>
        )}
      </div>
    </div>
  );
}

export function CongregationCard({ congregation: c }: { congregation: Congregation }) {
  const href = `/gyulekezetek/${c.slug}`;
  const photo = congregationImage(c.slug, c.image);

  return (
    <article className="card group flex flex-col">
      {/* Templomkép */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={photo.src}
          alt={`${c.settlement} – ${c.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1 text-[11px] font-semibold text-burgundy-600 backdrop-blur">
          <MapPinIcon className="h-3.5 w-3.5" />
          {c.settlement}
        </span>
        {!photo.isReal ? (
          <span className="absolute bottom-3 right-3 rounded-full bg-graphite-900/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cream-50 backdrop-blur">
            Illusztráció
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold leading-snug text-graphite-900">
          <Link href={href} className="transition-colors hover:text-burgundy-600">
            {c.name}
          </Link>
        </h3>
        {c.romanianName ? (
          <p className="mt-1 text-xs text-graphite-400">{c.romanianName}</p>
        ) : null}

        <dl className="mt-4 grid grid-cols-1 gap-3">
          <DataRow icon={MapPinIcon} label={labels.settlement} value={c.settlement} />
          <DataRow icon={UsersIcon} label={labels.pastor} value={c.pastor} />
          <DataRow icon={MapPinIcon} label={labels.address} value={c.address} />
          <DataRow icon={PhoneIcon} label={labels.phone} value={c.phone} linkType="tel" />
          <DataRow icon={MailIcon} label={labels.email} value={c.email} linkType="mailto" />
          <DataRow icon={ClockIcon} label={labels.serviceTime} value={c.serviceTime} />
        </dl>

        <div className="mt-5 border-t border-cream-200 pt-4">
          <Link href={href} className="btn-ghost">
            {labels.details}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
