import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String).filter(Boolean);
  if (typeof tags === "string") return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { title, slug, excerpt, content, author, tags, published } = await req.json();
  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  const tagsArray = parseTags(tags);
  const isPublished = published === true;
  try {
    const result = await pool.query(
      `UPDATE blog_posts
       SET title=$1, slug=$2, excerpt=$3, content=$4, author=$5, tags=$6, published=$7,
           published_at = CASE WHEN $7=true AND published_at IS NULL THEN NOW() ELSE published_at END,
           updated_at = NOW()
       WHERE id=$8 RETURNING *`,
      [title.trim(), slug.trim(), excerpt || "", content || "", author || "Primitive Informatics",
       tagsArray, isPublished, parseInt(id)]
    );
    if (result.rowCount === 0) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ post: result.rows[0] });
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "23505") {
      return NextResponse.json({ error: "Slug already exists — choose a unique slug" }, { status: 409 });
    }
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await pool.query("DELETE FROM blog_posts WHERE id = $1", [parseInt(id)]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
