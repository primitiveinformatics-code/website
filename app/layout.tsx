import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Primitive Informatics — AI-Powered Interview Prep & Expert Content",
    template: "%s | Primitive Informatics",
  },
  description:
    "Accelerate your career with AI-powered mock interviews and expert video content. Built for software engineers and educators who want to grow fast.",
  keywords: [
    "mock interviews",
    "AI interview prep",
    "software engineering",
    "career growth",
    "technical interviews",
    "online learning",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primitiveinformatics.com",
    siteName: "Primitive Informatics",
    title: "Primitive Informatics — AI-Powered Interview Prep & Expert Content",
    description:
      "Accelerate your career with AI-powered mock interviews and expert video content.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primitive Informatics",
    description: "AI-powered interview prep for working professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ backgroundColor: '#0A0F1C', color: '#F1F5F9' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
