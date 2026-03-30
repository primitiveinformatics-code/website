import { motion } from "framer-motion";
import { ExternalLink, Check, Play, BookOpen } from "lucide-react";

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5a3 3 0 0 0-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z" />
    </svg>
  );
}
import { getLatestVideos, getChannelStats } from "@/lib/youtube";
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

const contentPreviews = [
  { title: "How to Build a Personal Brand as a Developer", duration: "45 min", type: "Video" },
  { title: "The Art of Negotiation for Tech Professionals", duration: "32 min", type: "Audio" },
  { title: "Breaking into FAANG: A Realistic Roadmap", duration: "58 min", type: "Video" },
  { title: "Soft Skills That Get You Promoted", duration: "28 min", type: "Audio" },
];

export default async function ProductCards() {
  const [videos, channelStats] = await Promise.all([
    getLatestVideos(3),
    getChannelStats(),
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
            {/* Left content */}
            <div className="p-10 lg:p-14">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="px-3 py-1 text-xs font-bold rounded-full"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                >
                  Free tier available
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3B82F6" }}>
                  SaaS Platform
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#F1F5F9" }}>
                AI Mock Interview Platform
              </h2>
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
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                  color: "#fff",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                }}
              >
                Launch Mock Interview
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Right: Visual mockup */}
            <div
              className="relative flex items-center justify-center p-10 lg:p-14"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(99,102,241,0.03) 100%)",
                borderLeft: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              <div
                className="w-full max-w-sm rounded-xl p-6"
                style={{ backgroundColor: "#0F172A", border: "1px solid rgba(30, 41, 59, 0.8)" }}
              >
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

        {/* Card 2: YouTube Channel */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(239, 68, 68, 0.15)",
            backdropFilter: "blur(12px)",
          }}
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
                  <span
                    key={cat.label}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}25` }}
                  >
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
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#EF4444",
                border: "1px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <YoutubeIcon size={16} />
              Watch on YouTube
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Card 3: Content Library */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(139, 92, 246, 0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="p-10 lg:p-14">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={20} style={{ color: "#8B5CF6" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8B5CF6" }}>Content Library</span>
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#F1F5F9" }}>Audio & Video Resources</h2>
            <p className="mb-8 max-w-2xl" style={{ color: "#94A3B8" }}>
              Exclusive professional development content uploaded by our team. Deep-dive case studies, career strategy sessions, and domain-specific masterclasses available on demand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {contentPreviews.map((content, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl group cursor-pointer transition-all hover:border-purple-500/30"
                  style={{ backgroundColor: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(30, 41, 59, 0.8)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(139, 92, 246, 0.15)" }}
                  >
                    <Play size={16} style={{ color: "#8B5CF6" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#F1F5F9" }}>{content.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                      {content.type} · {content.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: "rgba(139, 92, 246, 0.1)",
                color: "#8B5CF6",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              Browse Content Library
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
