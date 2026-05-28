import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function auth(req: NextRequest) {
  if (!ADMIN_TOKEN) return false;
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  return token === ADMIN_TOKEN;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const result = await pool.query(
    "SELECT id, email, full_name, status, created_at FROM interactive_content_users ORDER BY created_at DESC"
  );
  return NextResponse.json({ users: result.rows });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email, password, full_name, status = "active" } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      `INSERT INTO interactive_content_users (email, password_hash, full_name, status)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name, status, created_at`,
      [email.toLowerCase().trim(), passwordHash, full_name || null, status]
    );
    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "23505") {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
    }
    throw err;
  }
}
