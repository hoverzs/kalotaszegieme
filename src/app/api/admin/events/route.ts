import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "@/lib/content/events";
import { requireAdminSession, newId, slugify } from "@/lib/auth/api";
import type { EventItem } from "@/data/types";

export async function GET() {
  const denied = requireAdminSession();
  if (denied) return denied;
  return NextResponse.json(await getEvents());
}

export async function POST(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as Partial<EventItem>;
  if (!body.title || !body.date) {
    return NextResponse.json({ error: "Cím és dátum kötelező." }, { status: 400 });
  }

  const slug = body.slug || slugify(body.title);
  const item: EventItem = {
    id: newId(),
    slug,
    title: body.title,
    date: body.date,
    startTime: body.startTime,
    endTime: body.endTime,
    location: body.location ?? "",
    organizer: body.organizer,
    category: body.category ?? "Egyházmegyei esemény",
    description: body.description ?? "",
    image: body.image,
    featured: body.featured ?? false,
  };

  await createEvent(item);
  revalidatePaths();
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const body = (await request.json()) as { id: string; patch: Partial<EventItem> };
  if (!body.id) {
    return NextResponse.json({ error: "Hiányzó id." }, { status: 400 });
  }

  const updated = await updateEvent(body.id, body.patch);
  if (!updated) {
    return NextResponse.json({ error: "Nem található esemény." }, { status: 404 });
  }

  revalidatePaths();
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const denied = requireAdminSession();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Hiányzó id." }, { status: 400 });
  }

  const ok = await deleteEvent(id);
  if (!ok) {
    return NextResponse.json({ error: "Nem található esemény." }, { status: 404 });
  }

  revalidatePaths();
  return NextResponse.json({ ok: true });
}

function revalidatePaths() {
  revalidatePath("/");
  revalidatePath("/esemenyek");
}
