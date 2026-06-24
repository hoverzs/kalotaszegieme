/**
 * Központi képtár.
 *
 * A gyülekezeti templomfotók a `public/images/congregations/` mappában vannak;
 * a `congregationPhotos` táblázat és a `congregationImage()` függvény kezeli őket.
 */

import type { Congregation } from "./types";

/**
 * Helyi (saját) képek a `public/` mappából.
 * Ezek a projekttel együtt verziózódnak, nem külső forrásból töltődnek.
 */
export const localImages = {
  /** Főoldali hero – kalotaszegi dombvidék. */
  heroKalotaszeg: "/images/hero-kalotaszeg.png",
  /** Fejléc háttér – kalotaszegi templom, naplemente. */
  headerBanner: "/images/header-banner.png",
  /** Hivatalos egyházmegyei pecsét / logó (átlátszó háttér). */
  egyhazmegyeLogo: "/images/egyhazmegye-logo-v2.png",
};

/**
 * Gyülekezetenkénti valós templomfotók (Wikimedia Commons, szabad licenc).
 *
 * Kulcs: a gyülekezet `slug`-ja. Érték: közvetlen, hotlinkelhető kép-URL.
 * Csak ellenőrzött, az adott templomot ábrázoló fotók kerülnek ide; ahol
 * nincs ilyen, a bejegyzés hiányzik, és a felület illusztratív képet mutat.
 * A hivatalos galéria elkészültével ezek lecserélhetők (pl. Supabase Storage).
 */
export const congregationPhotos: Record<string, string> = {
  banffyhunyad: "/images/congregations/banffyhunyad.png",
  egeres: "/images/congregations/egeres.png",
  ketesd: "/images/congregations/ketesd.png",
  kispetri: "/images/congregations/kispetri.png",
  magyargyeromonostor: "/images/congregations/magyargyeromonostor.png",
  ture: "/images/congregations/ture.png",
  bogartelke: "/images/congregations/bogartelke.png",
  farnas: "/images/congregations/farnas.png",
  gyerovasarhely: "/images/congregations/gyerovasarhely.png",
  gyalu: "/images/congregations/gyalu.png",
  inaktelke: "/images/congregations/inaktelke.png",
  kalotadamos: "/images/congregations/kalotadamos.png",
  jakotelke: "/images/congregations/kalotadamos.png",
  kalotaszentkiraly: "/images/congregations/kalotaszentkiraly.png",
  korosfo: "/images/congregations/korosfo.png",
  kozeplak: "/images/congregations/kozeplak.png",
  magyarbikal: "/images/congregations/magyarbikal.png",
  magyarkapus: "/images/congregations/magyarkapus.png",
  magyarkiskapus: "/images/congregations/magyarkiskapus.png",
  magyarokerek: "/images/congregations/magyarokerek.png",
  makofalva: "/images/congregations/makofalva.png",
  mera: "/images/congregations/mera.png",
  nagypetri: "/images/congregations/nagypetri.png",
  nyarszo: "/images/congregations/nyarszo-sarvasar.png",
  sarvasar: "/images/congregations/nyarszo-sarvasar.png",
  sztana: "/images/congregations/sztana.png",
  varalmas: "/images/congregations/varalmas.png",
  zsobok: "/images/congregations/zsobok.png",
  magyarlona:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Biserica_reformat%C4%83_din_Luna_de_Sus.jpg/1280px-Biserica_reformat%C4%83_din_Luna_de_Sus.jpg",
  magyarvista: "/images/congregations/magyarvista.png",
  nadasdaroc:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Biserica_reformat%C4%83_din_Dorol%C8%9Bu.jpg/1280px-Biserica_reformat%C4%83_din_Dorol%C8%9Bu.jpg",
};

/** Galéria-kártya valós gyülekezeti fotókból. */
export interface CongregationGalleryImage {
  src: string;
  caption: string;
  subcaption: string;
  href: string;
}

/** Főoldali galéria kiemelt gyülekezetei (vizuálisan változatos templomok). */
export const featuredGallerySlugs = ["banffyhunyad", "kalotaszentkiraly", "magyarbikal"] as const;

/**
 * Valós templomfotók galéria formátumban.
 * Csak olyan gyülekezet kerül be, amelyhez van hiteles kép.
 */
export function congregationGalleryImages(
  congregations: Congregation[],
  options?: { limit?: number; slugs?: readonly string[] },
): CongregationGalleryImage[] {
  const bySlug = new Map(
    congregations.map((c) => {
      const photo = congregationImage(c.slug, c.image);
      if (!photo.isReal) return [c.slug, null] as const;
      return [
        c.slug,
        {
          src: photo.src,
          caption: c.settlement,
          subcaption: c.name.replace(/ Református Egyházközség$/, ""),
          href: `/gyulekezetek/${c.slug}` as const,
        },
      ] as const;
    }),
  );

  const orderedSlugs = options?.slugs ?? [...bySlug.keys()].sort();
  const items: CongregationGalleryImage[] = [];
  for (const slug of orderedSlugs) {
    const item = bySlug.get(slug);
    if (item) items.push(item);
  }

  if (options?.limit) return items.slice(0, options.limit);
  return items;
}

/** Illusztratív fallback, ha nincs valós fotó (pl. hiányzó adat). */
const churchFallbackPool = [localImages.headerBanner, localImages.heroKalotaszeg];

/**
 * Egy gyülekezethez tartozó megjelenítendő kép.
 * Prioritás: hivatalos kép (`overrideImage`) → valós Commons-fotó → illusztráció.
 * Az `isReal` jelzi, hogy valós (az adott templomot ábrázoló) fotóról van-e szó.
 */
export function congregationImage(
  slug: string,
  overrideImage?: string,
): { src: string; isReal: boolean } {
  if (overrideImage && overrideImage.trim() !== "") {
    return { src: overrideImage, isReal: true };
  }
  const real = congregationPhotos[slug];
  if (real) {
    return { src: real, isReal: true };
  }
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return { src: churchFallbackPool[hash % churchFallbackPool.length], isReal: false };
}
