import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  getAdminSessionToken,
  isAdminPasswordValid,
} from "@/lib/auth/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password ?? "";

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Az ADMIN_PASSWORD nincs beállítva a szerveren." },
      { status: 500 },
    );
  }

  if (!process.env.ADMIN_SESSION_TOKEN) {
    return NextResponse.json(
      { error: "Az ADMIN_SESSION_TOKEN nincs beállítva a szerveren." },
      { status: 500 },
    );
  }

  if (!isAdminPasswordValid(password)) {
    return NextResponse.json({ error: "Hibás jelszó." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_COOKIE,
    getAdminSessionToken(),
    adminCookieOptions(process.env.NODE_ENV === "production"),
  );
  return response;
}
