"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag, BookOpen } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  published_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts || []).slice(0, 3)));
  }, []);

  return (
    <section className="py-24 relative" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
            style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <BookOpen size={11} />
            Blog
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
            From Our Blog
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Insights, guides, and expert knowledge for your career growth.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl animate-pulse"
                style={{ backgroundColor: "rgba(30,41,59,0.4)", height: "240px" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
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
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded"
                          style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6" }}
                        >
                          <Tag size={8} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-base font-bold mb-2 leading-snug group-hover:text-blue-400 transition-colors" style={{ color: "#F1F5F9" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#94A3B8" }}>
                    {post.excerpt?.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#64748B" }}>
                      <Calendar size={10} />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#3B82F6" }}>
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
              color: "#3B82F6",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            View All Posts <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
