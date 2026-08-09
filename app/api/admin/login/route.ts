import { NextResponse } from "next/server";
import { verifyAdminLogin, logAdminActivity } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const isValid = verifyAdminLogin(username, password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid email/username or password" }, { status: 401 });
    }

    logAdminActivity(`Admin logged in successfully (${username})`);

    const response = NextResponse.json({ success: true, message: "Logged in successfully ❤️" });
    
    // Set HTTP-only session cookie
    response.cookies.set("admin_auth", "authenticated_satyam_token_2026", {
      httpOnly: true,
      secure: false, // Set true in HTTPS prod
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
