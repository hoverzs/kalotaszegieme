"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, moreNav, siteConfig } from "@/lib/site";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./Icons";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const moreActive = moreNav.some((item) => isActive(pathname, item.href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-cream-300/70 bg-cream-100/95 shadow-sm backdrop-blur-md"
          : "border-cream-300/70 bg-cream-100"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between gap-4 sm:h-16 lg:justify-center">
        <Link
          href="/"
          className="font-serif text-sm font-semibold leading-tight text-burgundy-600 lg:hidden"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Fő navigáció">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                  active
                    ? "text-burgundy-600"
                    : "text-graphite-600 hover:text-burgundy-600"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-500" />
                )}
              </Link>
            );
          })}

          <div className="group relative">
            <button
              type="button"
              className={`relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                moreActive
                  ? "text-burgundy-600"
                  : "text-graphite-600 hover:text-burgundy-600"
              }`}
              aria-haspopup="true"
            >
              Továbbiak
              <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              {moreActive && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-500" />
              )}
            </button>
            <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-52 overflow-hidden rounded-2xl border border-cream-300/70 bg-white p-1.5 shadow-premium">
                {moreNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                        active
                          ? "bg-burgundy-50 text-burgundy-600"
                          : "text-graphite-600 hover:bg-cream-100 hover:text-burgundy-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 text-graphite-700 transition-colors hover:bg-cream-200 lg:hidden"
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-cream-300/70 bg-cream-50 transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? "max-h-[720px]" : "max-h-0"
        }`}
      >
        <div className="container-page py-4">
          <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2" aria-label="Mobil navigáció">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-burgundy-50 text-burgundy-600"
                      : "text-graphite-700 hover:bg-cream-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <p className="mb-1 mt-4 px-4 text-[11px] font-semibold uppercase tracking-widest2 text-graphite-400">
            Továbbiak
          </p>
          <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2" aria-label="További menüpontok">
            {moreNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-burgundy-50 text-burgundy-600"
                      : "text-graphite-700 hover:bg-cream-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
