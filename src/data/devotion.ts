import type { Devotion } from "./types";

/**
 * Mai áhítat.
 *
 * FORRÁS / INTEGRÁCIÓ:
 * A „Mai áhítat” blokk az ÁhítApp admin felületén naponta létrejövő
 * Facebook-poszt szövegét (`facebookText`) jeleníti meg – a honlap nem
 * generál külön tartalmat. Jelenleg ez statikus minta; a valós bekötéskor
 * elég ezt az egy helyet módosítani (pl. JSON-végpont, megosztott Supabase
 * tábla vagy Facebook Graph API alapján feltölteni a `facebookText` mezőt).
 *
 * Az `appUrl` a külső ÁhítApp / Facebook-bejegyzésre mutató link.
 */
export const todayDevotion: Devotion = {
  date: new Date().toISOString().slice(0, 10),
  reference: "Zsoltárok 23,1",
  verse: "Az Úr az én pásztorom, nem szűkölködöm.",
  thought:
    "A pásztor gondoskodik a nyájáról – ismeri, vezeti és megőrzi. Ebben a bizonyosságban indulhatunk útnak ma is: nem a magunk erejére, hanem az Ő hűségére támaszkodva. Aki Vele jár, az közösségben él, és békességet talál.",
  // Az ÁhítApp által generált Facebook-poszt szövege (minta – a tényleges
  // szöveg a napi bejegyzésből érkezik majd, a sortörésekkel együtt).
  facebookText:
    "📖 Mai ige – Zsoltárok 23,1\n„Az Úr az én pásztorom, nem szűkölködöm.”\n\nA pásztor gondoskodik a nyájáról – ismeri, vezeti és megőrzi. Ebben a bizonyosságban indulhatunk útnak ma is: nem a magunk erejére, hanem az Ő hűségére támaszkodva. Aki Vele jár, az közösségben él, és békességet talál.\n\n#áhítat #ÁhítApp #Kalotaszeg",
  author: "ÁhítApp",
  appUrl: "https://www.ahitapp.ro",
};

/**
 * Az ÁhítApp napi végpontjának URL-je (környezeti változóból).
 * Állítsd be a `.env.local`-ban vagy a Vercel környezeti változói közt:
 *   AHITAPP_DEVOTION_URL="https://.../napi-ahitat.json"
 *
 * Várt JSON-formátum (a mezőnevek rugalmasan kezeltek):
 *   {
 *     "date": "2026-06-11",
 *     "text": "A napi Facebook-poszt teljes szövege, sortörésekkel...",
 *     "url": "https://www.facebook.com/.../posts/..."
 *   }
 * A `text` helyett elfogadott: `facebookText`, `post`, `message`;
 * a `url` helyett: `link`, `appUrl`.
 */
const DEVOTION_URL = process.env.AHITAPP_DEVOTION_URL;

interface RemoteDevotion {
  date?: string;
  text?: string;
  facebookText?: string;
  post?: string;
  message?: string;
  url?: string;
  link?: string;
  appUrl?: string;
  reference?: string;
  verse?: string;
  thought?: string;
  author?: string;
}

/**
 * A „Mai áhítat” blokkhoz használt napi tartalom.
 *
 * Ha be van állítva az `AHITAPP_DEVOTION_URL`, a függvény szerver oldalon
 * lekéri az ÁhítApp napi Facebook-szövegét, és azt jeleníti meg. Bármilyen
 * hiba (hiányzó URL, hálózati hiba, üres válasz) esetén a statikus mintára
 * esik vissza, így az oldal mindig megjeleníthető marad.
 */
export async function getDailyDevotion(): Promise<Devotion> {
  if (!DEVOTION_URL) return todayDevotion;

  try {
    // 30 percenként frissül (a napi szöveg napközbeni közzétételéhez igazítva).
    const res = await fetch(DEVOTION_URL, { next: { revalidate: 1800 } });
    if (!res.ok) return todayDevotion;

    const data = (await res.json()) as RemoteDevotion;
    const facebookText =
      data.facebookText ?? data.text ?? data.post ?? data.message ?? "";
    if (facebookText.trim() === "") return todayDevotion;

    return {
      date: data.date ?? new Date().toISOString().slice(0, 10),
      reference: data.reference ?? todayDevotion.reference,
      verse: data.verse ?? todayDevotion.verse,
      thought: data.thought ?? todayDevotion.thought,
      facebookText,
      author: data.author ?? "ÁhítApp",
      appUrl: data.url ?? data.link ?? data.appUrl ?? todayDevotion.appUrl,
    };
  } catch {
    return todayDevotion;
  }
}
