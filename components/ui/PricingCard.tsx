"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  missingFeatures?: string[];
  cta: string;
  ctaHref: string;
  popular?: boolean;
  index: number;
}

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  missingFeatures = [],
  cta,
  ctaHref,
  popular = false,
  index,
}: PricingCardProps) {
  const isExternal = ctaHref.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-8 flex flex-col"
      style={{
        backgroundColor: popular ? "rgba(17, 24, 39, 0.95)" : "rgba(17, 24, 39, 0.7)",
        border: popular ? "1px solid rgba(59, 130, 246, 0.5)" : "1px solid rgba(30, 41, 59, 0.8)",
        boxShadow: popular ? "0 0 60px rgba(59, 130, 246, 0.15), 0 25px 50px rgba(0,0,0,0.3)" : "0 25px 50px rgba(0,0,0,0.2)",
        backdropFilter: "blur(12px)",
      }}
    >
      {popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          animate={{ boxShadow: ["0 0 15px rgba(59,130,246,0.4)", "0 0 30px rgba(59,130,246,0.7)", "0 0 15px rgba(59,130,246,0.4)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span
            className="px-4 py-1.5 text-xs font-bold rounded-full tracking-wider uppercase"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #6366F1)",
              color: "#fff",
            }}
          >
            Most Popular
          </span>
        </motion.div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-1" style={{ color: "#F1F5F9" }}>{name}</h3>
        <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>{description}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold" style={{ color: "#F1F5F9" }}>{price}</span>
          <span className="text-sm" style={{ color: "#64748B" }}>/{period}</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "#94A3B8" }}>
            <Check size={16} className="mt-0.5 shrink-0" style={{ color: "#10B981" }} />
            {feature}
          </li>
        ))}
        {missingFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm" style={{ color: "#475569" }}>
            <X size={16} className="mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block w-full text-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
        style={
          popular
            ? {
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "#fff",
                boxShadow: "0 0 24px rgba(59, 130, 246, 0.4)",
              }
            : {
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                color: "#F1F5F9",
                border: "1px solid rgba(30, 41, 59, 1)",
              }
        }
      >
        {cta}
      </Link>
    </motion.div>
  );
}
