import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/auth/admin";

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Nincs jogosultság." }, { status: 401 });
}

export function requireAdminSession(): NextResponse | null {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!verifyAdminSession(token)) {
    return unauthorizedResponse();
  }
  return null;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function newId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
