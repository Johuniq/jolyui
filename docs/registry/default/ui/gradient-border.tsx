import { motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
  animated?: boolean;
}

const GradientBorder = React.forwardRef<HTMLDivElement, GradientBorderProps>(
  (
    {
      children,
      colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"],
      duration = 3,
      borderWidth = 2,
      borderRadius = "1rem",
      animated = true,
      className,
      ...props
    },
    ref,
  ) => {
    const gradientColors = colors.join(", ");

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ borderRadius }}
        {...props}
      >
        {/* Animated gradient background */}
        <motion.div
          className="-z-10 absolute inset-0"
          style={{
            borderRadius,
            background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
            padding: borderWidth,
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
        {/* Inner content */}
        <div
          className="relative h-full w-full bg-background"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
GradientBorder.displayName = "GradientBorder";

interface GradientBorderCardProps extends GradientBorderProps {
  glowEffect?: boolean;
  glowOpacity?: number;
}

const GradientBorderCard = React.forwardRef<
  HTMLDivElement,
  GradientBorderCardProps
>(
  (
    {
      children,
      colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"],
      duration = 3,
      borderWidth = 2,
      borderRadius = "1rem",
      animated = true,
      glowEffect = true,
      glowOpacity = 0.3,
      className,
      ...props
    },
    ref,
  ) => {
    const gradientColors = colors.join(", ");

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ borderRadius }}
        {...props}
      >
        {/* Glow effect */}
        {glowEffect && (
          <motion.div
            className="-z-20 absolute inset-0 blur-xl"
            style={{
              borderRadius,
              background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
              opacity: glowOpacity,
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
        )}
        {/* Gradient border */}
        <motion.div
          className="-z-10 absolute inset-0"
          style={{
            borderRadius,
            background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
            padding: borderWidth,
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
        {/* Inner content */}
        <div
          className="relative h-full w-full bg-card"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
GradientBorderCard.displayName = "GradientBorderCard";

interface GradientBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[];
  duration?: number;
  borderWidth?: number;
  animated?: boolean;
}

const GradientBorderButton = React.forwardRef<
  HTMLButtonElement,
  GradientBorderButtonProps
>(
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
GradientBorderButton.displayName = "GradientBorderButton";

interface ShimmerBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
}

const ShimmerBorder = React.forwardRef<HTMLDivElement, ShimmerBorderProps>(
  (
    {
      children,
      color = "hsl(var(--primary))",
      duration = 2,
      borderWidth = 1,
      borderRadius = "0.75rem",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        style={{ borderRadius, padding: borderWidth }}
        {...props}
      >
        {/* Static border */}
        <div className="absolute inset-0 bg-border" style={{ borderRadius }} />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Inner content */}
        <div
          className="relative h-full w-full bg-background"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
ShimmerBorder.displayName = "ShimmerBorder";

interface PulseBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  borderWidth?: number;
  borderRadius?: string;
}

const PulseBorder = React.forwardRef<HTMLDivElement, PulseBorderProps>(
  (
    {
      children,
      color = "hsl(var(--primary))",
      duration = 2,
      borderWidth = 2,
      borderRadius = "0.75rem",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ borderRadius }}
        {...props}
      >
        {/* Pulsing border */}
        <motion.div
          className="-z-10 absolute inset-0"
          style={{
            borderRadius,
            border: `${borderWidth}px solid ${color}`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Outer glow */}
        <motion.div
          className="-z-20 absolute inset-0 blur-md"
          style={{
            borderRadius,
            border: `${borderWidth * 2}px solid ${color}`,
          }}
          animate={{
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Inner content */}
        <div className="relative h-full w-full">{children}</div>
      </div>
    );
  },
);
PulseBorder.displayName = "PulseBorder";

export {
  GradientBorder,
  GradientBorderButton,
  GradientBorderCard,
  PulseBorder,
  ShimmerBorder,
};
