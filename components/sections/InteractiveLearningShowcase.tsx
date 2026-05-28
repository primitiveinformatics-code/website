"use client";

import { motion } from "framer-motion";
import { BookOpen, Lock, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

const preCourseTopic = [
  "The Platform Shift — software evolution from Client/Server to Agentic AI",
  "Common Myths vs. Production Reality — 5 developer pitfalls debunked",
  "The 5-Component Agent Anatomy — Brain, Tools, Memory, Loop, Guardrails",
  "The ReAct Loop — Observe → Think → Act → Evaluate cycle",
  "The 4 Types of Memory — Working, Episodic, Semantic & Procedural",
  "Prototype vs. Production Gap — why demos work but production fails",
];

const mainCourseHighlights = [
  "4 deep-dive modules across 53 interactive concept pages",
  "Agent Foundations, Reasoning, MCP & A2A Protocols, RAG Pipelines",
  "Orchestration, Memory, LangGraph, Observability & Security",
  "Every concept has live simulators, interactive explorers, and exercises",
];

export default function InteractiveLearningShowcase() {
  return (
    <section className="py-24 relative" style={{ backgroundColor: "#0A0F1C" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(108,99,255,0.04) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
            style={{ backgroundColor: "rgba(108,99,255,0.1)", color: "#6c63ff", border: "1px solid rgba(108,99,255,0.2)" }}
          >
            Interactive Learning Guide
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight" style={{ color: "#F1F5F9" }}>
            Learn by doing,{" "}
            <span style={{ background: "linear-gradient(135deg, #6c63ff, #00d2ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              concept by concept
            </span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Interactive HTML concept pages — each one packed with live simulators, exercises, and visual explorers. Start free with the pre-course, then unlock the full 53-concept main course.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pre-sample card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "rgba(17,24,39,0.8)",
              border: "1px solid rgba(108,99,255,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)" }}>
                  <BookOpen size={18} style={{ color: "#6c63ff" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold" style={{ color: "#F1F5F9" }}>Pre-Course Sample</h3>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{ backgroundColor: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                      Free
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>6 concepts · No login required</p>
                </div>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#94A3B8" }}>
                Core foundations to get you ready — the platform shift, agent anatomy, memory types, and the prototype-to-production gap. Freely accessible, no account needed.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {preCourseTopic.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: "#6c63ff" }} />
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href="/interactive_concepts/pre-course.html"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #6c63ff, #5a52e0)", color: "#fff", boxShadow: "0 0 30px rgba(108,99,255,0.2)" }}
              >
                <BookOpen size={15} />
                Start Pre-Course
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* Main course card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: "rgba(17,24,39,0.8)",
              border: "1px solid rgba(0,210,255,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(0,210,255,0.1)", border: "1px solid rgba(0,210,255,0.2)" }}>
                  <Lock size={18} style={{ color: "#00d2ff" }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold" style={{ color: "#F1F5F9" }}>Main Course</h3>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{ backgroundColor: "rgba(0,210,255,0.1)", color: "#00d2ff", border: "1px solid rgba(0,210,255,0.2)" }}>
                      Login Required
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>4 modules · 53 concepts · Full access</p>
                </div>
              </div>

              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#94A3B8" }}>
                The complete Agentic AI Architect reference — all 53 interactive concept pages across 4 deep-dive modules. Access is granted after enrollment; sign in to continue.
              </p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {mainCourseHighlights.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm" style={{ color: "#94A3B8" }}>
                    <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: "#00d2ff" }} />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href="/interactive_concepts/main-course.html"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #00d2ff, #0099cc)", color: "#fff", boxShadow: "0 0 30px rgba(0,210,255,0.15)" }}
                >
                  <Lock size={15} />
                  Access Main Course
                  <ArrowRight size={15} />
                </a>
                <a
                  href={`mailto:primitiveinformatics@gmail.com?subject=Request%20Access%20to%20Interactive%20Learning%20Guide`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all"
                  style={{ color: "#6c63ff", border: "1px solid rgba(108,99,255,0.3)", backgroundColor: "transparent" }}
                >
                  Request Access
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link
            href="/products#interactive-learning"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: "#64748B" }}
          >
            View full course details on the Products page <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
