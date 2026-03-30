"use client";

import { motion } from "framer-motion";
import { PRICING_PLANS } from "@/lib/constants";
import PricingCard from "@/components/ui/PricingCard";

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-24 relative" style={{ backgroundColor: "#0A0F1C" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
          <p className="mt-2 text-sm" style={{ color: "#64748B" }}>
            All plans include access to our full YouTube content library.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.name} {...plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
