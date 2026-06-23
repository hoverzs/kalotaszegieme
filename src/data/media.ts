import type { MediaItem } from "./types";
import { churchImages as ch, landscapeImages as ls, lifeImages as life } from "./images";

/** Mintaadatok a média oldalhoz (videó / hang / előadás). */
export const media: MediaItem[] = [
  {
    id: "1",
    title: "Vasárnapi istentisztelet – Bánffyhunyad",
    type: "Videó",
    date: "2026-05-24",
    speaker: "Nt. Kovács István",
    duration: "58 perc",
    thumbnail: ch.stainedGlass,
    url: "#",
    description:
      "Az istentisztelet teljes közvetítése a bánffyhunyadi református templomból.",
  },
  {
    id: "2",
    title: "Áhítat – „Hitben járva”",
    type: "Hanganyag",
    date: "2026-05-18",
    speaker: "Nt. Veres Kálmán",
    duration: "12 perc",
    thumbnail: ls.foggyForest,
    url: "#",
    description: "Rövid esti áhítat hanganyag formájában.",
  },
  {
    id: "3",
    title: "Előadás: Kalotaszeg egyháztörténete",
    type: "Előadás",
    date: "2026-04-30",
    speaker: "Dr. Tóth Sándor",
    duration: "74 perc",
    thumbnail: life.lecture,
    url: "#",
    description:
      "Tudományos előadás a kalotaszegi reformátusság történetéről, a presbiteri konferencián.",
  },
  {
    id: "4",
    title: "Ifjúsági énekkar koncertje",
    type: "Videó",
    date: "2026-04-12",
    speaker: "Egyházmegyei ifjúsági énekkar",
    duration: "41 perc",
    thumbnail: life.microphone,
    url: "#",
    description: "Az egyházmegyei ifjúsági énekkar tavaszi koncertfelvétele.",
  },
  {
    id: "5",
    title: "Bibliaóra – A Hegyi beszéd üzenete",
    type: "Hanganyag",
    date: "2026-03-28",
    speaker: "Nt. Deák Anna",
    duration: "35 perc",
    thumbnail: life.library,
    url: "#",
    description: "Tematikus bibliaóra hangfelvétele a Hegyi beszédről.",
  },
  {
    id: "6",
    title: "Előadás: A kalotaszegi templomok művészete",
    type: "Előadás",
    date: "2026-02-19",
    speaker: "Kis Ildikó művészettörténész",
    duration: "62 perc",
    thumbnail: ch.archesInterior,
    url: "#",
    description:
      "Vetített képes előadás a kalotaszegi templomok festett kazettás mennyezeteiről.",
  },
];

export const mediaTypes = ["Videó", "Hanganyag", "Előadás"] as const;
