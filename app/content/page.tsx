"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Mic, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Playlist {
  id: number;
  name: string;
  description: string;
  type: "video" | "podcast";
  cover_image?: string;
}

interface PlaylistItem {
  id: number;
  playlist_id: number;
  youtube_id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  position: number;
}

export default function ContentPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [items, setItems] = useState<Record<number, PlaylistItem[]>>({});
  const [activeVideo, setActiveVideo] = useState<PlaylistItem | null>(null);
  const [loadingItems, setLoadingItems] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/playlists")
      .then((r) => r.json())
      .then((d) => setPlaylists(d.playlists || []));
  }, []);

  async function toggleExpand(id: number) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    if (!items[id]) {
      setLoadingItems(id);
      const res = await fetch(`/api/playlists/${id}/items`);
      const d = await res.json();
      setItems((prev) => ({ ...prev, [id]: d.items || [] }));
      setLoadingItems(null);
    }
  }

  return (
    <main style={{ backgroundColor: "#0A0F1C", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider uppercase"
              style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.2)" }}
            >
              <PlayCircle size={12} />
              Content Library
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6" style={{ color: "#F1F5F9" }}>
              Video &amp; Podcast Library
            </h1>
            <p className="text-xl" style={{ color: "#94A3B8" }}>
              Curated playlists, in-depth case studies, and career growth resources — available on demand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 sm:px-6 lg:px-8 pb-8"
          >
            <div className="max-w-4xl mx-auto">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 0 60px rgba(139,92,246,0.15)" }}
              >
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtube_id}?autoplay=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-5" style={{ backgroundColor: "rgba(15,23,42,0.9)" }}>
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#F1F5F9" }}>{activeVideo.title}</h3>
                  {activeVideo.description && (
                    <p className="text-sm" style={{ color: "#94A3B8" }}>{activeVideo.description}</p>
                  )}
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="mt-3 text-xs"
                    style={{ color: "#64748B" }}
                  >
                    Close Player
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Playlists */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {playlists.map((playlist, i) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              {/* Playlist Card */}
              <button
                onClick={() => toggleExpand(playlist.id)}
                className="w-full text-left rounded-2xl p-6 transition-all duration-200"
                style={{
                  background: expanded === playlist.id
                    ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.06))"
                    : "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.6))",
                  border: expanded === playlist.id
                    ? "1px solid rgba(139,92,246,0.35)"
                    : "1px solid rgba(30,41,59,0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: playlist.type === "podcast" ? "rgba(239,68,68,0.12)" : "rgba(139,92,246,0.12)",
                        border: playlist.type === "podcast" ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(139,92,246,0.2)",
                      }}
                    >
                      {playlist.type === "podcast"
                        ? <Mic size={22} style={{ color: "#EF4444" }} />
                        : <PlayCircle size={22} style={{ color: "#8B5CF6" }} />
                      }
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg" style={{ color: "#F1F5F9" }}>{playlist.name}</h3>
                        <span
                          className="px-2 py-0.5 text-xs rounded-md font-medium"
                          style={{
                            backgroundColor: playlist.type === "podcast" ? "rgba(239,68,68,0.1)" : "rgba(139,92,246,0.1)",
                            color: playlist.type === "podcast" ? "#EF4444" : "#8B5CF6",
                          }}
                        >
                          {playlist.type === "podcast" ? "Podcast" : "Video"}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#94A3B8" }}>{playlist.description}</p>
                    </div>
                  </div>
                  <div style={{ color: "#64748B" }}>
                    {expanded === playlist.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </button>

              {/* Expanded Items */}
              <AnimatePresence>
                {expanded === playlist.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="rounded-b-2xl p-4 space-y-3 mt-1"
                      style={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(30,41,59,0.6)", borderTop: "none" }}
                    >
                      {loadingItems === playlist.id ? (
                        <div className="space-y-3">
                          {[1, 2].map((n) => (
                            <div key={n} className="h-16 rounded-xl animate-pulse" style={{ backgroundColor: "rgba(30,41,59,0.5)" }} />
                          ))}
                        </div>
                      ) : (items[playlist.id] || []).length === 0 ? (
                        <p className="text-sm py-4 text-center" style={{ color: "#64748B" }}>No videos yet in this playlist.</p>
                      ) : (
                        (items[playlist.id] || []).map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveVideo(item)}
                            className="w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-150 group"
                            style={{
                              backgroundColor: activeVideo?.id === item.id ? "rgba(139,92,246,0.15)" : "rgba(30,41,59,0.4)",
                              border: activeVideo?.id === item.id ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (activeVideo?.id !== item.id) {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(30,41,59,0.7)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeVideo?.id !== item.id) {
                                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(30,41,59,0.4)";
                              }
                            }}
                          >
                            {item.thumbnail ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-20 h-12 object-cover rounded-lg flex-shrink-0"
                              />
                            ) : (
                              <div className="w-20 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "rgba(30,41,59,0.8)" }}>
                                <PlayCircle size={20} style={{ color: "#8B5CF6" }} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate" style={{ color: "#F1F5F9" }}>{item.title}</p>
                              {item.description && (
                                <p className="text-xs truncate mt-0.5" style={{ color: "#64748B" }}>{item.description}</p>
                              )}
                            </div>
                            {item.duration && (
                              <span className="text-xs flex-shrink-0" style={{ color: "#64748B" }}>{item.duration}</span>
                            )}
                            <ExternalLink size={14} style={{ color: "#64748B" }} className="flex-shrink-0" />
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
