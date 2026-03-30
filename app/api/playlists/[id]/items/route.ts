import { NextResponse } from "next/server";
import pool from "@/lib/db";

const SAMPLE_ITEMS: Record<number, Array<{ id: number; playlist_id: number; youtube_id: string; title: string; description: string; thumbnail: string; duration: string; position: number }>> = {
  1: [
    { id: 1, playlist_id: 1, youtube_id: "i7twT3x5yv8", title: "System Design Introduction", description: "Learn the fundamentals of system design interviews.", thumbnail: "https://img.youtube.com/vi/i7twT3x5yv8/hqdefault.jpg", duration: "25:00", position: 0 },
    { id: 2, playlist_id: 1, youtube_id: "quLrc3PbuIg", title: "Designing a URL Shortener", description: "Step-by-step design of a URL shortening service like bit.ly.", thumbnail: "https://img.youtube.com/vi/quLrc3PbuIg/hqdefault.jpg", duration: "32:00", position: 1 },
  ],
  2: [
    { id: 3, playlist_id: 2, youtube_id: "RBSGKlAvoiM", title: "Arrays and Strings", description: "Master array manipulation and string problems.", thumbnail: "https://img.youtube.com/vi/RBSGKlAvoiM/hqdefault.jpg", duration: "40:00", position: 0 },
    { id: 4, playlist_id: 2, youtube_id: "9rhT3P1MDHk", title: "Trees and Graphs", description: "Deep dive into tree traversals and graph algorithms.", thumbnail: "https://img.youtube.com/vi/9rhT3P1MDHk/hqdefault.jpg", duration: "45:00", position: 1 },
  ],
  3: [
    { id: 5, playlist_id: 3, youtube_id: "dQw4w9WgXcQ", title: "Negotiating Your Salary at FAANG", description: "Real strategies from engineers who doubled their compensation.", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", duration: "55:00", position: 0 },
  ],
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const playlistId = parseInt(id, 10);

  try {
    const result = await pool.query(
      "SELECT * FROM playlist_items WHERE playlist_id = $1 ORDER BY position ASC",
      [playlistId]
    );
    return NextResponse.json({ items: result.rows });
  } catch {
    const fallback = SAMPLE_ITEMS[playlistId] || [];
    return NextResponse.json({ items: fallback });
  }
}
