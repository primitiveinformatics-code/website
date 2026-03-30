import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, slug, title, excerpt, author, tags, cover_image, published_at FROM blog_posts WHERE published = true ORDER BY published_at DESC LIMIT 10"
    );
    return NextResponse.json({ posts: result.rows });
  } catch {
    // Return sample data if DB not connected
    return NextResponse.json({ posts: SAMPLE_POSTS });
  }
}

const SAMPLE_POSTS = [
  { id: 1, slug: "mastering-system-design-interviews", title: "Mastering System Design Interviews in 2025", excerpt: "A comprehensive guide to approaching system design questions with confidence. Learn the frameworks top engineers use.", author: "Primitive Informatics", tags: ["System Design", "Interview Prep"], published_at: new Date(Date.now() - 5*86400000).toISOString() },
  { id: 2, slug: "top-dsa-patterns-for-interviews", title: "Top 10 DSA Patterns Every Developer Must Know", excerpt: "From sliding window to dynamic programming — these patterns appear in 80% of coding interviews.", author: "Primitive Informatics", tags: ["DSA", "Algorithms"], published_at: new Date(Date.now() - 10*86400000).toISOString() },
  { id: 3, slug: "behavioral-interview-star-method", title: "The STAR Method: Ace Every Behavioral Interview", excerpt: "Situation, Task, Action, Result — the framework that separates great candidates from good ones.", author: "Primitive Informatics", tags: ["Behavioral", "Interview Tips"], published_at: new Date(Date.now() - 15*86400000).toISOString() },
  { id: 4, slug: "ai-in-technical-interviews", title: "How AI is Changing Technical Interviews in 2025", excerpt: "Companies are increasingly using AI-powered tools in their hiring process. Here is what candidates need to know.", author: "Primitive Informatics", tags: ["AI", "Trends"], published_at: new Date(Date.now() - 20*86400000).toISOString() },
];
