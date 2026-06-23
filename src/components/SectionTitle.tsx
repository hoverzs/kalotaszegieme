import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./Icons";

interface SectionTitleProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Opcionális „összes megtekintése” link a fejléc jobb oldalán. */
  link?: { label: string; href: string };
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  link,
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      } ${className}`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <span className="eyebrow mb-3">
            <span className="h-px w-6 bg-gold-500" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-semibold leading-tight text-graphite-900 sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-graphite-500">{description}</p>
        )}
      </div>

      {link && (
        <Link href={link.href} className="btn-ghost shrink-0">
          {link.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
