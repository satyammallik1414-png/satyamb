import { NextResponse } from "next/server";
import { getSettings, updateSettings, logAdminActivity } from "@/lib/db";
import { cookies } from "next/headers";

async function isAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_auth")?.value;
  return token === "authenticated_satyam_token_2026";
}

export async function GET() {
  if (!(await isAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  if (!(await isAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const action = body.action || "Updated website settings";
    delete body.action;

    const updated = updateSettings(body);
    logAdminActivity(action);

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
