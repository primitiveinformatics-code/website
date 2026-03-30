"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
    color: "#fff",
    border: "none",
  },
  secondary: {
    background: "transparent",
    color: "#F1F5F9",
    border: "1px solid rgba(30, 41, 59, 1)",
  },
  ghost: {
    background: "transparent",
    color: "#94A3B8",
    border: "none",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, children, disabled, className = "", style, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        className={`relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ${sizeClasses[size]} ${className}`}
        style={{
          ...variantStyles[variant],
          boxShadow: variant === "primary" ? "0 0 24px rgba(59, 130, 246, 0.25)" : undefined,
          opacity: disabled || loading ? 0.6 : 1,
          cursor: disabled || loading ? "not-allowed" : "pointer",
          ...style,
        }}
        disabled={disabled || loading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && <Loader2 size={16} className="animate-spin mr-2" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
