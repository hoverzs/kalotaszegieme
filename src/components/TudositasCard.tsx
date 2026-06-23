import Image from "next/image";
import Link from "next/link";
import type { TudositasSummary } from "@/lib/tudositasok/types";
import { formatHuDate } from "@/lib/site";
import { Badge } from "./Badge";
import { ArrowRightIcon, MapPinIcon } from "./Icons";

export function TudositasCard({
  item,
  featured = false,
}: {
  item: TudositasSummary;
  featured?: boolean;
}) {
  const href = `/tudositasok/${item.slug}`;

  return (
    <article className={`card group flex flex-col ${featured ? "lg:flex-row" : ""}`}>
      {item.coverImage && (
        <Link
          href={href}
          className={`relative block overflow-hidden bg-cream-200 ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-1/2" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}

      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:p-8" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <Badge tone="burgundy">{item.category}</Badge>
          <time className="text-xs font-medium text-graphite-400" dateTime={item.date}>
            {formatHuDate(item.date)}
          </time>
        </div>

        <h3
          className={`font-serif font-semibold leading-snug text-graphite-900 ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          <Link href={href} className="transition-colors hover:text-burgundy-600">
            {item.title}
          </Link>
        </h3>

        {item.location && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-graphite-500">
            <MapPinIcon className="h-4 w-4 text-gold-600" />
            {item.location}
          </p>
        )}

        <p
          className={`mt-3 flex-1 text-sm leading-relaxed text-graphite-500 ${
            featured ? "line-clamp-4" : "line-clamp-3"
          }`}
        >
          {item.excerpt}
        </p>

        <Link href={href} className="btn-ghost mt-5">
          Tovább olvasom
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
