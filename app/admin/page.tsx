import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminRootPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;

  if (token === "authenticated_satyam_token_2026") {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
