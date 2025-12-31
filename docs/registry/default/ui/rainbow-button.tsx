import { motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  animated?: boolean;
}

const RainbowButton = React.forwardRef<HTMLButtonElement, RainbowButtonProps>(
  (
    {
      children,
      colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"],
      duration = 2,
      borderWidth = 2,
      animated = true,
      className,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const gradientColors = colors.join(", ");

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        style={{ padding: borderWidth }}
        {...props}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
          }}
          animate={
            animated
              ? {
                  "--gradient-angle": ["0deg", "360deg"],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
        />
        {/* Button content */}
        <span
          className="relative z-10 flex items-center gap-2 rounded-md bg-background px-6 py-2.5 font-medium text-sm transition-colors hover:bg-background/90"
          style={{
            borderRadius: `calc(0.5rem - ${borderWidth}px)`,
          }}
        >
          {children}
        </span>
      </button>
    );
  },
);
RainbowButton.displayName = "RainbowButton";

export { RainbowButton };
