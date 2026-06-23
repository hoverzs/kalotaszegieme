import Link from "next/link";
import { allNav, siteConfig, telHref } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRightIcon, ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

// Fontos linkek a láblécben (a Főoldal nélkül).
const footerLinks = allNav.slice(1, 9);

export function Footer() {
  return (
    <footer className="mt-16 bg-graphite-900 text-cream-200">
      <div className="motif-divider" />
      <div className="container-page grid grid-cols-1 gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Márka + jelmondat */}
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/70">
            {siteConfig.motto}.
          </p>
        </div>

        {/* Fontos linkek */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest2 text-gold-400">
            Gyors elérés
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream-200/80 transition-colors hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Elérhetőség */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest2 text-gold-400">
            Elérhetőség
          </h3>
          <ul className="space-y-2.5 text-sm text-cream-200/80">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${telHref(siteConfig.contact.phone)}`} className="hover:text-gold-300">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold-300">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <ExternalLinkIcon className="h-4 w-4 shrink-0 text-gold-400" />
              <a
                href={siteConfig.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300"
              >
                {siteConfig.domain}
              </a>
            </li>
          </ul>
        </div>

        {/* Hírlevél – kompakt */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest2 text-gold-400">
            Hírlevél
          </h3>
          <form
            className="flex gap-2"
            // Statikus prototípus: a feliratkozás később köthető be (pl. Supabase / e-mail szolgáltató).
            aria-label="Hírlevél feliratkozás"
          >
            <input
              type="email"
              required
              placeholder="E-mail cím"
              className="w-full rounded-full border border-graphite-600 bg-graphite-800 px-4 py-2.5 text-sm text-cream-50 placeholder:text-cream-200/40 focus:border-gold-400 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-gold-500 px-4 py-2.5 text-sm font-medium text-graphite-900 transition-colors hover:bg-gold-400"
              aria-label="Feliratkozom"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2.5 text-xs text-cream-200/40">
            A funkció a végleges verzióban lesz aktív.
          </p>
        </div>
      </div>

      <div className="border-t border-graphite-700">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream-200/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Minden jog fenntartva.
          </p>
          <p>{siteConfig.domain}</p>
        </div>
      </div>
    </footer>
  );
}
