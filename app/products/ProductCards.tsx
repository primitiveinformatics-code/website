import { ExternalLink, Check, FolderOpen, Lock } from "lucide-react";

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z" />
    </svg>
  );
}

function GoogleDriveIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 87.3 78" fill="currentColor">
      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066DA" />
      <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.5c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00AC47" />
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.8z" fill="#EA4335" />
      <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832D" />
      <path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684FC" />
      <path d="M73.4 26.5l-12.7-22C59.85 3.1 58.7 2 57.35 1.2L43.6 25 59.75 53h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#FFBA00" />
    </svg>
  );
}

import { getLatestVideos, getChannelStats } from "@/lib/youtube";
import { getResources } from "@/lib/resources";
import { SAAS_APP_URL, YOUTUBE_CHANNEL_URL } from "@/lib/constants";
import VideoCard from "@/components/ui/VideoCard";

const saasFeatures = [
  "AI-powered interview simulation across 50+ categories",
  "Real-time feedback with scoring on technical depth, communication, and structure",
  "Progress analytics dashboard to track your improvement over time",
  "Behavioral, technical, and domain-specific interview modes",
];

const contentCategories = [
  { label: "Technical Interviews", color: "#3B82F6" },
  { label: "Soft Skills", color: "#10B981" },
  { label: "Industry Insights", color: "#8B5CF6" },
  { label: "Career Growth", color: "#F59E0B" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "#3B82F6",
  Behavioral: "#8B5CF6",
  "Soft Skills": "#10B981",
  "Career Growth": "#F59E0B",
  "Industry Insights": "#EF4444",
};

export default async function ProductCards() {
  const [videos, channelStats, resources] = await Promise.all([
    getLatestVideos(3),
    getChannelStats(),
    getResources(),
  ]);

  return (
    <section className="py-16" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Card 1: AI Mock Interview Platform */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 60px rgba(59, 130, 246, 0.06)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                  Free tier available
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3B82F6" }}>SaaS Platform</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#F1F5F9" }}>AI Mock Interview Platform</h2>
              <p className="mb-8 leading-relaxed" style={{ color: "#94A3B8" }}>
                Practice interviews with an AI that adapts to your skill level. Get instant, detailed feedback and track your progress with a powerful analytics dashboard.
              </p>
              <ul className="space-y-3 mb-10">
                {saasFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#94A3B8" }}>
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: "#10B981" }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={SAAS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "#fff", boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
              >
                Launch Mock Interview
                <ExternalLink size={16} />
              </a>
            </div>
            <div
              className="relative flex items-center justify-center p-10 lg:p-14"
              style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(99,102,241,0.03) 100%)", borderLeft: "1px solid rgba(59,130,246,0.1)" }}
            >
              <div className="w-full max-w-sm rounded-xl p-6" style={{ backgroundColor: "#0F172A", border: "1px solid rgba(30,41,59,0.8)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
                </div>
                <div className="space-y-3">
                  <div className="h-3 rounded" style={{ backgroundColor: "rgba(59,130,246,0.2)", width: "70%" }} />
                  <div className="h-3 rounded" style={{ backgroundColor: "rgba(30,41,59,0.8)", width: "90%" }} />
                  <div className="h-3 rounded" style={{ backgroundColor: "rgba(30,41,59,0.8)", width: "80%" }} />
                  <div className="mt-4 h-20 rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)" }} />
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[8.5, 9.1, 7.8].map((s, i) => (
                      <div key={i} className="rounded-lg p-2 text-center" style={{ backgroundColor: "rgba(30,41,59,0.5)" }}>
                        <p className="text-sm font-bold" style={{ color: "#F1F5F9" }}>{s}</p>
                        <p className="text-xs" style={{ color: "#64748B" }}>{["Tech", "Comm", "Struct"][i]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: YouTube Channel — Free Expert Content */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "rgba(17,24,39,0.8)", border: "1px solid rgba(239,68,68,0.15)", backdropFilter: "blur(12px)" }}
        >
          <div className="p-10 lg:p-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <YoutubeIcon size={20} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#EF4444" }}>YouTube Channel</span>
                </div>
                <h2 className="text-3xl font-bold" style={{ color: "#F1F5F9" }}>Free Expert Content</h2>
                <p className="mt-2" style={{ color: "#94A3B8" }}>
                  {channelStats.subscriberCount} subscribers · {channelStats.videoCount} videos
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {contentCategories.map((cat) => (
                  <span key={cat.label} className="px-3 py-1.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}25` }}>
                    {cat.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {videos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              <YoutubeIcon size={16} />
              Watch on YouTube
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Card 3: Audio & Video Resources — Google Drive */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: "rgba(17,24,39,0.8)", border: "1px solid rgba(139,92,246,0.15)", backdropFilter: "blur(12px)" }}
        >
          <div className="p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-3">
              <GoogleDriveIcon size={22} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B5CF6" }}>Google Drive</span>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#F1F5F9" }}>Audio &amp; Video Resources</h2>
            <p className="mb-2 max-w-2xl" style={{ color: "#94A3B8" }}>
              Exclusive professional development content hosted on Google Drive — deep-dive case studies, career strategy sessions, and domain-specific masterclasses.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-8 text-xs"
              style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B" }}
            >
              <Lock size={11} />
              Access is granted per resource — click a link and request access if needed
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {resources.map((resource) => {
                const color = CATEGORY_COLORS[resource.category ?? ""] ?? "#8B5CF6";
                const isPlaceholder = resource.gdrive_url === "#";
                return (
                  <div
                    key={resource.id}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(30,41,59,0.4)", border: "1px solid rgba(30,41,59,0.8)" }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>
                      <FolderOpen size={16} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-snug" style={{ color: "#F1F5F9" }}>{resource.title}</p>
                        {resource.category && (
                          <span className="px-2 py-0.5 text-xs rounded shrink-0"
                            style={{ backgroundColor: `${color}15`, color }}>
                            {resource.category}
                          </span>
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-xs mt-1 line-clamp-2" style={{ color: "#64748B" }}>{resource.description}</p>
                      )}
                      {isPlaceholder ? (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs" style={{ color: "#475569" }}>
                          <Lock size={10} />
                          Coming soon
                        </span>
                      ) : (
                        <a
                          href={resource.gdrive_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium transition-opacity hover:opacity-80"
                          style={{ color: "#8B5CF6" }}
                        >
                          <GoogleDriveIcon size={12} />
                          Open in Google Drive
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{ backgroundColor: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <GoogleDriveIcon size={18} />
              <p className="text-sm" style={{ color: "#64748B" }}>
                Resources are hosted on Google Drive. Clicking a link opens Drive — if you see an access-denied page, use the <strong style={{ color: "#94A3B8" }}>"Request access"</strong> button and we&apos;ll grant it promptly.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Agentic AI Training */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(17,24,39,0.8)",
            border: "1px solid rgba(6,182,212,0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 60px rgba(6,182,212,0.06)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.2)" }}>
                  Free credits included*
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B5CF6" }}>2-Day Intensive</span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#F1F5F9" }}>Agentic AI Training</h2>
              <p className="mb-8 leading-relaxed" style={{ color: "#94A3B8" }}>
                From the ReAct loop to multi-agent swarms — a hands-on architectural deep-dive on building production-grade AI agents. Covers MCP, A2A protocols, LangGraph, memory patterns, and production ops.
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { text: "Video lectures — full session recordings", color: "#06B6D4" },
                  { text: "Podcast episodes for on-the-go learning", color: "#A855F7" },
                  { text: "Slide decks (PPT) for every module", color: "#F59E0B" },
                  { text: "Platform access with free credits", color: "#10B981" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-sm" style={{ color: "#94A3B8" }}>
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: item.color }} />
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="text-xs mb-8" style={{ color: "#475569" }}>* Platform free credits subject to T&amp;C</p>
              <a
                href="mailto:admin@primitiveinformatics.in"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #06B6D4, #8B5CF6)", color: "#fff", boxShadow: "0 0 30px rgba(6,182,212,0.25)" }}
              >
                Register for Training
                <ExternalLink size={16} />
              </a>
            </div>
            <div
              className="relative flex items-center justify-center p-10 lg:p-14"
              style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(139,92,246,0.03) 100%)", borderLeft: "1px solid rgba(6,182,212,0.1)" }}
            >
              <div className="w-full max-w-sm space-y-2">
                {[
                  { label: "01 · ANATOMY", sub: "Brain · Tools · Agent Loop", color: "#06B6D4" },
                  { label: "02 · PROTOCOLS", sub: "MCP · A2A · Transport", color: "#A855F7" },
                  { label: "03 · ORCHESTRATION", sub: "Hierarchical · Swarm · Map-Reduce", color: "#06B6D4" },
                  { label: "04 · MEMORY", sub: "Context Engineering · RAG", color: "#A855F7" },
                  { label: "05 · PATTERNS", sub: "ReAct · Planning · Reflection", color: "#F59E0B" },
                  { label: "06 · SECURITY", sub: "MAESTRO · VIGIL · Guardrails", color: "#A855F7" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(30,41,59,0.8)" }}>
                    <span className="text-xs font-mono font-semibold shrink-0" style={{ color: m.color }}>{m.label}</span>
                    <span className="text-xs" style={{ color: "#64748B" }}>{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
