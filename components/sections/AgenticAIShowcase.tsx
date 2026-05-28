"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Layers, Network, Shield, CalendarDays, Sparkles } from "lucide-react";
import Link from "next/link";

const highlights = [
  "15 modules from foundations to advanced multi-agent systems",
  "Hands-on Python coding practicals — LangChain, LangGraph, Anthropic SDK, LangSmith",
  "Covers MCP, A2A protocols, RAG pipelines, and multi-agent orchestration",
  "Deployment patterns, cost management, security, and production ops",
];

const modules = [
  { label: "01 · FOUNDATIONS", sub: "Brain · Tools · Memory · Loop · Guardrails", color: "#06B6D4" },
  { label: "03 · FOUNDATIONS", sub: "Prompt Engineering · 7-Layer Design · Few-Shot", color: "#A855F7" },
  { label: "06 · COMMUNICATION", sub: "A2A & MCP Protocols · STDIO · SSE · gRPC", color: "#06B6D4" },
  { label: "08 · ORCHESTRATION", sub: "Hierarchical · Swarm · Map-Reduce · LangGraph", color: "#A855F7" },
  { label: "07 · DATA", sub: "RAG Pipeline · Embeddings · Vector DB · HyDE", color: "#F59E0B" },
  { label: "13 · SECURITY", sub: "MAESTRO · VIGIL · Tracing · HITL · Sandboxing", color: "#A855F7" },
];

function AgenticVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: "1px solid rgba(6,182,212,0.2)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(6,182,212,0.08)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ backgroundColor: "#0F172A", borderBottom: "1px solid rgba(6,182,212,0.15)" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }} />
          <div className="flex items-center gap-2 ml-2">
            <Layers size={12} style={{ color: "#06B6D4" }} />
            <span className="text-xs font-mono" style={{ color: "#64748B" }}>Agentic AI Architect — 15 Modules · 2-Day Intensive</span>
          </div>
        </div>

        {/* Module list */}
        <div className="p-5 space-y-2" style={{ backgroundColor: "#080D1A" }}>
          {modules.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
              style={{ backgroundColor: "rgba(15,23,42,0.9)", border: "1px solid rgba(30,41,59,0.8)" }}
            >
              <span className="text-xs font-mono font-semibold shrink-0" style={{ color: m.color }}>{m.label}</span>
              <span className="text-xs" style={{ color: "#64748B" }}>{m.sub}</span>
            </motion.div>
          ))}

          {/* Bottom badges */}
          <div className="flex items-center gap-2 pt-3 flex-wrap">
            {[
              { icon: Layers, label: "Python · LangChain", color: "#06B6D4" },
              { icon: Network, label: "LangGraph · LangSmith", color: "#A855F7" },
              { icon: Shield, label: "Anthropic SDK", color: "#10B981" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                style={{ backgroundColor: `${badge.color}12`, border: `1px solid ${badge.color}25`, color: badge.color }}
              >
                <badge.icon size={11} />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}

export default function AgenticAIShowcase() {
  return (
    <section className="py-24 relative" style={{ backgroundColor: "#0A0F1C" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <AgenticVisual />

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(6,182,212,0.1)",
                color: "#06B6D4",
                border: "1px solid rgba(6,182,212,0.2)",
              }}
            >
              Agentic AI Training
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: "#F1F5F9" }}>
              Build production-grade{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI agents
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#94A3B8" }}>
              A hands-on architectural deep-dive — from the ReAct loop to multi-agent swarms. 15 modules covering production-grade AI agents, with Python coding practicals in every module.
            </p>
            <ul className="space-y-4 mb-8">
              {highlights.map((h) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(6,182,212,0.12)" }}
                  >
                    <Check size={13} style={{ color: "#06B6D4" }} />
                  </div>
                  <span className="text-base" style={{ color: "#94A3B8" }}>{h}</span>
                </motion.li>
              ))}
            </ul>

            {/* Free Intro Session pitch */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl p-5 mb-8"
              style={{ backgroundColor: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(6,182,212,0.12)" }}
                >
                  <CalendarDays size={17} style={{ color: "#06B6D4" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#F1F5F9" }}>
                    New: Free Agentic AI Intro Session
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "#94A3B8" }}>
                    Not sure if the 2-day intensive is right for you? Join our free 1-hour preview session — see real agents built live, walk through the full curriculum with the instructor, and ask anything. No commitment, no credit card.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href="mailto:primitiveinformatics@gmail.com?subject=Register%20for%20Free%20Agentic%20AI%20Intro%20Session"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #06B6D4, #8B5CF6)",
                  color: "#fff",
                  boxShadow: "0 0 40px rgba(6,182,212,0.25)",
                }}
              >
                <Sparkles size={16} />
                Join Free Intro Session
              </motion.a>
              <motion.a
                href="mailto:primitiveinformatics@gmail.com?subject=Register%20for%20Agentic%20AI%202-Day%20Workshop"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  backgroundColor: "transparent",
                  color: "#06B6D4",
                  border: "1px solid rgba(6,182,212,0.4)",
                }}
              >
                Register for 2-Day Workshop
                <ArrowRight size={16} />
              </motion.a>
              <Link
                href="/products#agentic-ai-training"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all w-full sm:w-auto"
                style={{
                  backgroundColor: "transparent",
                  color: "#64748B",
                  border: "1px solid rgba(30,41,59,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(6,182,212,0.3)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(30,41,59,1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#64748B";
                }}
              >
                View Full Curriculum
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
