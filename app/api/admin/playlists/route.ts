import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

export async function POST(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, description, type } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  try {
    const result = await pool.query(
      "INSERT INTO playlists (name, description, type) VALUES ($1, $2, $3) RETURNING *",
      [name.trim(), description || "", type === "podcast" ? "podcast" : "video"]
    );
    return NextResponse.json({ playlist: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
