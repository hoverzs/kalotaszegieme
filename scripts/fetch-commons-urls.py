"""Fetch verified Wikimedia Commons thumbnail URLs (slug -> URL)."""
import json
import time
import urllib.parse
import urllib.request

UA = "KalotaszegChurchBot/1.0 (EMEOLDAL research)"
FILES = {
    "bogartelke": "BagaraCJ (2).JPG",
    "farnas": "Biserica reformată din Sfâraș.jpg",
    "gyerovasarhely": "DumbravaCJ (10).JPG",
    "inaktelke": "InucuCJ (3).JPG",
    "kalotaszentkiraly": "SancraiuCJ (1).JPG",
    "ketesd": "Biserica reformată din Tetișu.jpg",
    "korosfo": "Biserica reformată din Izvoru Crișului.jpg",
    "magyargyeromonostor": "RO CJ Biserica reformat din Manastireni (4).jpg",
    "magyarlona": "Biserica reformată din Luna de Sus.jpg",
    "magyarvista": "RO CJ Biserica reformata din Vistea (1).jpg",
    "nadasdaroc": "Biserica reformată din Dorolțu.jpg",
    "nagypetri": "Biserica reformată din Petrindu.jpg",
    "varalmas": "Biserica reformată din Almașu.jpg",
    "zsobok": "Jebucu church.jpg",
    "magyarokerek": "Biserica reformată din Alunișu.jpg",
    "sztana": "Sztánai református templom (Nagy Béla).jpg",
}


def fetch_thumb(filename: str):
    title = "File:" + filename
    q = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url",
            "iiurlwidth": "1200",
            "format": "json",
        }
    )
    url = "https://commons.wikimedia.org/w/api.php?" + q
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=25) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    page = next(iter(data["query"]["pages"].values()))
    if "missing" in page:
        return None
    info = page.get("imageinfo", [{}])[0]
    return info.get("thumburl") or info.get("url")


def main():
    out = {}
    for slug, fn in FILES.items():
        time.sleep(1.2)
        try:
            url = fetch_thumb(fn)
            if url:
                out[slug] = url
                print("OK", slug)
            else:
                print("MISS", slug)
        except Exception as exc:
            print("ERR", slug, exc)
    with open("commons-urls.json", "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print("WROTE", len(out), "urls")


if __name__ == "__main__":
    main()
