import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function auth(req: NextRequest) {
  if (!ADMIN_TOKEN) return false;
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  return token === ADMIN_TOKEN;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (body.status !== undefined) { fields.push(`status = $${idx++}`); values.push(body.status); }
  if (body.full_name !== undefined) { fields.push(`full_name = $${idx++}`); values.push(body.full_name); }
  if (body.password) {
    const hash = await bcrypt.hash(body.password, 12);
    fields.push(`password_hash = $${idx++}`);
    values.push(hash);
  }
  if (fields.length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await pool.query(
    `UPDATE interactive_content_users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING id, email, full_name, status`,
    values
  );
  if (result.rowCount === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ user: result.rows[0] });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await pool.query("DELETE FROM interactive_content_users WHERE id = $1", [id]);
  return NextResponse.json({ success: true });
}
