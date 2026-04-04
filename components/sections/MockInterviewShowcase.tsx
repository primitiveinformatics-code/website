"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Mic, BarChart3, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SAAS_APP_URL } from "@/lib/constants";

const features = [
  "AI-powered realistic interview simulation",
  "Instant feedback with scoring & improvement tips",
  "Covers technical, behavioral, and domain-specific interviews",
  "Track your progress with an analytics dashboard",
];

function MockInterviewUI() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative"
    >
      {/* Browser frame */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          border: "1px solid rgba(30, 41, 59, 0.8)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59, 130, 246, 0.08)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ backgroundColor: "#111827", borderBottom: "1px solid rgba(30, 41, 59, 0.8)" }}
        >
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }} />
          <div
            className="flex-1 mx-4 px-3 py-1 rounded text-xs text-center"
            style={{ backgroundColor: "rgba(30, 41, 59, 0.8)", color: "#64748B" }}
          >
            primitiveinformatics.in/interviewbot
          </div>
        </div>

        {/* App content */}
        <div className="p-6" style={{ backgroundColor: "#0F172A" }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs mb-1" style={{ color: "#64748B" }}>Round 2 of 3</p>
              <h4 className="font-bold" style={{ color: "#F1F5F9" }}>System Design Interview</h4>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ backgroundColor: "#10B981" }}
              />
              <span className="text-xs font-medium" style={{ color: "#10B981" }}>Live</span>
            </div>
          </div>

          {/* AI Question */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", border: "1px solid rgba(30, 41, 59, 0.8)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}
              >
                <span className="text-xs font-bold text-white">AI</span>
              </div>
              <div>
                <p className="text-xs mb-1.5 font-medium" style={{ color: "#64748B" }}>Interviewer</p>
                <p className="text-sm leading-relaxed" style={{ color: "#F1F5F9" }}>
                  Design a URL shortener like bit.ly. Walk me through your approach, focusing on scalability and reliability at 1 billion URLs.
                </p>
              </div>
            </div>
          </div>

          {/* User response area */}
          <div
            className="rounded-xl p-4 mb-4 relative overflow-hidden"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.05)", border: "1px solid rgba(59, 130, 246, 0.2)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Mic size={14} style={{ color: "#3B82F6" }} />
              <span className="text-xs font-medium" style={{ color: "#3B82F6" }}>You're speaking...</span>
            </div>
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              "I'd start with the core requirements. For 1 billion URLs, we need horizontal scaling. I'd use..."
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5"
              style={{ background: "linear-gradient(90deg, #3B82F6, #6366F1)" }}
              animate={{ width: ["20%", "70%", "45%", "85%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Score preview */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Technical", score: 8.5, icon: BarChart3, color: "#3B82F6" },
              { label: "Communication", score: 9.1, icon: MessageSquare, color: "#10B981" },
              { label: "Structure", score: 7.8, icon: TrendingUp, color: "#8B5CF6" },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: "rgba(17, 24, 39, 0.8)" }}
              >
                <metric.icon size={14} className="mx-auto mb-1" style={{ color: metric.color }} />
                <p className="text-lg font-bold" style={{ color: "#F1F5F9" }}>{metric.score}</p>
                <p className="text-xs" style={{ color: "#64748B" }}>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glow */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}

export default function MockInterviewShowcase() {
  return (
    <section className="py-24 relative" style={{ backgroundColor: "#080D1A" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3B82F6",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              AI Mock Interviews
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight" style={{ color: "#F1F5F9" }}>
              Interview practice that actually{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                prepares you
              </span>
            </h2>
            <ul className="space-y-4 mb-10">
              {features.map((f) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                  >
                    <Check size={13} style={{ color: "#3B82F6" }} />
                  </div>
                  <span className="text-base" style={{ color: "#94A3B8" }}>{f}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={SAAS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "#fff",
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.3)",
              }}
            >
              Start Your Free Interview
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>

          {/* Right: UI Mockup */}
          <MockInterviewUI />
        </div>
      </div>
    </section>
  );
}
