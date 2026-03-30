import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 tracking-wider uppercase"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            color: "#3B82F6",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          {badge}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
        style={{ color: "#F1F5F9" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
          style={{ color: "#94A3B8" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
