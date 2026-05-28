"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/interactive_concepts/main-course.html";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/interactive-content/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push(redirectTo);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0A0F1C" }}
    >
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #6c63ff, #00d2ff)", boxShadow: "0 0 40px rgba(108,99,255,0.3)" }}
          >
            <Lock size={24} style={{ color: "#fff" }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#F1F5F9" }}>
            Interactive Learning Guide
          </h1>
          <p className="text-sm mt-2" style={{ color: "#8892b0" }}>
            Sign in to access the main course
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "rgba(17,24,39,0.8)",
            border: "1px solid rgba(108,99,255,0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 60px rgba(108,99,255,0.06)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "rgba(17,24,39,0.8)",
                  border: "1px solid rgba(30,41,59,0.8)",
                  color: "#F1F5F9",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(108,99,255,0.5)"; e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(30,41,59,0.8)"; e.target.style.boxShadow = ""; }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#94A3B8" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-11"
                  style={{
                    backgroundColor: "rgba(17,24,39,0.8)",
                    border: "1px solid rgba(30,41,59,0.8)",
                    color: "#F1F5F9",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(108,99,255,0.5)"; e.target.style.boxShadow = "0 0 0 2px rgba(108,99,255,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(30,41,59,0.8)"; e.target.style.boxShadow = ""; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748B" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444" }}
              >
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, #6c63ff, #00d2ff)",
                color: "#fff",
                boxShadow: "0 0 30px rgba(108,99,255,0.25)",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in...</>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "#475569" }}>
            Need access?{" "}
            <a
              href={`mailto:primitiveinformatics@gmail.com?subject=Request%20Access%20to%20Interactive%20Learning%20Guide`}
              style={{ color: "#6c63ff" }}
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveContentLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0F1C" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "#6c63ff" }} />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
