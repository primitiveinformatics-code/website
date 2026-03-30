"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SAAS_APP_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10, 15, 28, 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30, 41, 59, 0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #3B82F6, #6366F1)" }}
              >
                PI
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: "#F1F5F9" }}>
                Primitive<span style={{ color: "#3B82F6" }}>.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href) && link.href !== "/";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                    style={{
                      color: isActive ? "#F1F5F9" : "#94A3B8",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#F1F5F9"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "#94A3B8"; }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#94A3B8" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(10, 15, 28, 0.7)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col p-6 pt-20"
              style={{
                backgroundColor: "#111827",
                borderLeft: "1px solid rgba(30, 41, 59, 0.8)",
              }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-lg"
                style={{ color: "#94A3B8" }}
              >
                <X size={20} />
              </button>

              <nav className="flex flex-col gap-2 mt-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium rounded-lg transition-colors"
                      style={{
                        color: pathname === link.href ? "#3B82F6" : "#F1F5F9",
                        backgroundColor: pathname === link.href ? "rgba(59, 130, 246, 0.1)" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
