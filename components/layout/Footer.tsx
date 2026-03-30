"use client";

import Link from "next/link";
import { YOUTUBE_CHANNEL_URL } from "@/lib/constants";

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function TwitterXIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: YoutubeIcon, label: "YouTube", href: YOUTUBE_CHANNEL_URL },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: TwitterXIcon, label: "Twitter/X", href: "#" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "AI Mock Interviews", href: "https://interviews.primitiveinformatics.com", external: true },
  { label: "YouTube Channel", href: YOUTUBE_CHANNEL_URL, external: true },
  { label: "Help Center (Coming Soon)", href: "#", disabled: true },
];


export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A0F1C", borderTop: "1px solid rgba(30, 41, 59, 0.5)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}
              >
                PI
              </div>
              <span className="font-bold text-lg" style={{ color: "#F1F5F9" }}>
                Primitive<span style={{ color: "#3B82F6" }}>.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748B" }}>
              Helping working professionals accelerate their careers through AI-powered interview prep and expert video content.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(30, 41, 59, 0.8)",
                    color: "#94A3B8",
                    border: "1px solid rgba(30, 41, 59, 1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(59, 130, 246, 0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59, 130, 246, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(30, 41, 59, 0.8)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(30, 41, 59, 1)";
                  }}
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "#64748B" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "#94A3B8" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "#64748B" }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  {link.disabled ? (
                    <span className="text-sm" style={{ color: "#475569" }}>
                      {link.label}
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm transition-colors duration-200"
                      style={{ color: "#94A3B8" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-5" style={{ color: "#64748B" }}>
              Contact
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: "#94A3B8" }}>
              <li>
                <a
                  href="mailto:hello@primitiveinformatics.com"
                  className="transition-colors duration-200 hover:text-blue-400"
                  style={{ color: "#94A3B8" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#3B82F6"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}
                >
                  hello@primitiveinformatics.com
                </a>
              </li>
              <li style={{ color: "#64748B" }}>+91-XXXX-XXXXXX</li>
              <li style={{ color: "#64748B" }}>India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(30, 41, 59, 0.5)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#475569" }}>
            © 2026 Primitive Informatics. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: "#475569" }}>
            <a href="#" className="transition-colors hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
