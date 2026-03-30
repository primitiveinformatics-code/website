"use client";

import { motion } from "framer-motion";

export default function ProductsHero() {
  return (
    <section
      className="relative pt-32 pb-20 text-center overflow-hidden"
      style={{ backgroundColor: "#0A0F1C" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
            Our Products
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6" style={{ color: "#F1F5F9" }}>
            Tools Built for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B82F6, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Growth
            </span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Tools and content designed to fast-track your professional growth — whether you&apos;re prepping for interviews or leveling up your domain expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
