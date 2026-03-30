import { NextResponse } from "next/server";
import pool from "@/lib/db";

const SAMPLE_PLAYLISTS = [
  { id: 1, name: "System Design Masterclass", description: "End-to-end system design interview preparation covering distributed systems, databases, caching, and more.", type: "video", cover_image: null, created_at: new Date().toISOString() },
  { id: 2, name: "DSA Crash Course", description: "Data structures and algorithms from scratch — arrays, trees, graphs, dynamic programming and beyond.", type: "video", cover_image: null, created_at: new Date().toISOString() },
  { id: 3, name: "Career Growth Podcast", description: "Insights from industry leaders on career acceleration, salary negotiation, and breaking into top tech companies.", type: "podcast", cover_image: null, created_at: new Date().toISOString() },
];

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM playlists ORDER BY created_at DESC"
    );
    return NextResponse.json({ playlists: result.rows });
  } catch {
    return NextResponse.json({ playlists: SAMPLE_PLAYLISTS });
  }
}
