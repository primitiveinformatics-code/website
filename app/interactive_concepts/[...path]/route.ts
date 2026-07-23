import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSessionFromRequest } from "@/lib/interactiveContentAuth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const CONTENT_DIR = path.join(process.cwd(), "private-content", "interactive_concepts");
const FILENAME_PATTERN = /^(main-course|concept_[2-5]_\d+)\.html$/;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (!segments || segments.length !== 1 || !FILENAME_PATTERN.test(segments[0])) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = segments[0];

  const session = await getSessionFromRequest(req);
  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/interactive-content/login";
    loginUrl.search = `?redirect=${encodeURIComponent(`/interactive_concepts/${filename}`)}`;
    return NextResponse.redirect(loginUrl);
  }

  try {
    const html = await readFile(path.join(CONTENT_DIR, filename), "utf-8");
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=UTF-8" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
