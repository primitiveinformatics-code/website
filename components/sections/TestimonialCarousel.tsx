"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="py-24" style={{ backgroundColor: "#080D1A" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              color: "#3B82F6",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            Testimonials
          </span>
          <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
            Loved by professionals
          </h2>
        </div>

        <div className="relative">
          {/* Card */}
          <div
            className="rounded-2xl p-10 sm:p-14 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(30, 41, 59, 0.8)",
              backdropFilter: "blur(12px)",
              minHeight: "280px",
            }}
          >
            <Quote
              size={48}
              className="absolute top-8 right-8 opacity-10"
              style={{ color: "#3B82F6" }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <blockquote className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: "#F1F5F9" }}>
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                      color: "#fff",
                    }}
                  >
                    {TESTIMONIALS[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "#F1F5F9" }}>{TESTIMONIALS[current].name}</p>
                    <p className="text-sm" style={{ color: "#64748B" }}>
                      {TESTIMONIALS[current].role} · {TESTIMONIALS[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-200 rounded-full"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === current ? "#3B82F6" : "rgba(30, 41, 59, 1)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  color: "#94A3B8",
                  border: "1px solid rgba(30, 41, 59, 1)",
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  color: "#94A3B8",
                  border: "1px solid rgba(30, 41, 59, 1)",
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
