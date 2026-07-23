import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_SSL: process.env.DB_SSL,
    INTERACTIVE_CONTENT_JWT_SECRET: process.env.INTERACTIVE_CONTENT_JWT_SECRET,
  },
  outputFileTracingIncludes: {
    "/interactive_concepts/\\[\\.\\.\\.path\\]": ["./private-content/interactive_concepts/**/*"],
  },
};

export default nextConfig;
