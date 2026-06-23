"use client";

import { useEffect, useState } from "react";
import type { DevotionApp } from "@/data/devotionApps";
import { BookIcon, SunIcon, UsersIcon } from "./Icons";

const themeStyles = {
  burgundy: {
    header: "bg-burgundy-600",
    chip: "bg-burgundy-100 text-burgundy-700",
    line: "bg-burgundy-200/60",
  },
  navy: {
    header: "bg-[#1e3a5f]",
    chip: "bg-[#1e3a5f]/10 text-[#1e3a5f]",
    line: "bg-[#1e3a5f]/20",
  },
} as const;

function PreviewMock({ app }: { app: DevotionApp }) {
  const styles = themeStyles[app.theme];
  const Icon = app.theme === "burgundy" ? SunIcon : UsersIcon;

  return (
    <div className="flex h-full flex-col bg-cream-50">
      <div className={`flex items-center gap-2 px-3 py-2.5 ${styles.header}`}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
          <Icon className="h-3.5 w-3.5 text-cream-50" />
        </span>
        <span className="text-[10px] font-semibold text-cream-50">{app.name}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <span
          className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${styles.chip}`}
        >
          {app.previewTagline}
        </span>
        <div className={`h-2 w-3/4 rounded-full ${styles.line}`} />
        <div className={`h-2 w-full rounded-full ${styles.line}`} />
        <div className={`h-2 w-5/6 rounded-full ${styles.line}`} />
        <div className="mt-auto flex items-center gap-1.5">
          <BookIcon className="h-3 w-3 text-gold-600" />
          <div className={`h-1.5 flex-1 rounded-full ${styles.line}`} />
        </div>
      </div>
    </div>
  );
}

/**
 * Telefonkeret – mobilon stilizált mock, asztali nézetben opcionális iframe-előnézet.
 * Ha a külső app tiltja a beágyazást, a mock marad látható.
 */
export function AppPreviewFrame({ app }: { app: DevotionApp }) {
  const [enableIframe, setEnableIframe] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableIframe(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[168px] shrink-0 sm:max-w-[180px]">
      <div className="rounded-[1.75rem] border-[3px] border-graphite-800/90 bg-graphite-900 p-1.5 shadow-lg">
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.35rem] bg-cream-100">
          <PreviewMock app={app} />

          {enableIframe && (
            <iframe
              src={app.url}
              title={`${app.name} előnézet`}
              className={`pointer-events-none absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
                iframeVisible ? "opacity-95" : "opacity-0"
              }`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={() => setIframeVisible(true)}
            />
          )}
        </div>
      </div>
      <p className="mt-2 hidden text-center text-[10px] font-medium uppercase tracking-wide text-graphite-400 md:block">
        App előnézet
      </p>
    </div>
  );
}
