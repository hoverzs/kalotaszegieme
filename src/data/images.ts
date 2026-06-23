/**
 * Központi képtár (illusztratív, szabadon felhasználható Unsplash fotók).
 *
 * A prototípusban gondosan kiválasztott, ellenőrzött képeket használunk:
 * templombelsők, valamint Kalotaszeg hangulatát idéző táj- és
 * természetfotók. A későbbi verzióban ezek könnyen lecserélhetők a
 * gyülekezetek valós fényképeire (pl. Supabase Storage URL-ekre).
 */

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Templomképek (belsők / templomtornyos városkép). */
export const churchImages = {
  stainedGlass: U("1438032005730-c779502df39b"),
  archesInterior: U("1473177104440-ffee2f376098"),
  townscapeSpire: U("1516550893923-42d28e5677af"),
};

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

/** Tájképek – Kalotaszeg dombvidékének hangulatát idézik. */
export const landscapeImages = {
  mistyValley: U("1469474968028-56623f02e42e"),
  greenHills: U("1470071459604-3b5ec3a7fe05"),
  alpineLake: U("1501785888041-af3ef285b470"),
  forestLight: U("1441974231531-c6227db76b6e"),
  hillCircle: U("1472214103451-9374bd1c798e"),
  valleyCliff: U("1426604966848-d7adac402bff"),
  wheatField: U("1500382017468-9049fed747ef"),
  starryPeaks: U("1519681393784-d120267933ba"),
  snowyMountains: U("1454496522488-7a8e488e8606"),
  peakClouds: U("1505765050516-f72dcac9c60e"),
  sunriseClouds: U("1506905925346-21bda4d32df4"),
  pineMountains: U("1464822759023-fed622ff2c3b"),
  foggyForest: U("1543968996-ee822b8176ba"),
};

/** Közösségi / média jellegű képek. */
export const lifeImages = {
  community: U("1529156069898-49953e39b3ac"),
  lecture: U("1524178232363-1fb2b075b655"),
  microphone: U("1516280440614-37939bbacd81"),
  library: U("1481627834876-b7833e8f5570"),
  mixer: U("1518972559570-7cc1309f3229"),
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
  kalotaszentkiraly: "/images/congregations/kalotaszentkiraly.png",
  korosfo: "/images/congregations/korosfo.png",
  kozeplak: "/images/congregations/kozeplak.png",
  magyarbikal: "/images/congregations/magyarbikal.png",
  magyarkapus: "/images/congregations/magyarkapus.png",
  magyarokerek: "/images/congregations/magyarokerek.png",
  makofalva: "/images/congregations/makofalva.png",
  mera: "/images/congregations/mera.png",
  nagypetri: "/images/congregations/nagypetri.png",
  "nyarszo-sarvasar": "/images/congregations/nyarszo-sarvasar.png",
  sztana: "/images/congregations/sztana.png",
  varalmas: "/images/congregations/varalmas.png",
  zsobok: "/images/congregations/zsobok.png",
  magyarlona:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Biserica_reformat%C4%83_din_Luna_de_Sus.jpg/1280px-Biserica_reformat%C4%83_din_Luna_de_Sus.jpg",
  magyarvista: "/images/congregations/magyarvista.png",
  nadasdaroc:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Biserica_reformat%C4%83_din_Dorol%C8%9Bu.jpg/1280px-Biserica_reformat%C4%83_din_Dorol%C8%9Bu.jpg",
};

/** Illusztratív, ellenőrzött templomképek (fallback, ha nincs valós fotó). */
const churchFallbackPool = [
  churchImages.archesInterior,
  churchImages.stainedGlass,
  churchImages.townscapeSpire,
];

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
