"use client";

// TODO: Gate this section behind auth middleware in production

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import FileUploadZone from "@/components/ui/FileUploadZone";
import { useState } from "react";

const CATEGORIES = ["Technical", "Behavioral", "Soft Skills", "Career Growth", "Industry Insights"];

export default function UploadSection() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const inputStyle: React.CSSProperties = {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    border: "1px solid rgba(30, 41, 59, 0.8)",
    color: "#F1F5F9",
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <section className="py-16 pb-24" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.7)",
            border: "1px solid rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header */}
          <div
            className="px-8 py-5 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(30, 41, 59, 0.8)" }}
          >
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#F1F5F9" }}>Upload Content</h2>
              <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>Add audio or video content to the library</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)" }}
            >
              <Shield size={12} style={{ color: "#F59E0B" }} />
              <span className="text-xs font-semibold" style={{ color: "#F59E0B" }}>Admin / Creator Access</span>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <FileUploadZone />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Content title..."
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="" style={{ backgroundColor: "#111827" }}>Select category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} style={{ backgroundColor: "#111827" }}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the content..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", minHeight: "90px" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. system-design, interview, career (comma separated)"
                style={inputStyle}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  color: "#fff",
                  boxShadow: "0 0 24px rgba(59, 130, 246, 0.25)",
                }}
              >
                Publish Content
              </button>
              <button
                className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  backgroundColor: "transparent",
                  color: "#64748B",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                }}
              >
                Save Draft
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
