"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  cover_image?: string;
  published_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then(async (r) => {
        if (!r.ok) { setNotFound(true); return; }
        const d = await r.json();
        setPost(d.post || null);
        if (!d.post) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }} className="pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 rounded" style={{ backgroundColor: "rgba(30,41,59,0.6)", width: "60%" }} />
            <div className="h-4 rounded" style={{ backgroundColor: "rgba(30,41,59,0.4)", width: "80%" }} />
            <div className="h-4 rounded" style={{ backgroundColor: "rgba(30,41,59,0.4)", width: "70%" }} />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }} className="pt-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#F1F5F9" }}>Post Not Found</h1>
          <p className="mb-8" style={{ color: "#94A3B8" }}>This post doesn&apos;t exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
            style={{ backgroundColor: "rgba(59,130,246,0.15)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.3)" }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }}>
      <article className="pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#64748B"; }}
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md"
                    style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    <Tag size={10} />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-5" style={{ color: "#F1F5F9" }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-sm" style={{ color: "#64748B" }}>
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.published_at)}
              </span>
            </div>
          </motion.header>

          {/* Divider */}
          <div className="mb-10" style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }} />

          {/* Excerpt */}
          {post.excerpt && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl leading-relaxed mb-8 font-medium"
              style={{ color: "#CBD5E1" }}
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Content */}
          {post.content && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose-custom text-base leading-relaxed whitespace-pre-wrap"
              style={{ color: "#94A3B8" }}
            >
              {post.content}
            </motion.div>
          )}

          {!post.content && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: "rgba(30,41,59,0.4)", border: "1px solid rgba(30,41,59,0.8)" }}
            >
              <p style={{ color: "#64748B" }}>Full article content coming soon. Stay tuned!</p>
            </motion.div>
          )}
        </div>
      </article>
    </main>
  );
}
