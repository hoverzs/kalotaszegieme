import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { EventsManager } from "@/components/admin/EventsManager";
import { getEvents } from "@/lib/content/events";

export const metadata: Metadata = {
  title: "Események – Admin",
  robots: { index: false, follow: false },
};

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <AdminShell>
      <div>
        <h1 className="font-serif text-3xl font-semibold text-graphite-900">Események</h1>
        <p className="mt-2 text-sm text-graphite-500">
          Közelgő események kezelése a főoldal és az események oldal számára.
        </p>
        <div className="mt-6">
          <EventsManager initialEvents={events} />
        </div>
      </div>
    </AdminShell>
  );
}
