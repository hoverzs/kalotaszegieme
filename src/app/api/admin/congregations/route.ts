import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCongregations, updateCongregation } from "@/lib/content/congregations";
import { requireAdminSession } from "@/lib/auth/api";

export async function GET() {
  const denied = requireAdminSession();
  if (denied) return denied;
  const list = await getCongregations();
  return NextResponse.json(list);
}

export async function PUT(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as {
    slug: string;
    patch: Record<string, unknown>;
  };

  if (!body.slug) {
    return NextResponse.json({ error: "Hiányzó slug." }, { status: 400 });
  }

  const updated = await updateCongregation(body.slug, body.patch);
  if (!updated) {
    return NextResponse.json({ error: "Nem található gyülekezet." }, { status: 404 });
  }

  revalidatePath("/gyulekezetek");
  revalidatePath(`/gyulekezetek/${body.slug}`);
  revalidatePath("/cimtar");
  revalidatePath("/terkep");
  revalidatePath("/egyhazmegye");
  revalidatePath("/");

  return NextResponse.json(updated);
}
