/**
 * Központi típusdefiníciók a mintaadatokhoz.
 *
 * A struktúra szándékosan közel áll egy lehetséges Supabase séma
 * sor-modelljéhez, hogy a későbbi adatbázis-integráció minimális
 * átalakítással megvalósítható legyen (egy táblasor ~ egy objektum).
 */

export type NewsCategory =
  | "Tudósítás"
  | "Felhívás"
  | "Hír"
  | "Ifjúság"
  | "Presbiteri";

export type DocumentCategory =
  | "Körlevelek"
  | "Űrlapok"
  | "Szabályzatok"
  | "Konferenciaanyagok";

export type MediaType = "Videó" | "Hanganyag" | "Előadás";

/**
 * Egy gyülekezet (egyházközség) adatai.
 *
 * A mezők a valós adatfeltöltéshez igazodnak: ahol még nincs hiteles adat,
 * ott üres string ("") vagy null szerepel, a felület pedig „Adatok feltöltés
 * alatt” feliratot jelenít meg. Kitalált adatot (lelkész, cím, telefon, e-mail)
 * szándékosan nem tárolunk.
 */
export interface Congregation {
  id: string;
  slug: string;
  /** Hivatalos név, pl. „Bánffyhunyadi Református Egyházközség”. */
  name: string;
  /** Település (magyar megnevezés). */
  settlement: string;
  /** A település hivatalos román neve (opcionális). */
  romanianName?: string;
  /** Lelkipásztor neve (üres, ha nincs adat). */
  pastor: string;
  /** Cím (üres, ha nincs adat). */
  address: string;
  /** Telefonszám / mobil (üres, ha nincs adat). Több szám vesszővel elválasztva. */
  phone: string;
  /** További mobilszám (opcionális). */
  mobile?: string;
  /** Vezetékes telefon (opcionális). */
  landline?: string;
  /** Hivatali telefon (opcionális). */
  officePhone?: string;
  /** E-mail cím (üres, ha nincs adat). Több cím vesszővel elválasztva. */
  email: string;
  /** Gyülekezeti lélekszám (opcionális). */
  membership?: number | null;
  /** Teljes (szórvánnyal együtti) lélekszám (opcionális). */
  totalMembership?: number | null;
  /** Istentiszteleti időpont (üres, ha nincs adat). */
  serviceTime: string;
  /** Templomkép URL-je (üres, ha nincs feltöltve). */
  image: string;
  /** Szélességi fok (null, ha nincs adat). */
  latitude: number | null;
  /** Hosszúsági fok (null, ha nincs adat). */
  longitude: number | null;
  /** Rövid bemutatkozás (üres, ha nincs adat). */
  description: string;
}

/** Hír / tudósítás. */
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: NewsCategory;
  /** ISO dátum, pl. "2026-05-12". */
  date: string;
  author?: string;
  /** Rövid összefoglaló a kártyához. */
  excerpt: string;
  /** Teljes szöveg (bekezdések tömbje). */
  body: string[];
  coverImage: string;
  /** Kapcsolódó gyülekezet slug-ja (opcionális). */
  congregationSlug?: string;
}

/** Eseménykategóriák – a naptárban és a kártyákon egységesen használjuk. */
export type EventCategory =
  | "Egyházmegyei esemény"
  | "Gyülekezeti alkalom"
  | "Ifjúsági alkalom"
  | "Konferencia"
  | "Ünnepi istentisztelet"
  | "Kulturális esemény";

/** Naptári esemény – a `src/data/events.ts` fájlban szerkeszthető. */
export interface EventItem {
  id: string;
  slug: string;
  title: string;
  /** ISO dátum, pl. "2026-06-21". */
  date: string;
  /** Kezdés, pl. "10:00". */
  startTime?: string;
  /** Befejezés, pl. "14:00". */
  endTime?: string;
  location: string;
  /** Szervező (egyházmegye, gyülekezet, bizottság stb.). */
  organizer?: string;
  category: EventCategory;
  description: string;
  /** Borítókép vagy plakát URL-je (opcionális). */
  image?: string;
  /** Főoldali kiemelt kártya – legfeljebb egy aktív eseményhez ajánlott. */
  featured?: boolean;
}

/** Letölthető dokumentum. */
export interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  date: string;
  /** Fájltípus, pl. "PDF", "DOCX". */
  fileType: string;
  fileSize: string;
  /** Letöltési hely (statikus prototípusban placeholder). */
  url: string;
  description?: string;
}

/** Médiatartalom (videó / hang / előadás). */
export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  date: string;
  speaker?: string;
  duration?: string;
  thumbnail: string;
  /** Külső link (YouTube, hangfájl stb.). */
  url: string;
  description?: string;
}

/** Napi áhítat / ige. */
export interface Devotion {
  date: string;
  reference: string;
  verse: string;
  thought: string;
  author?: string;
  /**
   * Az ÁhítApp admin felületén naponta létrejövő Facebook-poszt szövege.
   * Ha ki van töltve, a „Mai áhítat” blokk ezt a szöveget jeleníti meg
   * (a honlap nem generál külön tartalmat). A sortörések megmaradnak.
   */
  facebookText?: string;
  /** Külső ÁhítApp link. */
  appUrl: string;
}
