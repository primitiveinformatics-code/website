import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { playlistId, youtubeUrl, title, description } = body;

  // Extract YouTube ID from URL
  const match = youtubeUrl?.match(/(?:v=|youtu\.be\/|embed\/)([^&\n?#]+)/);
  const youtubeId = match?.[1];
  if (!youtubeId) return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });

  const thumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  try {
    const result = await pool.query(
      "INSERT INTO playlist_items (playlist_id, youtube_id, title, description, thumbnail) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [playlistId, youtubeId, title || "Untitled", description || "", thumbnail]
    );
    return NextResponse.json({ item: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "DB unavailable" }, { status: 503 });
  }
}
