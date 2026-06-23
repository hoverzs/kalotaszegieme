import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/api";
import { ensureContentDirs } from "@/lib/content/store";

export async function POST(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const slug = String(form.get("slug") ?? "").trim();

  if (!(file instanceof File) || !slug) {
    return NextResponse.json({ error: "Fájl és slug kötelező." }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase() || ".png";
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    return NextResponse.json({ error: "Csak PNG/JPG/WEBP tölthető fel." }, { status: 400 });
  }

  await ensureContentDirs();
  const filename = `${slug}${ext === ".jpeg" ? ".jpg" : ext}`;
  const dest = path.join(process.cwd(), "public/images/congregations", filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(dest, buffer);

  const url = `/images/congregations/${filename}`;
  revalidatePath("/gyulekezetek");
  revalidatePath(`/gyulekezetek/${slug}`);

  return NextResponse.json({ url, filename });
}
