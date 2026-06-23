import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/data/types";
import { formatHuDate } from "@/lib/site";
import { Badge } from "./Badge";
import { ArrowRightIcon } from "./Icons";

export function NewsCard({
  item,
  featured = false,
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  const href = `/hirek/${item.slug}`;

  return (
    <article className={`card group flex flex-col ${featured ? "lg:flex-row" : ""}`}>
      <Link
        href={href}
        className={`relative block overflow-hidden ${
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

      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:p-8" : ""}`}>
        <div className="mb-3 flex items-center gap-3">
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
