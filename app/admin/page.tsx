"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Upload, Plus, BookOpen, PlayCircle } from "lucide-react";
import FileUploadZone from "@/components/ui/FileUploadZone";

const CATEGORIES = ["Technical", "Behavioral", "Soft Skills", "Career Growth", "Industry Insights"];

interface Playlist {
  id: number;
  name: string;
  type: "video" | "podcast";
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(17, 24, 39, 0.8)",
  border: "1px solid rgba(30, 41, 59, 0.8)",
  color: "#F1F5F9",
  width: "100%",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none",
};

export default function AdminPage() {
  // Audio/Video upload state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadTags, setUploadTags] = useState("");

  // YouTube link state
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [ytPlaylistId, setYtPlaylistId] = useState("");
  const [ytUrl, setYtUrl] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytDesc, setYtDesc] = useState("");
  const [ytStatus, setYtStatus] = useState<string | null>(null);
  const [ytLoading, setYtLoading] = useState(false);

  useEffect(() => {
    fetch("/api/playlists")
      .then((r) => r.json())
      .then((d) => setPlaylists(d.playlists || []));
  }, []);

  async function handleYtSubmit(e: React.FormEvent) {
    e.preventDefault();
    setYtLoading(true);
    setYtStatus(null);
    try {
      const res = await fetch("/api/playlists/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playlistId: parseInt(ytPlaylistId),
          youtubeUrl: ytUrl,
          title: ytTitle,
          description: ytDesc,
        }),
      });
      const d = await res.json();
      if (res.ok) {
        setYtStatus("Video added successfully!");
        setYtUrl("");
        setYtTitle("");
        setYtDesc("");
        setYtPlaylistId("");
      } else {
        setYtStatus(d.error || "Failed to add video.");
      }
    } catch {
      setYtStatus("Network error.");
    } finally {
      setYtLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.2)" }}
              >
                <Shield size={18} style={{ color: "#F59E0B" }} />
              </div>
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full"
                style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#F59E0B", border: "1px solid rgba(245, 158, 11, 0.2)" }}
              >
                Admin / Creator Access
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: "#F1F5F9" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: "#64748B" }}>Manage content uploads and YouTube resources.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Section A: Audio & Video Resources Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="px-8 py-5 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(30, 41, 59, 0.8)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(139, 92, 246, 0.12)" }}
              >
                <BookOpen size={16} style={{ color: "#8B5CF6" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "#F1F5F9" }}>Audio &amp; Video Resources</h2>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Upload audio or video content to the library</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <FileUploadZone />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Title</label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Content title..."
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
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
                <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Description</label>
                <textarea
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Describe the content..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Tags</label>
                <input
                  type="text"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="e.g. system-design, interview, career (comma separated)"
                  style={inputStyle}
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  className="px-7 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                    color: "#fff",
                    boxShadow: "0 0 24px rgba(139, 92, 246, 0.25)",
                  }}
                >
                  <Upload size={14} className="inline mr-2" />
                  Publish Content
                </button>
                <button
                  className="px-5 py-3 rounded-xl font-semibold text-sm"
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

          {/* Section B: Free Expert Content — Add YouTube Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="px-8 py-5 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(30, 41, 59, 0.8)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              >
                <PlayCircle size={16} style={{ color: "#EF4444" }} />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: "#F1F5F9" }}>Free Expert Content</h2>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Add YouTube videos to content playlists</p>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleYtSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Playlist</label>
                  <select
                    value={ytPlaylistId}
                    onChange={(e) => setYtPlaylistId(e.target.value)}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: "#111827" }}>Select a playlist…</option>
                    {playlists.map((p) => (
                      <option key={p.id} value={p.id} style={{ backgroundColor: "#111827" }}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>YouTube URL</label>
                  <input
                    type="text"
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                    style={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Title</label>
                    <input
                      type="text"
                      value={ytTitle}
                      onChange={(e) => setYtTitle(e.target.value)}
                      placeholder="Video title"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "#94A3B8" }}>Description (optional)</label>
                    <input
                      type="text"
                      value={ytDesc}
                      onChange={(e) => setYtDesc(e.target.value)}
                      placeholder="Short description"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={ytLoading}
                    className="px-7 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #EF4444, #DC2626)",
                      color: "#fff",
                      boxShadow: "0 0 20px rgba(239,68,68,0.25)",
                    }}
                  >
                    <Plus size={14} className="inline mr-2" />
                    {ytLoading ? "Adding…" : "Add Video to Playlist"}
                  </button>
                </div>

                {ytStatus && (
                  <p
                    className="text-sm"
                    style={{ color: ytStatus.includes("success") ? "#10B981" : "#EF4444" }}
                  >
                    {ytStatus}
                  </p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
