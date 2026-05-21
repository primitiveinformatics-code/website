"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}


import ContactForm from "@/components/forms/ContactForm";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { FAQ_ITEMS, YOUTUBE_CHANNEL_URL } from "@/lib/constants";

const socialLinks = [
  { icon: YoutubeIcon, label: "YouTube", href: YOUTUBE_CHANNEL_URL, color: "#EF4444" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/in/francis-joshy-0801a140b/", color: "#0A66C2" },
];

export default function ContactPageClient() {
  return (
    <div style={{ backgroundColor: "#0A0F1C" }}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Contact
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-5" style={{ color: "#F1F5F9" }}>
              Get in Touch
            </h1>
            <p className="text-xl" style={{ color: "#94A3B8" }}>
              Have questions? We&apos;d love to hear from you. We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div
                className="rounded-2xl p-8 sm:p-10"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#F1F5F9" }}>Send us a message</h2>
                <p className="text-sm mb-8" style={{ color: "#64748B" }}>
                  Fill in the form below and we&apos;ll get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact details card */}
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h2 className="text-xl font-bold mb-6" style={{ color: "#F1F5F9" }}>Contact Information</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "primitiveinformatics@gmail.com", href: "mailto:primitiveinformatics@gmail.com" },
                    { icon: Phone, label: "Phone", value: "+91 7907341911", href: "tel:+917907341911" },
                    { icon: MapPin, label: "Location", value: "India", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                      >
                        <item.icon size={17} style={{ color: "#3B82F6" }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1" style={{ color: "#64748B" }}>{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm transition-colors"
                            style={{ color: "#F1F5F9" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F1F5F9"; }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm" style={{ color: "#F1F5F9" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3 className="text-lg font-bold mb-5" style={{ color: "#F1F5F9" }}>Follow Us</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all group"
                      style={{ border: "1px solid rgba(30, 41, 59, 0.5)" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = `${social.color}40`;
                        el.style.backgroundColor = `${social.color}08`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.borderColor = "rgba(30, 41, 59, 0.5)";
                        el.style.backgroundColor = "transparent";
                      }}
                    >
                      <social.icon size={18} />
                      <span className="text-sm font-medium" style={{ color: "#94A3B8" }}>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div
                className="rounded-2xl p-6 flex items-center gap-4"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.05)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}>
                  <span style={{ color: "#10B981", fontSize: "18px" }}>⚡</span>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#10B981" }}>Fast Response</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>We typically respond within 24 hours on business days.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24" style={{ backgroundColor: "#080D1A" }}>
        <div
          className="h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(30,41,59,0.5), transparent)" }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3B82F6",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              FAQ
            </span>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
              Frequently Asked Questions
            </h2>
            <p className="mt-4" style={{ color: "#94A3B8" }}>
              Can&apos;t find what you&apos;re looking for? Reach out to us directly.
            </p>
          </motion.div>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
}
