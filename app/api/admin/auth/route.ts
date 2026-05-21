import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminEmail || !adminPassword || !adminToken) {
    return NextResponse.json(
      { error: "Admin credentials not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_TOKEN in environment variables." },
      { status: 503 }
    );
  }

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ ok: true, token: adminToken });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
