# Kalotaszegi Református Egyházmegye – egyházmegyei portál

Prémium megjelenésű, hagyományos református hangulatú egyházmegyei honlap a
**Kalotaszegi Református Egyházmegye** számára. Ez az első, **statikus prototípus**
verzió: látványos, kattintható és bemutatható, később pedig könnyen
továbbfejleszthető adatbázis-alapú (Supabase), adminfelületes portállá.

> **Mottó:** „Hitben járva, közösségben élve”

## Technológia

- [Next.js 14](https://nextjs.org/) – App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Komponensalapú felépítés, statikus mintaadatok

## Indítás

```bash
npm install
npm run dev
```

A fejlesztői szerver a [http://localhost:3000](http://localhost:3000) címen érhető el.

Production build:

```bash
npm run build
npm run start
```

## Projektstruktúra

```
src/
├── app/                     # App Router oldalak
│   ├── page.tsx             # Főoldal
│   ├── egyhazmegye/         # Az egyházmegye
│   ├── elerhetoseg/         # Elérhetőség
│   ├── cimtar/              # Címtár
│   ├── gyulekezetek/        # Gyülekezetek lista + [slug] adatlap
│   ├── terkep/              # Térkép (placeholder, Leafletre előkészítve)
│   ├── esemenynaptar/       # Eseménynaptár (Google Calendar hely)
│   ├── hirek/               # Hírek lista + [slug] híroldal
│   ├── ahitatok/            # Áhítatok (előnézet + külső ÁhítApp link)
│   ├── templomgaleria/      # Templomgaléria
│   ├── dokumentumtar/       # Dokumentumtár
│   └── media/               # Média
├── components/              # Újrafelhasználható komponensek
│   ├── Header, Footer, Hero, SectionTitle, PageHeader
│   ├── CongregationCard, NewsCard, EventCard, DevotionCard
│   ├── MapPreview, GalleryGrid, ContactBlock, Badge, Logo, Icons
│   └── *List / *Table        # kliensoldali kereső/szűrő komponensek
├── data/                    # Statikus mintaadatok + típusok
│   ├── types.ts
│   ├── congregations.ts     # latitude/longitude mezőkkel
│   ├── news.ts
│   ├── events.ts
│   ├── documents.ts
│   ├── media.ts
│   └── devotion.ts
└── lib/
    └── site.ts              # navigáció, oldalbeállítások, dátumformázás
```

## Dizájn

- Színek: **törtfehér** (cream), **mély bordó** (burgundy), **arany** (gold),
  **sötét grafit** (graphite) – a `tailwind.config.ts`-ben definiálva.
- Tipográfia: Cormorant Garamond (serif címek) + Inter (szövegtörzs).
- Visszafogott kalotaszegi motívum (`.motif-divider`), nagy fehér terek,
  kártyás elrendezés, teljesen reszponzív.

## Tudatos korlátozások (prototípus)

- Nincs adatbázis – minden adat a `src/data/` fájlokból jön.
- Nincs admin felület.
- **Nincs semmilyen AI API** (sem Gemini, sem OpenAI).
- Az áhítatok kizárólag **előnézetként / külső linkként** (ÁhítApp) jelennek meg.

## Későbbi fejlesztési irány (Supabase felé)

- A `src/data/types.ts` típusai szándékosan sor-modell jellegűek, így egy
  Supabase tábla közvetlenül megfeleltethető nekik.
- A `getCongregationBySlug`, `getNewsBySlug` stb. segédfüggvények egy
  adatelérési réteggé (data access layer) absztrahálhatók, amely később
  Supabase-lekérdezéseket hív.
- A `MapPreview` komponens prop-felülete (gyülekezetek lat/lng-vel) változatlanul
  megtartható egy valódi OpenStreetMap + Leaflet megjelenítésnél.
- Az eseménynaptárba Google Calendar beágyazás illeszthető a meglévő helyre.

## Deploy

A projekt [Vercel](https://vercel.com/) platformra optimalizált.
Tervezett saját domain: **kalotaszegieme.ro**.
