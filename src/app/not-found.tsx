import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow mb-4">
        <span className="h-px w-6 bg-gold-500" />
        404
      </span>
      <h1 className="font-serif text-4xl font-semibold text-graphite-900 sm:text-5xl">
        Az oldal nem található
      </h1>
      <p className="mt-4 max-w-md text-graphite-500">
        A keresett oldal nem létezik vagy áthelyezésre került. Térjen vissza a főoldalra,
        és onnan tájékozódjon tovább.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Vissza a főoldalra
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}
