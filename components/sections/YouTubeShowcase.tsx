import { ExternalLink } from "lucide-react";
import VideoCard from "@/components/ui/VideoCard";
import { getLatestVideos } from "@/lib/youtube";
import { YOUTUBE_CHANNEL_URL } from "@/lib/constants";

export default async function YouTubeShowcase() {
  const videos = await getLatestVideos(4);

  return (
    <section className="py-24" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "#EF4444",
                border: "1px solid rgba(239, 68, 68, 0.2)",
              }}
            >
              YouTube
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
              Learn from 500+ Free Videos
            </h2>
            <p className="mt-3 text-lg" style={{ color: "#94A3B8" }}>
              No fluff. Pure value. Free forever.
            </p>
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shrink-0 transition-all hover:scale-105"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#EF4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            Visit Our Channel
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
