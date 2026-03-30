import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ValueProps from "@/components/sections/ValueProps";
import MockInterviewShowcase from "@/components/sections/MockInterviewShowcase";
import YouTubeShowcase from "@/components/sections/YouTubeShowcase";
import StatsCounter from "@/components/sections/StatsCounter";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import BlogPreview from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ValueProps />
      <MockInterviewShowcase />
      <YouTubeShowcase />
      <StatsCounter />
      <TestimonialCarousel />
      <BlogPreview />
    </>
  );
}
