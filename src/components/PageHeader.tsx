import type { ReactNode } from "react";
import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-cream-300/70 bg-cream-50">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(184,146,74,0.10), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(110,20,35,0.06), transparent 50%)",
        }}
      />
      <div className="container-page relative py-14 sm:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-graphite-400" aria-label="Morzsamenü">
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-burgundy-600">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-graphite-600">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-graphite-300">/</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-gold-500" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-graphite-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite-500">{description}</p>
        )}
      </div>
      <div className="motif-divider" />
    </section>
  );
}
