import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Tudositas, TudositasFrontmatter, TudositasSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/tudositasok");
const IMAGE_DIR = "/images/tudositasok";

function resolveCoverImage(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("/") || trimmed.startsWith("http")) return trimmed;
  return `${IMAGE_DIR}/${trimmed.replace(/^\/+/, "")}`;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/i, "");
}

function parseFile(filename: string): Tudositas | null {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Partial<TudositasFrontmatter>;

  if (!fm.title || !fm.date) return null;

  return {
    slug: slugFromFilename(filename),
    title: String(fm.title),
    date: String(fm.date),
    location: String(fm.location ?? ""),
    category: String(fm.category ?? "Tudósítás"),
    excerpt: String(fm.excerpt ?? ""),
    coverImage: resolveCoverImage(String(fm.coverImage ?? "")),
    content: content.trim(),
  };
}

function readAll(): Tudositas[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => /\.mdx?$/i.test(name))
    .map(parseFile)
    .filter((item): item is Tudositas => item !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function toSummary(item: Tudositas): TudositasSummary {
  const { content: _content, ...summary } = item;
  return summary;
}

/** Összes tudósítás időrendben (legújabb elöl). */
export function getAllTudositasok(): TudositasSummary[] {
  return readAll().map(toSummary);
}

/** Legfrissebb N tudósítás – főoldalhoz. */
export function getLatestTudositasok(limit = 3): TudositasSummary[] {
  return getAllTudositasok().slice(0, limit);
}

/** Egy tudósítás slug alapján. */
export function getTudositasBySlug(slug: string): Tudositas | null {
  const md = `${slug}.md`;
  const mdx = `${slug}.mdx`;
  const filename = fs.existsSync(path.join(CONTENT_DIR, md))
    ? md
    : fs.existsSync(path.join(CONTENT_DIR, mdx))
      ? mdx
      : null;

  if (!filename) return null;
  return parseFile(filename);
}

function normalizeLocation(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

/** Település / helyszín alapján kapcsolódó tudósítások (gyülekezeti oldalhoz). */
export function getTudositasokByLocation(settlement: string): TudositasSummary[] {
  const target = normalizeLocation(settlement);
  if (!target) return [];

  return getAllTudositasok().filter((item) => {
    if (!item.location) return false;
    const loc = normalizeLocation(item.location);
    return loc === target || loc.includes(target) || target.includes(loc);
  });
}

/** Statikus útvonalgeneráláshoz. */
export function getAllTudositasSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => /\.mdx?$/i.test(name))
    .map(slugFromFilename);
}
