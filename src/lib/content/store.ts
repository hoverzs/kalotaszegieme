import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export async function ensureContentDirs(): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(path.join(process.cwd(), "public/images/congregations"), {
    recursive: true,
  });
}

export async function readContentJson<T>(
  filename: string,
  seed: () => Promise<T>,
): Promise<T> {
  await ensureContentDirs();
  const filePath = path.join(CONTENT_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    const initial = await seed();
    await writeContentJson(filename, initial);
    return initial;
  }
}

export async function writeContentJson<T>(filename: string, data: T): Promise<void> {
  await ensureContentDirs();
  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}
