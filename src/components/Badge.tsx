import type { ReactNode } from "react";

type Tone = "burgundy" | "gold" | "graphite" | "outline";

const tones: Record<Tone, string> = {
  burgundy: "bg-burgundy-50 text-burgundy-600 border border-burgundy-100",
  gold: "bg-gold-50 text-gold-700 border border-gold-100",
  graphite: "bg-graphite-100 text-graphite-700 border border-graphite-200",
  outline: "bg-white/80 text-graphite-700 border border-cream-300 backdrop-blur",
};

export function Badge({
  children,
  tone = "burgundy",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
