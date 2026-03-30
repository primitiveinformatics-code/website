"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SAAS_APP_URL } from "@/lib/constants";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#080D1A" }}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 60% at 80% 50%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ color: "#F1F5F9" }}
          >
            Ready to Ace Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B82F6, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Next Interview?
            </span>
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Join 10,000+ professionals who are already using Primitive Informatics to land their dream roles. Start free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={SAAS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.3)",
                  "0 0 60px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
              className="flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "#fff",
              }}
            >
              Start Free Today
              <ArrowRight size={20} />
            </motion.a>
            <p className="text-sm" style={{ color: "#475569" }}>
              No credit card • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
