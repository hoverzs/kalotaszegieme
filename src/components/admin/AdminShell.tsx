"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Áttekintés" },
  { href: "/admin/congregations", label: "Gyülekezetek" },
  { href: "/admin/events", label: "Események" },
  { href: "/admin/news", label: "Hírek" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-cream-300 bg-white">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <Link href="/admin" className="shrink-0 font-serif text-lg font-semibold text-burgundy-600">
              Admin
            </Link>
            <nav className="flex gap-1">
              {links.map((link) => {
                const active =
                  link.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-burgundy-500 text-cream-50"
                        : "text-graphite-600 hover:bg-cream-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/" className="text-sm text-graphite-500 hover:text-burgundy-600">
              Honlap
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-cream-300 px-3 py-1.5 text-sm text-graphite-600 hover:bg-cream-50"
            >
              Kilépés
            </button>
          </div>
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
