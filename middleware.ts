import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.INTERACTIVE_CONTENT_JWT_SECRET || "change-this-secret-in-production";
const COOKIE_NAME = "ic_session";

// Protect all main-course concept pages (modules 2–5: concept_2_*, concept_3_*, concept_4_*, concept_5_*)
// Pre-course pages (concept_1_*), pre-course.html, and main-course.html itself remain public.
const PROTECTED_PATTERN = /^\/interactive_concepts\/concept_[2-5]_/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!PROTECTED_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return redirectToLogin(req, pathname);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const response = redirectToLogin(req, pathname);
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }
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
