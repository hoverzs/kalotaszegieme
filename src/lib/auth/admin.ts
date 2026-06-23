/** Admin munkamenet – egyszerű jelszó + fix token (Edge-kompatibilis ellenőrzés). */

export function isAdminPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export function getAdminSessionToken(): string {
  return process.env.ADMIN_SESSION_TOKEN ?? "";
}

export function verifyAdminSession(token: string | undefined): boolean {
  const expected = getAdminSessionToken();
  if (!expected || !token) return false;
  return token === expected;
}

export const ADMIN_COOKIE = "admin_session";

export function adminCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
