import { NextResponse } from "next/server";
import pool from "@/lib/db";

const SAMPLE_POSTS: Record<string, { id: number; slug: string; title: string; excerpt: string; content: string; author: string; tags: string[]; published: boolean; published_at: string }> = {
  "mastering-system-design-interviews": {
    id: 1, slug: "mastering-system-design-interviews",
    title: "Mastering System Design Interviews in 2025",
    excerpt: "A comprehensive guide to approaching system design questions with confidence. Learn the frameworks that top engineers use to crack FAANG interviews.",
    content: `## Introduction\n\nSystem design interviews test your ability to architect scalable systems under time pressure. Unlike coding rounds, there's no single correct answer — interviewers want to see your thought process.\n\n## The Framework\n\nUse the RESHADED framework:\n\n- **Requirements** — clarify functional and non-functional requirements\n- **Estimation** — back-of-the-envelope calculations for scale\n- **Storage Schema** — define data models early\n- **High-Level Design** — draw the major components\n- **APIs** — define the interface between services\n- **Deep Dives** — go deeper on critical components\n- **Evaluate** — discuss tradeoffs and alternatives\n\n## Key Principles\n\n- Always clarify before designing\n- Think in terms of bottlenecks\n- Discuss CAP theorem tradeoffs\n- Consider read vs write heavy workloads\n\n## Common Patterns\n\nMost system design problems reduce to a handful of patterns: URL shortener, rate limiter, distributed cache, message queue, and search autocomplete. Master these and you can handle 90% of questions.\n\n---\n\nPractice with our AI Mock Interview platform to simulate real system design rounds with instant feedback.`,
    author: "Primitive Informatics", tags: ["System Design", "Interview Prep", "Engineering"],
    published: true, published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  "top-dsa-patterns-for-interviews": {
    id: 2, slug: "top-dsa-patterns-for-interviews",
    title: "Top 10 DSA Patterns Every Developer Must Know",
    excerpt: "From sliding window to dynamic programming — these patterns appear in 80% of coding interviews. Master them and solve any problem.",
    content: `## Why Patterns Matter\n\nInstead of memorizing solutions, learn patterns. A pattern is a reusable approach that solves a class of problems.\n\n## The 10 Essential Patterns\n\n- **Sliding Window** — substring/subarray problems with a fixed or variable window\n- **Two Pointers** — sorted arrays, palindromes, pair sums\n- **Fast & Slow Pointers** — cycle detection in linked lists\n- **Merge Intervals** — overlapping intervals, meeting rooms\n- **Cyclic Sort** — problems with numbers in a range\n- **In-place Linked List Reversal** — reverse groups, rotate list\n- **Tree BFS** — level-order traversal\n- **Tree DFS** — path problems, all paths\n- **Two Heaps** — median of data stream\n- **Dynamic Programming** — optimization, counting problems\n\n## How to Practice\n\nFor each pattern, solve 5-10 problems until you can identify it immediately. Time yourself and track improvement.\n\n---\n\nUse our AI Mock Interview to practice coding problems with real-time feedback.`,
    author: "Primitive Informatics", tags: ["DSA", "Algorithms", "Coding"],
    published: true, published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  "behavioral-interview-star-method": {
    id: 3, slug: "behavioral-interview-star-method",
    title: "The STAR Method: Ace Every Behavioral Interview",
    excerpt: "Situation, Task, Action, Result — the framework that separates great candidates from good ones. Real examples included.",
    content: `## What is STAR?\n\nThe STAR method is a structured approach to answering behavioral interview questions.\n\n- **Situation** — Set the scene with relevant context\n- **Task** — Describe the challenge or responsibility\n- **Action** — Explain exactly what YOU did (use "I", not "we")\n- **Result** — Share the outcome with quantifiable metrics\n\n## Common Behavioral Questions\n\n- Tell me about a time you handled conflict on a team\n- Describe a situation where you failed and what you learned\n- Give an example of when you showed leadership\n- Tell me about a time you delivered under pressure\n\n## Example Answer\n\n**Question:** Tell me about a time you handled a difficult stakeholder.\n\n**Situation:** During Q3, our team was behind schedule on a critical product launch and our VP wanted daily status updates that were consuming 2 hours of engineering time.\n\n**Task:** I needed to keep stakeholders informed without derailing the team.\n\n**Action:** I built an automated dashboard pulling from our project tracker and set up a weekly async summary email. I also scheduled a 15-minute sync instead of daily standups.\n\n**Result:** Stakeholder satisfaction remained high, and we recovered 8 hours/week of engineering time, shipping on the revised deadline.\n\n---\n\nPractice behavioral interviews with our AI platform for structured, personalized feedback.`,
    author: "Primitive Informatics", tags: ["Behavioral", "Interview Tips", "Soft Skills"],
    published: true, published_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  "ai-in-technical-interviews": {
    id: 4, slug: "ai-in-technical-interviews",
    title: "How AI is Changing Technical Interviews in 2025",
    excerpt: "Companies are increasingly using AI-powered tools in their hiring process. Here is what candidates need to know.",
    content: `## The AI Interview Revolution\n\nArtificial intelligence is reshaping how companies screen and evaluate candidates. Understanding these changes gives you a significant edge.\n\n## What's Changing\n\n- **AI-powered screening** — Resume parsers and video interview analysis are now standard at large companies\n- **Automated coding assessments** — Platforms like HackerRank and Codility use AI to detect plagiarism and assess code quality\n- **AI interviewers** — Some companies use conversational AI for first-round screening\n- **Behavioral analysis** — Video interviews analyze tone, pace, and word choice\n\n## How to Prepare\n\n- Practice coding out loud — narrate your thought process\n- Use structured frameworks (STAR, RESHADED) that AI systems are trained to recognize\n- Optimize your resume for ATS with relevant keywords\n- Practice with AI mock interview tools to get comfortable with the format\n\n## The Human Edge\n\nDespite AI screening, the final rounds are still human. Authenticity, curiosity, and cultural fit remain things AI cannot fully evaluate. Use AI prep tools to clear the early rounds, then focus on genuine connection in final interviews.\n\n---\n\nPrimitive Informatics AI Mock Platform is built specifically to help you practice for AI-screened interviews.`,
    author: "Primitive Informatics", tags: ["AI", "Trends", "Interview Prep"],
    published: true, published_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
};

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
    const sample = SAMPLE_POSTS[slug];
    if (sample) return NextResponse.json({ post: sample });
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
