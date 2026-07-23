import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, getSessionFromRequest } from "@/lib/interactiveContentAuth";

// Protect the main-course landing page and all its concept pages (modules 2–5:
// concept_2_*, concept_3_*, concept_4_*, concept_5_*).
// Pre-course pages (concept_1_*) and pre-course.html remain public.
const PROTECTED_PATTERN = /^\/interactive_concepts\/(main-course\.html|concept_[2-5]_)/;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!PROTECTED_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const session = await getSessionFromRequest(req);

  if (!session) {
    const response = redirectToLogin(req, pathname);
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest, pathname: string) {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/interactive-content/login";
  loginUrl.search = `?redirect=${encodeURIComponent(pathname)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/interactive_concepts/:path*"],
};
