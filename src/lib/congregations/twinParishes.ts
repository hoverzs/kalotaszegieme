/** Társ egyházközségek – közös lelkipásztorral szolgáló települések. */
const twinParishLinks: Record<string, { slug: string; settlement: string }> = {
  nyarszo: { slug: "sarvasar", settlement: "Sárvásár" },
  sarvasar: { slug: "nyarszo", settlement: "Nyárszó" },
  kalotadamos: { slug: "jakotelke", settlement: "Jákótelke" },
  jakotelke: { slug: "kalotadamos", settlement: "Kalotadámos" },
};

export function getTwinParish(slug: string) {
  return twinParishLinks[slug] ?? null;
}
