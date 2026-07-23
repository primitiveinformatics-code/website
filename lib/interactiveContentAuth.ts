import { jwtVerify, SignJWT } from "jose";
import type { NextRequest } from "next/server";

export const COOKIE_NAME = "ic_session";
export const MAX_AGE = 60 * 60 * 8; // 8 hours

const PLACEHOLDER_SECRET = "change-this-secret-in-production";

export interface SessionPayload {
  userId: number;
  email: string;
  name: string | null;
}

function resolveSecret(): string {
  const secret = process.env.INTERACTIVE_CONTENT_JWT_SECRET;
  if (secret && secret !== PLACEHOLDER_SECRET) {
    return secret;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "INTERACTIVE_CONTENT_JWT_SECRET is not set to a real value in production. " +
        "Set it in the Amplify Console (Environment variables) and redeploy."
    );
  }
  console.warn(
    "INTERACTIVE_CONTENT_JWT_SECRET is not set; using an insecure development-only fallback."
  );
  return PLACEHOLDER_SECRET;
}

function getSecretKey() {
  return new TextEncoder().encode(resolveSecret());
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
