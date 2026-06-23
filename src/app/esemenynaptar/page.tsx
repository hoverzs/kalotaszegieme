import { redirect } from "next/navigation";

/** Régi URL – átirányítás az új eseményoldalra. */
export default function EsemenynaptarRedirect() {
  redirect("/esemenyek");
}
