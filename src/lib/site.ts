/** Globális oldalbeállítások és navigáció. */

export interface ContactPerson {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

export const siteConfig = {
  name: "Kalotaszegi Református Egyházmegye",
  shortName: "Kalotaszegi Egyházmegye",
  motto: "Hitben járva, közösségben élve",
  domain: "kalotaszegieme.ro",
  contact: {
    title: "Kalotaszegi Református Egyházmegye",
    officeName: "Protopopiatul Reformat Calata Huedin",
    address: "str. Horea nr. 21, jud. Cluj",
    phone: "0264-354319",
    email: "kalotaszegieme@yahoo.com",
    website: "https://kalotaszegieme.ro/",
    people: [
      {
        name: "Lukács Endre",
        role: "Esperes",
        phone: "0726-349910",
        email: "lukacs1972@yahoo.com",
      },
      {
        name: "Bernáth-Ady Melinda",
        role: "Titkárnő",
        phone: "0730-616967",
        email: "melindaketesd@freemail.hu",
      },
    ] satisfies ContactPerson[],
  },
};

/** Telefonszám `tel:` linkhez (román formátum). */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+40${digits.slice(1)}`;
  if (digits.startsWith("40")) return `+${digits}`;
  return `+${digits}`;
}

export interface NavItem {
  label: string;
  href: string;
}

/** Fő menüpontok – rövid, áttekinthető főmenü. */
export const mainNav: NavItem[] = [
  { label: "Főoldal", href: "/" },
  { label: "Egyházmegye", href: "/egyhazmegye" },
  { label: "Gyülekezetek", href: "/gyulekezetek" },
  { label: "Események", href: "/esemenyek" },
  { label: "Tudósítások", href: "/tudositasok" },
  { label: "Kapcsolat", href: "/elerhetoseg" },
];

/** Másodlagos menüpontok – a „Továbbiak” lenyíló menüben. */
export const moreNav: NavItem[] = [
  { label: "Címtár", href: "/cimtar" },
  { label: "Térkép", href: "/terkep" },
  { label: "Dokumentumtár", href: "/dokumentumtar" },
  { label: "Áhítatok", href: "/ahitatok" },
  { label: "Templomgaléria", href: "/templomgaleria" },
];

/** Összes navigációs link (pl. lábléchez). */
export const allNav: NavItem[] = [...mainNav, ...moreNav];

/** Egységes felirat a hiányzó adatok helyén. */
export const PLACEHOLDER = "Adatok feltöltés alatt";

/** Visszaadja az értéket, vagy az „Adatok feltöltés alatt” feliratot, ha üres. */
export function orPlaceholder(value?: string | null): string {
  return value && value.trim() !== "" ? value : PLACEHOLDER;
}

/** Igaz, ha az adat hiányzik (üres/whitespace/null). */
export function isMissing(value?: string | null): boolean {
  return !value || value.trim() === "";
}

/** Vesszővel/pontosvesszővel elválasztott értékek tömbje (pl. több telefon vagy e-mail). */
export function splitValues(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Magyar címkék a gyülekezeti adatokhoz. */
export const labels = {
  congregation: "Gyülekezet",
  settlement: "Település",
  romanianName: "Román hivatalos név",
  pastor: "Lelkipásztor",
  address: "Cím",
  phone: "Telefon",
  mobile: "Mobil",
  landline: "Vezetékes telefon",
  officePhone: "Hivatal",
  membership: "Lélekszám",
  totalMembership: "Teljes lélekszám",
  email: "Email",
  serviceTime: "Istentiszteleti időpont",
  description: "Bemutatkozás",
  map: "Térkép",
  gallery: "Galéria",
  details: "Részletek",
} as const;

/** Magyar dátumformázás. */
export function formatHuDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/** Rövid hónap + nap a naptárkártyához. */
export function dateParts(iso: string): { day: string; month: string; year: string } {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat("hu-HU", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("hu-HU", { month: "short" }).format(d);
  const year = new Intl.DateTimeFormat("hu-HU", { year: "numeric" }).format(d);
  return { day, month, year };
}
