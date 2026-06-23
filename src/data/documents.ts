import type { DocumentItem } from "./types";

/**
 * Mintaadatok a dokumentumtárhoz.
 * A statikus prototípusban az `url` placeholder (# vagy minta-útvonal).
 */
export const documents: DocumentItem[] = [
  {
    id: "1",
    title: "Esperesi körlevél – 2026. tavasz",
    category: "Körlevelek",
    date: "2026-04-02",
    fileType: "PDF",
    fileSize: "320 KB",
    url: "#",
    description:
      "Az esperes tavaszi körlevele a gyülekezetek számára, az egyházmegyei élet aktuális kérdéseiről.",
  },
  {
    id: "2",
    title: "Adatszolgáltatási űrlap gyülekezetek számára",
    category: "Űrlapok",
    date: "2026-03-15",
    fileType: "DOCX",
    fileSize: "48 KB",
    url: "#",
    description:
      "Éves statisztikai adatszolgáltatás kitölthető űrlapja a gyülekezetek részére.",
  },
  {
    id: "3",
    title: "Egyházmegyei szervezeti és működési szabályzat",
    category: "Szabályzatok",
    date: "2025-11-20",
    fileType: "PDF",
    fileSize: "1,2 MB",
    url: "#",
    description:
      "A Kalotaszegi Református Egyházmegye szervezeti és működési szabályzatának hatályos szövege.",
  },
  {
    id: "4",
    title: "Presbiteri konferencia – előadásvázlatok",
    category: "Konferenciaanyagok",
    date: "2026-04-26",
    fileType: "PDF",
    fileSize: "640 KB",
    url: "#",
    description:
      "A tavaszi presbiteri konferencián elhangzott előadások vázlatai és segédanyagai.",
  },
  {
    id: "5",
    title: "Pályázati útmutató templomfelújításhoz",
    category: "Űrlapok",
    date: "2026-02-10",
    fileType: "PDF",
    fileSize: "210 KB",
    url: "#",
    description:
      "Útmutató és kitöltési segédlet a templomfelújítási pályázatok benyújtásához.",
  },
  {
    id: "6",
    title: "Esperesi körlevél – 2025. advent",
    category: "Körlevelek",
    date: "2025-12-01",
    fileType: "PDF",
    fileSize: "295 KB",
    url: "#",
    description:
      "Adventi körlevél a gyülekezetek számára, az ünnepi készülődés jegyében.",
  },
  {
    id: "7",
    title: "Diakóniai szolgálat szabályzata",
    category: "Szabályzatok",
    date: "2025-09-08",
    fileType: "PDF",
    fileSize: "880 KB",
    url: "#",
    description:
      "Az egyházmegyei diakóniai szolgálat működésének és szervezésének szabályzata.",
  },
  {
    id: "8",
    title: "Ifjúsági konferencia – tematikus füzet",
    category: "Konferenciaanyagok",
    date: "2025-08-22",
    fileType: "PDF",
    fileSize: "1,5 MB",
    url: "#",
    description:
      "Az ifjúsági konferencia témáit és csoportmunka-segédleteit tartalmazó füzet.",
  },
];

export const documentCategories = [
  "Körlevelek",
  "Űrlapok",
  "Szabályzatok",
  "Konferenciaanyagok",
] as const;
