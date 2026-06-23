import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { TudositasCard } from "@/components/TudositasCard";
import { Badge } from "@/components/Badge";
import { ArrowRightIcon, MapPinIcon } from "@/components/Icons";
import {
  getAllTudositasSlugs,
  getAllTudositasok,
  getTudositasBySlug,
} from "@/lib/tudositasok";
import { formatHuDate } from "@/lib/site";

export function generateStaticParams() {
  return getAllTudositasSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getTudositasBySlug(params.slug);
  if (!item) return { title: "Tudósítás" };
  return { title: item.title, description: item.excerpt };
}

export default function TudositasDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getTudositasBySlug(params.slug);
  if (!item) notFound();

  const related = getAllTudositasok()
    .filter((t) => t.slug !== item.slug)
    .slice(0, 3);

  return (
    <article>
      {item.coverImage && (
        <section className="relative h-[48vh] min-h-[340px] w-full overflow-hidden">
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="container-page relative z-10 flex h-full flex-col justify-end pb-10">
            <nav className="mb-3 flex items-center gap-1.5 text-xs text-cream-200/80">
              <Link href="/" className="hover:text-gold-300">
                Főoldal
              </Link>
              <span>/</span>
              <Link href="/tudositasok" className="hover:text-gold-300">
                Tudósítások
              </Link>
            </nav>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge tone="gold">{item.category}</Badge>
              <time className="text-sm text-cream-100/90" dateTime={item.date}>
                {formatHuDate(item.date)}
              </time>
            </div>
            <h1 className="max-w-4xl font-serif text-4xl font-semibold text-cream-50 sm:text-5xl">
              {item.title}
            </h1>
          </div>
        </section>
      )}

      <section className="container-page py-16">
        {!item.coverImage && (
          <div className="mb-10 max-w-3xl">
            <nav className="mb-3 flex items-center gap-1.5 text-xs text-graphite-400">
              <Link href="/" className="hover:text-burgundy-600">
                Főoldal
              </Link>
              <span>/</span>
              <Link href="/tudositasok" className="hover:text-burgundy-600">
                Tudósítások
              </Link>
            </nav>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge tone="burgundy">{item.category}</Badge>
              <time className="text-sm text-graphite-500" dateTime={item.date}>
                {formatHuDate(item.date)}
              </time>
            </div>
            <h1 className="font-serif text-4xl font-semibold text-graphite-900 sm:text-5xl">
              {item.title}
            </h1>
          </div>
        )}

        {item.location && (
          <p className="mb-8 inline-flex items-center gap-2 text-sm text-graphite-500">
            <MapPinIcon className="h-4 w-4 text-gold-600" />
            {item.location}
          </p>
        )}

        <div className="max-w-3xl">
          <MarkdownContent content={item.content} />

          <Link href="/tudositasok" className="btn-ghost mt-10">
            Vissza a tudósításokhoz
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-cream-300 pt-12">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-graphite-900">
              További tudósítások
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((t) => (
                <TudositasCard key={t.slug} item={t} />
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
