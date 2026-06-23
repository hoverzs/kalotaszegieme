/** Markdown tudósítás metaadatok (frontmatter). */
export interface TudositasFrontmatter {
  title: string;
  date: string;
  location: string;
  category: string;
  excerpt: string;
  coverImage: string;
}

/** Teljes tudósítás a markdown törzs szövegével. */
export interface Tudositas extends TudositasFrontmatter {
  slug: string;
  content: string;
}

/** Lista és kártyák – a törzs nélkül. */
export type TudositasSummary = Omit<Tudositas, "content">;
