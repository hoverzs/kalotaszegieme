import Image from "next/image";
import Link from "next/link";
import { localImages } from "@/data/images";
import { siteConfig } from "@/lib/site";

const sizeClasses = {
  nav: "h-10 w-10 sm:h-11 sm:w-11",
  compact: "h-14 w-14 sm:h-16 sm:w-16",
  default: "h-20 w-20 sm:h-24 sm:w-24",
} as const;

/** Egyházmegyei pecsét – navigációhoz és lábléchez. */
export function Logo({
  variant = "dark",
  size = "default",
}: {
  variant?: "dark" | "light";
  size?: keyof typeof sizeClasses;
}) {
  return (
    <Link href="/" className="group block shrink-0" aria-label={siteConfig.name}>
      <Image
        src={localImages.egyhazmegyeLogo}
        alt={siteConfig.name}
        width={512}
        height={512}
        unoptimized
        className={`${sizeClasses[size]} rounded-full object-cover transition-opacity group-hover:opacity-90 ${
          variant === "light" ? "brightness-110" : ""
        }`}
      />
    </Link>
  );
}
