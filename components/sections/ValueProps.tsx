"use client";

import { motion } from "framer-motion";
import { Brain, PlayCircle, BookOpen, Cpu } from "lucide-react";
import Link from "next/link";
import { SAAS_APP_URL } from "@/lib/constants";

const cards = [
  {
    icon: Cpu,
    title: "Agentic AI Training",
    description: "Hands-on 2-day intensive on building production-grade AI agents. MCP, A2A, LangGraph, orchestration, and security. Preview free with our 1-hour intro session — no commitment needed.",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))",
    href: "/products#agentic-ai-training",
    external: false,
    badge: "Free Intro Session",
  },
  {
    icon: Brain,
    title: "AI Mock Interviews",
    description: "Practice with AI interviewers that adapt to your level. Get instant, detailed feedback on your answers, delivery, and technical accuracy across 50+ categories.",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
    href: SAAS_APP_URL,
    external: true,
  },
  {
    icon: BookOpen,
    title: "Expert Blogs and Papers",
    description: "In-depth articles, research papers, and expert guides on AI, system design, DSA, and career growth — written by industry veterans.",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))",
    href: "/blog",
    external: false,
  },
  {
    icon: PlayCircle,
    title: "Audio & Video Resources",
    description: "Exclusive professional development content. Curated playlists, in-depth case studies, and career growth resources available on demand.",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.05))",
    href: "/content",
    external: false,
  },
];

export default function ValueProps() {
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
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
            Everything you need to grow
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Four powerful tools, one platform — designed to take you from AI novice to career leader.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="relative rounded-2xl p-7 group block cursor-pointer h-full"
                style={{
                  background: card.gradient,
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = `${card.color}40`;
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${card.color}15`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(30, 41, 59, 0.8)";
                  el.style.boxShadow = "none";
                }}
              >
                {"badge" in card && card.badge && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 text-xs font-bold rounded-full"
                    style={{ backgroundColor: `${card.color}20`, color: card.color, border: `1px solid ${card.color}30` }}>
                    {card.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                  <card.icon size={22} style={{ color: card.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2.5" style={{ color: "#F1F5F9" }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{card.description}</p>
                <div className="mt-4 text-xs font-semibold" style={{ color: card.color }}>
                  {card.external ? "Launch App →" : "Explore →"}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
