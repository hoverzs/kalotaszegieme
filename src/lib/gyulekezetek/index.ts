import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/gyulekezetek");

export interface CongregationHistory {
  title: string;
  content: string;
}

/** Gyülekezeti történeti szöveg markdown fájlból (`content/gyulekezetek/{slug}.md`). */
export function getCongregationHistory(slug: string): CongregationHistory | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    title: String(data.title ?? "Rövid történet"),
    content: content.trim(),
  };
}
