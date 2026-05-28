import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ValueProps from "@/components/sections/ValueProps";
import AgenticAIShowcase from "@/components/sections/AgenticAIShowcase";
import InteractiveLearningShowcase from "@/components/sections/InteractiveLearningShowcase";
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
      <AgenticAIShowcase />
      <InteractiveLearningShowcase />
      <MockInterviewShowcase />
      <YouTubeShowcase />
      <StatsCounter />
      <TestimonialCarousel />
      <BlogPreview />
    </>
  );
}
