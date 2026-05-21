import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await pool.query("DELETE FROM resource_categories WHERE id = $1", [parseInt(id)]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
