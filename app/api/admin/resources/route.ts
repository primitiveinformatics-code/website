import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

export async function GET(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await pool.query(
      `SELECT r.id, r.title, r.description, r.gdrive_url, r.published, r.created_at,
              c.name AS category, c.id AS category_id
       FROM resources r
       LEFT JOIN resource_categories c ON r.category_id = c.id
       ORDER BY r.created_at DESC`
    );
    return NextResponse.json({ resources: result.rows });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description, category_id, gdrive_url, published } = await req.json();
  if (!title?.trim() || !gdrive_url?.trim()) {
    return NextResponse.json({ error: "Title and Google Drive URL are required" }, { status: 400 });
  }
  try {
    const result = await pool.query(
      "INSERT INTO resources (title, description, category_id, gdrive_url, published) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [title.trim(), description || "", category_id || null, gdrive_url.trim(), published !== false]
    );
    return NextResponse.json({ resource: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
