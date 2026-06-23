import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNewsSlugs, getNewsBySlug, getNews } from "@/lib/content/news";
import { getCongregationBySlug } from "@/lib/content/congregations";
import { Badge } from "@/components/Badge";
import { NewsCard } from "@/components/NewsCard";
import { ArrowRightIcon } from "@/components/Icons";
import { formatHuDate } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getNewsBySlug(params.slug);
  if (!item) return { title: "Hír" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getNewsBySlug(params.slug);
  if (!item) notFound();

  const congregation = item.congregationSlug
    ? await getCongregationBySlug(item.congregationSlug)
    : undefined;

  const allNews = await getNews();
  const related = allNews
    .filter((n) => n.slug !== item.slug && n.category === item.category)
    .slice(0, 3);

  return (
    <article>
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
            <Link href="/hirek" className="hover:text-gold-300">
              Hírek
            </Link>
          </nav>
          <div className="mb-4 flex items-center gap-3">
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

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {item.author && (
              <p className="mb-6 text-sm text-graphite-400">Szerző: {item.author}</p>
            )}
            <div className="space-y-5 text-lg leading-relaxed text-graphite-700">
              {item.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {congregation && (
              <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-cream-300/70 bg-cream-50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-graphite-400">
                    Kapcsolódó gyülekezet
                  </p>
                  <p className="font-serif text-lg font-semibold text-graphite-900">
                    {congregation.name}
                  </p>
                </div>
                <Link href={`/gyulekezetek/${congregation.slug}`} className="btn-outline">
                  Gyülekezet adatlapja
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            )}

            <Link href="/hirek" className="btn-ghost mt-10">
              Vissza a hírekhez
            </Link>
          </div>

          <aside>
            {related.length > 0 && (
              <>
                <h2 className="mb-5 font-serif text-xl font-semibold text-graphite-900">
                  További hírek
                </h2>
                <div className="space-y-6">
                  {related.map((n) => (
                    <NewsCard key={n.id} item={n} />
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </article>
  );
}
