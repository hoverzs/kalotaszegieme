import Link from "next/link";
import type { DevotionApp } from "@/data/devotionApps";
import { AppPreviewFrame } from "./AppPreviewFrame";
import { ArrowRightIcon, ExternalLinkIcon } from "./Icons";

const themeBorder = {
  burgundy: "border-burgundy-200/70 hover:border-burgundy-300",
  navy: "border-[#1e3a5f]/20 hover:border-[#1e3a5f]/35",
} as const;

const themeAccent = {
  burgundy: "bg-burgundy-500",
  navy: "bg-[#1e3a5f]",
} as const;

export function DevotionAppCard({ app }: { app: DevotionApp }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover ${themeBorder[app.theme]}`}
    >
      <div className={`h-1 w-full ${themeAccent[app.theme]}`} />

      <div className="flex flex-1 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
        <AppPreviewFrame app={app} />

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="font-serif text-xl font-semibold text-graphite-900 sm:text-2xl">
            {app.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-graphite-500">{app.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Megnyitás
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
            {app.detailsHref && (
              <Link href={app.detailsHref} className="btn-outline">
                Részletek
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
