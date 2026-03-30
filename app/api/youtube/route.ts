import { NextResponse } from "next/server";
import { getLatestVideos, getChannelStats } from "@/lib/youtube";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "videos";
  const maxResults = parseInt(searchParams.get("maxResults") || "4", 10);

  try {
    if (type === "stats") {
      const stats = await getChannelStats();
      return NextResponse.json(stats);
    }

    const videos = await getLatestVideos(maxResults);
    return NextResponse.json(videos);
  } catch {
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
  }
}
