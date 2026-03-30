import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const result = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = $1 AND published = true",
      [slug]
    );
    if (result.rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
