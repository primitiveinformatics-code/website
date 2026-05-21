import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

const FALLBACK = [
  { id: 1, name: "Technical" }, { id: 2, name: "Behavioral" },
  { id: 3, name: "Soft Skills" }, { id: 4, name: "Career Growth" }, { id: 5, name: "Industry Insights" },
];

export async function GET(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await pool.query("SELECT * FROM resource_categories ORDER BY name");
    return NextResponse.json({ categories: result.rows });
  } catch {
    return NextResponse.json({ categories: FALLBACK });
  }
}

export async function POST(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
  try {
    const result = await pool.query(
      "INSERT INTO resource_categories (name) VALUES ($1) RETURNING *",
      [name.trim()]
    );
    return NextResponse.json({ category: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Category already exists or DB unavailable" }, { status: 409 });
  }
}
