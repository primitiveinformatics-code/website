import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateAdminRequest } from "@/lib/adminAuth";

export async function GET(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await pool.query(
      "SELECT id, slug, title, excerpt, content, author, tags, published, published_at, created_at FROM blog_posts ORDER BY created_at DESC"
    );
    return NextResponse.json({ posts: result.rows });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}

function parseTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String).filter(Boolean);
  if (typeof tags === "string") return tags.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

export async function POST(req: Request) {
  if (!validateAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, slug, excerpt, content, author, tags, published } = await req.json();
  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }
  const tagsArray = parseTags(tags);
  const isPublished = published === true;
  try {
    const result = await pool.query(
      `INSERT INTO blog_posts (slug, title, excerpt, content, author, tags, published, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [slug.trim(), title.trim(), excerpt || "", content || "", author || "Primitive Informatics",
       tagsArray, isPublished, isPublished ? new Date() : null]
    );
    return NextResponse.json({ post: result.rows[0] });
  } catch (err: unknown) {
    if ((err as { code?: string })?.code === "23505") {
      return NextResponse.json({ error: "Slug already exists — choose a unique slug" }, { status: 409 });
    }
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
