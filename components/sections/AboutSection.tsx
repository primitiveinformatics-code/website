"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe } from "lucide-react";

const highlights = [
  { icon: Users, value: "10,000+", label: "Professionals Trained", color: "#3B82F6" },
  { icon: Globe, value: "50+", label: "Countries Reached", color: "#8B5CF6" },
  { icon: Target, value: "95%", label: "Interview Success Rate", color: "#10B981" },
  { icon: Zap, value: "50+", label: "Interview Categories", color: "#F59E0B" },
];

export default function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0A0F1C" }}>
      {/* Subtle gradient blob */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-5 tracking-wider uppercase"
              style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              Who We Are
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6" style={{ color: "#F1F5F9" }}>
              Built for serious career growth
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "#94A3B8" }}>
              <p>
                Primitive Informatics is an EdTech platform built for working professionals who are serious about career growth. We combine AI-powered mock interviews, expert-curated content, and a growing knowledge base to give you everything you need to land your next role.
              </p>
              <p>
                Our platform was born from a simple belief: that quality interview preparation should be accessible to everyone. Whether you&apos;re a fresher stepping into your first tech role or a seasoned engineer eyeing FAANG, we have tools tailored to your journey.
              </p>
              <p>
                Backed by industry veterans and powered by cutting-edge AI, we&apos;ve helped 10,000+ professionals across the globe sharpen their skills, build confidence, and ace interviews.
              </p>
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${item.color}12, ${item.color}06)`,
                  border: `1px solid ${item.color}20`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: "#F1F5F9" }}>
                  {item.value}
                </div>
                <div className="text-xs" style={{ color: "#64748B" }}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
