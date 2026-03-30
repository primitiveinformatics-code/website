"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  cover_image?: string;
  published_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider uppercase"
              style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <BookOpen size={12} />
              Knowledge Base
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6" style={{ color: "#F1F5F9" }}>
              From Our Blog
            </h1>
            <p className="text-xl" style={{ color: "#94A3B8" }}>
              Insights, guides, and expert knowledge for your career growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 animate-pulse"
                  style={{ backgroundColor: "rgba(30,41,59,0.4)", height: "280px" }}
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center py-20" style={{ color: "#94A3B8" }}>No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full rounded-2xl p-6 group"
                    style={{
                      background: "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.6))",
                      border: "1px solid rgba(30,41,59,0.8)",
                      backdropFilter: "blur(12px)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.4)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(30,41,59,0.8)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    }}
                  >
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md"
                            style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
                          >
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-lg font-bold mb-3 leading-snug group-hover:text-blue-400 transition-colors" style={{ color: "#F1F5F9" }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#94A3B8" }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}>
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
                        <span className="flex items-center gap-1.5">
                          <User size={11} />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(post.published_at)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold transition-colors" style={{ color: "#3B82F6" }}>
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
