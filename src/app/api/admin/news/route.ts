import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createNewsItem,
  deleteNewsItem,
  getNews,
  updateNewsItem,
} from "@/lib/content/news";
import { requireAdminSession, newId, slugify } from "@/lib/auth/api";
import type { NewsItem } from "@/data/types";

export async function GET() {
  const denied = requireAdminSession();
  if (denied) return denied;
  return NextResponse.json(await getNews());
}

export async function POST(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as Partial<NewsItem>;
  if (!body.title || !body.date) {
    return NextResponse.json({ error: "Cím és dátum kötelező." }, { status: 400 });
  }

  const slug = body.slug || slugify(body.title);
  const item: NewsItem = {
    id: newId(),
    slug,
    title: body.title,
    category: body.category ?? "Hír",
    date: body.date,
    author: body.author,
    excerpt: body.excerpt ?? "",
    body: body.body ?? [body.excerpt ?? ""],
    coverImage: body.coverImage ?? "",
    congregationSlug: body.congregationSlug,
  };

  await createNewsItem(item);
  revalidatePaths();
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as {
    slug: string;
    patch: Partial<NewsItem> & { body?: string | string[] };
  };
  if (!body.slug) {
    return NextResponse.json({ error: "Hiányzó slug." }, { status: 400 });
  }

  const { body: bodyField, ...restPatch } = body.patch;
  const patch: Partial<NewsItem> = { ...restPatch };
  if (typeof bodyField === "string") {
    patch.body = bodyField.split("\n\n").filter(Boolean);
  } else if (bodyField) {
    patch.body = bodyField;
  }

  const updated = await updateNewsItem(body.slug, patch);
  if (!updated) {
    return NextResponse.json({ error: "Nem található hír." }, { status: 404 });
  }

  revalidatePaths();
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Hiányzó slug." }, { status: 400 });
  }

  const ok = await deleteNewsItem(slug);
  if (!ok) {
    return NextResponse.json({ error: "Nem található hír." }, { status: 404 });
  }

  revalidatePaths();
  return NextResponse.json({ ok: true });
}

function revalidatePaths() {
  revalidatePath("/");
  revalidatePath("/hirek");
}
