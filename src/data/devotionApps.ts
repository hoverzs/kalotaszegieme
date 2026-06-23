/** Külső áhítatos alkalmazások – a főoldali szekcióban megjelenítve. */

export interface DevotionApp {
  id: string;
  name: string;
  url: string;
  description: string;
  /** Belső „Részletek” link (opcionális). */
  detailsHref?: string;
  /** Kártya színhang – a Tailwind osztályokhoz illeszkedő azonosító. */
  theme: "burgundy" | "navy";
  /** Rövid címke az előnézet mockban. */
  previewTagline: string;
}

export const devotionApps: DevotionApp[] = [
  {
    id: "ahitapp",
    name: "Napi ÁhitAPP",
    url: "https://ahit-app.vercel.app/",
    description: "Napi áhítatok, imádságok és lelki gondolatok.",
    detailsHref: "/ahitatok",
    theme: "burgundy",
    previewTagline: "Mai áhítat",
  },
  {
    id: "ifige",
    name: "IFIge",
    url: "https://ifige-production.up.railway.app/",
    description: "Fiataloknak készült heti lelki sorozatok, rövid napi gondolatokkal.",
    detailsHref: "/ahitatok",
    theme: "navy",
    previewTagline: "Heti sorozat",
  },
];
