import { motion, useInView, useSpring, useTransform } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

type EasingType =
  | "linear"
  | "easeOut"
  | "easeIn"
  | "easeInOut"
  | "spring"
  | "bounce";

interface NumberCounterProps {
  value: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  separator?: string;
  decimalSeparator?: string;
  prefix?: string;
  suffix?: string;
  easing?: EasingType;
  className?: string;
  once?: boolean;
  formatFn?: (value: number) => string;
}

// Easing functions for CSS-based animation
const easingFunctions: Record<EasingType, number[]> = {
  linear: [0, 0, 1, 1],
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.7, 0, 0.84, 0],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.68, -0.55, 0.27, 1.55],
};

// Format number with separators
const formatNumber = (
  value: number,
  decimals: number,
  separator: string,
  decimalSeparator: string,
): string => {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");

  const formattedInt = (intPart || "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separator,
  );

  return decPart
    ? `${formattedInt}${decimalSeparator}${decPart}`
    : formattedInt;
};

// Animated digit component for rolling effect
const AnimatedDigit = ({
  digit,
  delay = 0,
}: {
  digit: string;
  delay?: number;
}) => {
  const isNumber = /\d/.test(digit);

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  const num = parseInt(digit, 10);

  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden">
      <motion.span
        className="absolute top-0 left-0 flex w-full flex-col items-center"
        initial={{ y: "-100%" }}
        animate={{ y: `${-num * 10}%` }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] leading-none">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

// Spring-based counter using useSpring
const SpringCounter = ({
  value,
  from = 0,
  decimals = 0,
  separator = ",",
  decimalSeparator = ".",
  prefix = "",
  suffix = "",
  className,
  once = true,
  formatFn,
  duration = 2,
  delay = 0,
}: NumberCounterProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once });
  const [displayValue, setDisplayValue] = React.useState(from);

  const springValue = useSpring(from, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, springValue, delay]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  const formatted = formatFn
    ? formatFn(displayValue)
    : formatNumber(displayValue, decimals, separator, decimalSeparator);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

// Main NumberCounter component
const NumberCounter = React.forwardRef<HTMLSpanElement, NumberCounterProps>(
  (
    {
      value,
      from = 0,
      duration = 2,
      delay = 0,
      decimals = 0,
      separator = ",",
      decimalSeparator = ".",
      prefix = "",
      suffix = "",
      easing = "easeOut",
      className,
      once = true,
      formatFn,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once });
    const [count, setCount] = React.useState(from);

    React.useEffect(() => {
      if (!isInView) return;

      const startTime = Date.now() + delay * 1000;
      const endTime = startTime + duration * 1000;

      // Cubic bezier easing function
      const bezier = easingFunctions[easing] || easingFunctions.linear;
      const cubicBezier = (t: number): number => {
        const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = bezier;
        // Simplified cubic bezier approximation
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        const cy = 3 * y1;
        const by = 3 * (y2 - y1) - cy;
        const ay = 1 - cy - by;

        const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
        const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;

        // Newton-Raphson iteration for finding t given x
        let x = t;
        for (let i = 0; i < 8; i++) {
          const currentX = sampleCurveX(x) - t;
          if (Math.abs(currentX) < 0.0001) break;
          const dx = (3 * ax * x + 2 * bx) * x + cx;
          if (Math.abs(dx) < 0.0001) break;
          x -= currentX / dx;
        }

        return sampleCurveY(x);
      };

      let animationFrame: number;

      const animate = () => {
        const now = Date.now();

        if (now < startTime) {
          animationFrame = requestAnimationFrame(animate);
          return;
        }

        if (now >= endTime) {
          setCount(value);
          return;
        }

        const elapsed = now - startTime;
        const total = endTime - startTime;
        const progress = elapsed / total;
        const easedProgress = cubicBezier(progress);

        const currentValue = from + (value - from) * easedProgress;
        setCount(currentValue);

        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, from, duration, delay, easing]);

    const formatted = formatFn
      ? formatFn(count)
      : formatNumber(count, decimals, separator, decimalSeparator);

    return (
      <span ref={containerRef} className={cn("tabular-nums", className)}>
        {prefix}
        <span ref={ref}>{formatted}</span>
        {suffix}
      </span>
    );
  },
);

NumberCounter.displayName = "NumberCounter";

// Rolling digits counter
interface RollingCounterProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

const RollingCounter = React.forwardRef<HTMLSpanElement, RollingCounterProps>(
  ({ value, className, prefix = "", suffix = "", separator = "," }, ref) => {
    const containerRef = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true });

    const formattedValue = formatNumber(value, 0, separator, ".");
    const digits = formattedValue.split("");

    return (
      <span
        ref={containerRef}
        className={cn("inline-flex tabular-nums", className)}
      >
        {prefix && <span>{prefix}</span>}
        <span ref={ref} className="inline-flex">
          {isInView &&
            digits.map((digit, index) => (
              <AnimatedDigit
                key={`${index}-${digit}`}
                digit={digit}
                delay={index * 0.05}
              />
            ))}
        </span>
        {suffix && <span>{suffix}</span>}
      </span>
    );
  },
);

RollingCounter.displayName = "RollingCounter";

// Percentage counter with circular progress
interface CircularCounterProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  duration?: number;
  color?: string;
  trackColor?: string;
}

const CircularCounter = React.forwardRef<HTMLDivElement, CircularCounterProps>(
  (
    {
      value,
      size = 120,
      strokeWidth = 8,
      className,
      duration = 2,
      color = "hsl(var(--primary))",
      trackColor = "hsl(var(--muted))",
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true });

    const springValue = useSpring(0, {
      duration: duration * 1000,
      bounce: 0,
    });

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    const offset = useTransform(springValue, [0, 100], [circumference, 0]);
    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    React.useEffect(() => {
      if (isInView) {
        springValue.set(value);
      }
    }, [isInView, value, springValue]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative inline-flex items-center justify-center",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: offset }}
          />
        </svg>
        <div
          ref={ref}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-bold tabular-nums leading-none"
            style={{ fontSize: size * 0.22 }}
          >
            <motion.span>{rounded}</motion.span>%
          </span>
        </div>
      </div>
    );
  },
);

CircularCounter.displayName = "CircularCounter";

// Compact counter for stats
interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const StatCounter = React.forwardRef<HTMLDivElement, StatCounterProps>(
  (
    { value, label, prefix = "", suffix = "", decimals = 0, className },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("text-center", className)}>
        <NumberCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          duration={2.5}
          easing="easeOut"
          className="font-bold text-4xl text-foreground"
        />
        <p className="mt-2 text-muted-foreground text-sm">{label}</p>
      </div>
    );
  },
);

StatCounter.displayName = "StatCounter";

export {
  CircularCounter,
  formatNumber,
  NumberCounter,
  RollingCounter,
  SpringCounter,
  StatCounter,
};
export type {
  CircularCounterProps,
  EasingType,
  NumberCounterProps,
  RollingCounterProps,
  StatCounterProps,
};
