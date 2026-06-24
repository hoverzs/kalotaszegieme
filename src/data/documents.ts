import type { DocumentItem } from "./types";

/** Dokumentumok – új elemek ide kerülnek, amint feltöltésre kerülnek. */
export const documents: DocumentItem[] = [];

export const documentCategories = [
  "Körlevelek",
  "Űrlapok",
  "Szabályzatok",
  "Konferenciaanyagok",
] as const;
