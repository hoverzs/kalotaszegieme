import { siteConfig, telHref } from "@/lib/site";
import type { ReactNode } from "react";
import {
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
} from "./Icons";

interface ContactBlockProps {
  /** Megjelenés: önálló kártya vagy beágyazott lista. */
  variant?: "card" | "plain";
}

function ContactLine({
  icon: Icon,
  href,
  children,
}: {
  icon: typeof PhoneIcon;
  href?: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
        <Icon className="h-4 w-4" />
      </span>
      {href ? (
        <a href={href} className="text-sm text-graphite-700 transition-colors hover:text-burgundy-600">
          {children}
        </a>
      ) : (
        <span className="text-sm text-graphite-700">{children}</span>
      )}
    </li>
  );
}

export function ContactBlock({ variant = "card" }: ContactBlockProps) {
  const { contact } = siteConfig;
  const wrapper =
    variant === "card"
      ? "rounded-2xl border border-cream-300/70 bg-white p-7 shadow-card"
      : "";

  return (
    <div className={wrapper}>
      <h3 className="font-serif text-xl font-semibold text-graphite-900 sm:text-2xl">
        {contact.title}
      </h3>

      <div className="mt-6 space-y-6">
        {contact.people.map((person) => (
          <div key={person.email ?? person.name}>
            <p className="mb-3 flex items-start gap-3 font-medium text-graphite-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
                <UsersIcon className="h-4 w-4" />
              </span>
              <span className="pt-1 text-sm sm:text-base">
                {person.name} – {person.role}
              </span>
            </p>
            <ul className="space-y-2 pl-11">
              {person.phone && (
                <ContactLine icon={PhoneIcon} href={`tel:${telHref(person.phone)}`}>
                  {person.phone}
                </ContactLine>
              )}
              {person.email && (
                <ContactLine icon={MailIcon} href={`mailto:${person.email}`}>
                  {person.email}
                </ContactLine>
              )}
            </ul>
          </div>
        ))}

        <div className="border-t border-cream-200 pt-6">
          <p className="mb-3 flex items-start gap-3 font-medium text-graphite-900">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy-50 text-burgundy-500">
              <MapPinIcon className="h-4 w-4" />
            </span>
            <span className="pt-1 text-sm sm:text-base">{contact.officeName}</span>
          </p>
          <ul className="space-y-2 pl-11">
            <ContactLine icon={MapPinIcon}>{contact.address}</ContactLine>
            <ContactLine icon={PhoneIcon} href={`tel:${telHref(contact.phone)}`}>
              {contact.phone}
            </ContactLine>
            <ContactLine icon={MailIcon} href={`mailto:${contact.email}`}>
              {contact.email}
            </ContactLine>
            <ContactLine icon={ExternalLinkIcon} href={contact.website}>
              {contact.website.replace(/^https?:\/\//, "")}
            </ContactLine>
          </ul>
        </div>
      </div>
    </div>
  );
}
