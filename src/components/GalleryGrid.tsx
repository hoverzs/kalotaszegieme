import Image from "next/image";
import Link from "next/link";

export interface GalleryImage {
  src: string;
  /** Felirat (pl. településnév). */
  caption?: string;
  /** Másodlagos felirat (pl. gyülekezet neve). */
  subcaption?: string;
  /** Kattintásra ide vezet (pl. gyülekezeti adatlap). */
  href?: string;
}

export function GalleryGrid({
  images,
  columns = 3,
}: {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-4 ${cols}`}>
      {images.map((img, i) => {
        const inner = (
          <>
            <Image
              src={img.src}
              alt={img.caption ?? "Templomfotó"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/70 via-graphite-900/10 to-transparent" />
            {(img.caption || img.subcaption) && (
              <div className="absolute inset-x-0 bottom-0 p-4">
                {img.caption && (
                  <p className="font-serif text-lg font-semibold text-cream-50">{img.caption}</p>
                )}
                {img.subcaption && (
                  <p className="text-xs text-cream-100/80">{img.subcaption}</p>
                )}
              </div>
            )}
          </>
        );

        const className =
          "group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-cream-300/50 shadow-card transition-shadow hover:shadow-card-hover";

        return img.href ? (
          <Link key={i} href={img.href} className={className}>
            {inner}
          </Link>
        ) : (
          <div key={i} className={className}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
