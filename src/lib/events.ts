import type { EventCategory } from "@/data/types";

/** Kategória badge színei – mélykék, bordó és arany árnyalatok. */
export const eventCategoryStyles: Record<
  EventCategory,
  { badge: string; accent: string }
> = {
  "Egyházmegyei esemény": {
    badge: "bg-burgundy-500 text-cream-50",
    accent: "bg-burgundy-500",
  },
  "Gyülekezeti alkalom": {
    badge: "bg-graphite-800 text-cream-50",
    accent: "bg-graphite-800",
  },
  "Ifjúsági alkalom": {
    badge: "bg-[#1e3a5f] text-cream-50",
    accent: "bg-[#1e3a5f]",
  },
  Konferencia: {
    badge: "bg-gold-600 text-graphite-900",
    accent: "bg-gold-500",
  },
  "Ünnepi istentisztelet": {
    badge: "bg-burgundy-700 text-cream-50",
    accent: "bg-burgundy-700",
  },
  "Kulturális esemény": {
    badge: "bg-gold-100 text-burgundy-700 ring-1 ring-gold-300",
    accent: "bg-gold-400",
  },
};
