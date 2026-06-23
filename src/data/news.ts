import type { NewsItem } from "./types";
import { churchImages as ch, landscapeImages as ls, lifeImages as life } from "./images";

/** Mintaadatok a hírekhez / tudósításokhoz. */
export const seedNews: NewsItem[] = [
  {
    id: "1",
    slug: "egyhazmegyei-kozgyules-2026",
    title: "Egyházmegyei közgyűlést tartottak Bánffyhunyadon",
    category: "Tudósítás",
    date: "2026-05-28",
    author: "Egyházmegyei Hivatal",
    excerpt:
      "A Kalotaszegi Református Egyházmegye tavaszi közgyűlésén áttekintették az elmúlt esztendő szolgálatát és elfogadták a következő év terveit.",
    body: [
      "A Kalotaszegi Református Egyházmegye tavaszi rendes közgyűlését a bánffyhunyadi templomban tartotta meg. Az igei szolgálat után az esperes beszámolt az egyházmegye életéről és a gyülekezetek szolgálatáról.",
      "A közgyűlés elfogadta a következő esztendő munkatervét, amely kiemelten foglalkozik az ifjúsági munkával, a templomfelújításokkal és a diakóniai szolgálat erősítésével.",
      "A tanácskozás végén a résztvevők közös úrvacsorai közösségben adtak hálát az elmúlt esztendő áldásaiért.",
    ],
    coverImage: ch.townscapeSpire,
    congregationSlug: "banffyhunyad",
  },
  {
    id: "2",
    slug: "ifjusagi-tabor-felhivas",
    title: "Felhívás: nyári ifjúsági tábor Kalotaszentkirályon",
    category: "Felhívás",
    date: "2026-05-20",
    author: "Ifjúsági Bizottság",
    excerpt:
      "Szeretettel hívjuk az egyházmegye fiataljait a hagyományos nyári ifjúsági táborba. Jelentkezni a gyülekezeti lelkipásztoroknál lehet.",
    body: [
      "Idén nyáron ismét megrendezzük az egyházmegyei ifjúsági tábort Kalotaszentkirályon. A tábor témája: „Hitben járva” – közös bibliatanulmányozás, éneklés, kézműves foglalkozások és közösségi programok várják a fiatalokat.",
      "A táborba 12–18 éves fiatalok jelentkezését várjuk. A jelentkezési határidő június 30. A részvételi díj a szállást és az étkezést tartalmazza.",
      "Jelentkezni a gyülekezeti lelkipásztoroknál vagy az egyházmegyei hivatalban lehet.",
    ],
    coverImage: life.community,
    congregationSlug: "kalotaszentkiraly",
  },
  {
    id: "3",
    slug: "templomfelujitas-magyarvalko",
    title: "Befejeződött a magyarvalkói templom tetőfelújítása",
    category: "Hír",
    date: "2026-05-12",
    author: "Egyházmegyei Hivatal",
    excerpt:
      "A középkori eredetű magyarvalkói templom tetőszerkezetének felújítása sikeresen lezárult, megőrizve a műemlék eredeti arculatát.",
    body: [
      "A több mint hét évszázados magyarvalkói erődtemplom tetőszerkezetének felújítása befejeződött. A munkálatok során a műemlékvédelmi előírásoknak megfelelően, az eredeti anyagokhoz hűen újították fel a zsindelyfedést.",
      "A felújítást pályázati támogatás és a gyülekezet adományai tették lehetővé. A közösség hálával tekint a megőrzött örökségre.",
    ],
    coverImage: ch.archesInterior,
    congregationSlug: "magyarvalko",
  },
  {
    id: "4",
    slug: "presbiteri-konferencia",
    title: "Presbiteri konferencia a szolgálat megújulásáról",
    category: "Presbiteri",
    date: "2026-04-26",
    author: "Egyházmegyei Hivatal",
    excerpt:
      "Az egyházmegye presbiterei közös konferencián vettek részt, ahol a gyülekezeti szolgálat és a közösségépítés kérdéseit tárgyalták.",
    body: [
      "Az egyházmegye gyülekezeteinek presbiterei közös konferencián találkoztak. A nap során előadások hangzottak el a presbiteri szolgálat felelősségéről és a gyülekezetépítés gyakorlati kérdéseiről.",
      "A délutáni műhelymunkák során a résztvevők tapasztalatot cseréltek a gyülekezeti élet kihívásairól és a megújulás lehetőségeiről.",
    ],
    coverImage: life.lecture,
  },
  {
    id: "5",
    slug: "korosfoi-varrottas-kiallitas",
    title: "Kalotaszegi varrottas kiállítás nyílt Körösfőn",
    category: "Tudósítás",
    date: "2026-04-15",
    author: "Nőszövetség",
    excerpt:
      "A körösfői gyülekezeti házban a kalotaszegi varrottas hagyományát bemutató kiállítás nyílt a nőszövetség szervezésében.",
    body: [
      "A körösfői gyülekezeti házban a kalotaszegi varrottas hagyományát bemutató kiállítás nyílt meg. A tárlat a régió híres írásos és vagdalásos hímzéseiből mutat be válogatást.",
      "A kiállítás a nőszövetség szervezésében jött létre, és a nyár folyamán látogatható.",
    ],
    coverImage: ch.stainedGlass,
    congregationSlug: "korosfo",
  },
  {
    id: "6",
    slug: "ifjusagi-enekkar-szolgalat",
    title: "Az egyházmegyei ifjúsági énekkar szolgálata",
    category: "Ifjúság",
    date: "2026-03-30",
    author: "Ifjúsági Bizottság",
    excerpt:
      "Az egyházmegyei ifjúsági énekkar több gyülekezetben szolgált a böjti időszakban, erősítve a fiatalok közötti közösséget.",
    body: [
      "A böjti időszakban az egyházmegyei ifjúsági énekkar több gyülekezetben szolgált. A fiatalok énekükkel és bizonyságtételükkel gazdagították az istentiszteleteket.",
      "A szolgálat nemcsak a gyülekezeteket építette, hanem a fiatalok közötti közösséget is erősítette.",
    ],
    coverImage: life.microphone,
  },
];

/** @deprecated Használja a `@/lib/content/news` modult. */
export function getNewsBySlugFromSeed(slug: string): NewsItem | undefined {
  return seedNews.find((n) => n.slug === slug);
}
