"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Mock Interview Support",
  "Partnership",
  "Feedback",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    // TODO: Connect to backend API (e.g., Next.js API route → email service like Resend, SendGrid, or Formspree)
    console.log("Form submission:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  const fieldClass = (hasError: boolean) => `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200`;
  const fieldStyle = (hasError: boolean): React.CSSProperties => ({
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    border: `1px solid ${hasError ? "rgba(239, 68, 68, 0.5)" : "rgba(30, 41, 59, 0.8)"}`,
    color: "#F1F5F9",
    boxShadow: hasError ? "0 0 0 2px rgba(239,68,68,0.1)" : undefined,
  });

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 gap-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}
        >
          <CheckCircle size={40} style={{ color: "#10B981" }} />
        </motion.div>
        <h3 className="text-2xl font-bold" style={{ color: "#F1F5F9" }}>Message sent!</h3>
        <p style={{ color: "#94A3B8" }}>
          Thank you! We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
          className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            color: "#3B82F6",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
          Full Name <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          className={fieldClass(!!errors.name)}
          style={fieldStyle(!!errors.name)}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(59, 130, 246, 0.5)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(59,130,246,0.1)"; }}
          onBlur={(e) => { if (!errors.name) { (e.target as HTMLInputElement).style.borderColor = "rgba(30, 41, 59, 0.8)"; (e.target as HTMLInputElement).style.boxShadow = ""; } }}
        />
        {errors.name && <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#EF4444" }}><AlertCircle size={12} />{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
            Email Address <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className={fieldClass(!!errors.email)}
            style={fieldStyle(!!errors.email)}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(59, 130, 246, 0.5)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(59,130,246,0.1)"; }}
            onBlur={(e) => { if (!errors.email) { (e.target as HTMLInputElement).style.borderColor = "rgba(30, 41, 59, 0.8)"; (e.target as HTMLInputElement).style.boxShadow = ""; } }}
          />
          {errors.email && <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#EF4444" }}><AlertCircle size={12} />{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
            Phone Number <span style={{ color: "#64748B" }}>(optional)</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91-XXXX-XXXXXX"
            className={fieldClass(false)}
            style={fieldStyle(false)}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(59, 130, 246, 0.5)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 2px rgba(59,130,246,0.1)"; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(30, 41, 59, 0.8)"; (e.target as HTMLInputElement).style.boxShadow = ""; }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>Subject</label>
        <select
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={fieldClass(false)}
          style={{ ...fieldStyle(false), cursor: "pointer" }}
        >
          <option value="" style={{ backgroundColor: "#111827" }}>Select a subject...</option>
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ backgroundColor: "#111827" }}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
          Message <span style={{ color: "#EF4444" }}>*</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us how we can help you..."
          rows={5}
          className={fieldClass(!!errors.message)}
          style={{ ...fieldStyle(!!errors.message), resize: "vertical", minHeight: "130px" }}
          onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(59, 130, 246, 0.5)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 2px rgba(59,130,246,0.1)"; }}
          onBlur={(e) => { if (!errors.message) { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(30, 41, 59, 0.8)"; (e.target as HTMLTextAreaElement).style.boxShadow = ""; } }}
        />
        <div className="flex justify-between mt-1.5">
          {errors.message ? (
            <p className="text-xs flex items-center gap-1" style={{ color: "#EF4444" }}><AlertCircle size={12} />{errors.message}</p>
          ) : <span />}
          <span className="text-xs" style={{ color: formData.message.length < 20 ? "#EF4444" : "#64748B" }}>
            {formData.message.length}/20 min
          </span>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: status !== "loading" ? 1.02 : 1 }}
        whileTap={{ scale: status !== "loading" ? 0.98 : 1 }}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-base transition-all"
        style={{
          background: "linear-gradient(135deg, #3B82F6, #2563EB)",
          color: "#fff",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
          opacity: status === "loading" ? 0.7 : 1,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={18} /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}
