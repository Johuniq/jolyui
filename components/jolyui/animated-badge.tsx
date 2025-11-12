"use client";

import { motion } from "motion/react";

interface AnimatedBadgeProps {
  children: string;
  variant?: "pulse" | "glow" | "bounce";
  className?: string;
}

export function AnimatedBadge({
  children,
  variant = "glow",
  className = "",
}: AnimatedBadgeProps) {
  const variants = {
    pulse: {
      scale: [1, 1.05, 1],
    },
    glow: {
      boxShadow: [
        "0 0 0px rgba(139, 92, 246, 0)",
        "0 0 20px rgba(139, 92, 246, 0.5)",
        "0 0 0px rgba(139, 92, 246, 0)",
      ],
    },
    bounce: {
      y: [0, -4, 0],
    },
  };

  return (
    <motion.div
      animate={variants[variant]}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white ${className}`}
    >
      {children}
    </motion.div>
  );
}
