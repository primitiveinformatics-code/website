"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid",
            borderColor: openIndex === index ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 41, 59, 0.8)",
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            backdropFilter: "blur(12px)",
            transition: "border-color 0.2s",
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-base" style={{ color: "#F1F5F9" }}>
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0"
              style={{ color: openIndex === index ? "#3B82F6" : "#64748B" }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
