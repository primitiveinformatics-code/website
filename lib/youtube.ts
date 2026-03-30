export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  publishedAt: string;
  channelTitle: string;
}

export interface YouTubeChannelStats {
  subscriberCount: string;
  videoCount: string;
}

export const PLACEHOLDER_VIDEOS: YouTubeVideo[] = [
  {
    id: "placeholder1",
    title: "System Design Interview: Design Twitter (Complete Walkthrough)",
    thumbnail: "",
    viewCount: "142,000",
    publishedAt: "2024-01-15",
    channelTitle: "Primitive Informatics",
  },
  {
    id: "placeholder2",
    title: "Top 10 Behavioral Interview Questions & How to Answer Them (STAR Method)",
    thumbnail: "",
    viewCount: "98,500",
    publishedAt: "2024-01-08",
    channelTitle: "Primitive Informatics",
  },
  {
    id: "placeholder3",
    title: "Dynamic Programming Patterns: Master These 7 Templates",
    thumbnail: "",
    viewCount: "215,000",
    publishedAt: "2023-12-20",
    channelTitle: "Primitive Informatics",
  },
  {
    id: "placeholder4",
    title: "How to Negotiate Your Salary: Scripts & Strategies That Work",
    thumbnail: "",
    viewCount: "76,300",
    publishedAt: "2023-12-05",
    channelTitle: "Primitive Informatics",
  },
];

function formatViewCount(count: string): string {
  const num = parseInt(count, 10);
  if (isNaN(num)) return count;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return count;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export async function getLatestVideos(maxResults = 4): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return PLACEHOLDER_VIDEOS.slice(0, maxResults);
  }

  try {
    // First get the uploads playlist ID
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) return PLACEHOLDER_VIDEOS.slice(0, maxResults);

    // Get latest videos from playlist
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const playlistData = await playlistRes.json();
    const videoIds = playlistData?.items?.map(
      (item: { snippet: { resourceId: { videoId: string } } }) => item.snippet.resourceId.videoId
    ).join(",");

    if (!videoIds) return PLACEHOLDER_VIDEOS.slice(0, maxResults);

    // Get video stats
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const statsData = await statsRes.json();

    return statsData?.items?.map((item: {
      id: string;
      snippet: { title: string; thumbnails: { maxres?: { url: string }; high?: { url: string } }; publishedAt: string; channelTitle: string };
      statistics: { viewCount: string };
    }) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || "",
      viewCount: formatViewCount(item.statistics.viewCount),
      publishedAt: formatDate(item.snippet.publishedAt),
      channelTitle: item.snippet.channelTitle,
    })) || PLACEHOLDER_VIDEOS.slice(0, maxResults);
  } catch {
    return PLACEHOLDER_VIDEOS.slice(0, maxResults);
  }
}

export async function getChannelStats(): Promise<YouTubeChannelStats> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return { subscriberCount: "50K+", videoCount: "500+" };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const stats = data?.items?.[0]?.statistics;
    return {
      subscriberCount: formatViewCount(stats?.subscriberCount || "0"),
      videoCount: formatViewCount(stats?.videoCount || "0"),
    };
  } catch {
    return { subscriberCount: "50K+", videoCount: "500+" };
  }
}
