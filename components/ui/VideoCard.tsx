"use client";

import { motion } from "framer-motion";
import { Play, Eye, Calendar } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";
import { YOUTUBE_CHANNEL_URL } from "@/lib/constants";

interface VideoCardProps {
  video: YouTubeVideo;
  index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
  const videoUrl = video.id.startsWith("placeholder")
    ? YOUTUBE_CHANNEL_URL
    : `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <motion.a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group block rounded-xl overflow-hidden"
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        border: "1px solid rgba(30, 41, 59, 0.8)",
        backdropFilter: "blur(12px)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(59, 130, 246, 0.3)";
        el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(30, 41, 59, 0.8)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "#0F172A" }}>
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.3)" }}
            >
              <Play size={20} style={{ color: "#3B82F6" }} />
            </div>
          </div>
        )}
        {/* Play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(10, 15, 28, 0.5)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(59, 130, 246, 0.9)",
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
          >
            <Play size={22} className="ml-1" style={{ color: "#fff" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-semibold text-sm leading-snug mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
          style={{ color: "#F1F5F9" }}
        >
          {video.title}
        </h3>
        <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {video.viewCount} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {video.publishedAt}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
