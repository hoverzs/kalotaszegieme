import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";
import { localImages } from "@/data/images";

interface HeroSidePanel {
  eyebrow?: string;
  title: string;
  body: string;
}

interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  imageAlt?: string;
  /** Kisméretű, lapszintű fejléc (al-oldalakhoz) vagy nagy, főoldali hero. */
  size?: "full" | "compact";
  eyebrow?: string;
  /** Pecsétlogó az eyebrow felirat fölött (főoldali banner). */
  showLogo?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Felső keskeny sávban megjelenő köszöntő / bemutatkozó szöveg (főoldali hero). */
  sidePanel?: HeroSidePanel;
  children?: ReactNode;
}

export function Hero({
  title,
  subtitle,
  image,
  imageAlt = "",
  size = "compact",
  eyebrow,
  showLogo = false,
  primaryCta,
  secondaryCta,
  sidePanel,
  children,
}: HeroProps) {
  const isFull = size === "full";
  const hasTopBanner = isFull && sidePanel;

  return (
    <section
      className={`relative isolate flex w-full flex-col overflow-hidden ${
        isFull ? "min-h-[46vh] lg:min-h-[50vh]" : "min-h-[44vh] justify-center"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${isFull ? "object-[center_42%]" : "object-center"}`}
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold-400/10" />

      <div className="relative z-10 flex flex-1 flex-col">
        {hasTopBanner && (
          <aside className="w-full border-b border-cream-50/10 bg-graphite-900/55 backdrop-blur-md">
            <div className="container-page py-2.5 sm:py-3">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">
                <div className="shrink-0 lg:max-w-md xl:max-w-lg">
                  {sidePanel.eyebrow && (
                    <span className="mb-1.5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest2 text-gold-300 sm:text-xs">
                      <span className="h-px w-5 bg-gold-400" />
                      {sidePanel.eyebrow}
                    </span>
                  )}
                  <h2 className="font-serif text-base font-semibold leading-snug text-cream-50 sm:text-lg lg:text-xl">
                    {sidePanel.title}
                  </h2>
                </div>
                <p className="text-xs leading-relaxed text-cream-100/85 sm:text-sm lg:flex-1 lg:border-l lg:border-cream-50/10 lg:pl-8">
                  {sidePanel.body}
                </p>
              </div>
            </div>
          </aside>
        )}

        <div
          className={`container-page flex flex-1 flex-col justify-end ${
            hasTopBanner ? "pb-8 pt-4 sm:pb-10 sm:pt-5" : "justify-center py-20"
          }`}
        >
          <div className={`max-w-3xl ${isFull ? "animate-fade-up" : ""}`}>
            {showLogo && (
              <Link href="/" className="mb-4 inline-block sm:mb-5" aria-label="Főoldal">
                <Image
                  src={localImages.egyhazmegyeLogo}
                  alt=""
                  width={512}
                  height={512}
                  unoptimized
                  aria-hidden
                  className="h-24 w-24 rounded-full object-cover drop-shadow-lg sm:h-32 sm:w-32 md:h-36 md:w-36"
                />
              </Link>
            )}
            {eyebrow && (
              <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-gold-300">
                <span className="h-px w-8 bg-gold-400" />
                {eyebrow}
              </span>
            )}
            <h1
              className={`font-serif font-semibold leading-[1.05] text-cream-50 ${
                isFull ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl"
              }`}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={`mt-4 max-w-2xl leading-relaxed text-cream-100/90 ${
                  isFull ? "text-lg font-serif italic sm:text-xl" : "text-lg"
                }`}
              >
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-5 flex flex-wrap items-center gap-4">
                {primaryCta && (
                  <Link href={primaryCta.href} className="btn-primary">
                    {primaryCta.label}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/40 bg-cream-50/5 px-6 py-3 text-sm font-medium text-cream-50 backdrop-blur-sm transition-colors hover:bg-cream-50/15"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
