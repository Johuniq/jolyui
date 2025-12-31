import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const highlightVariants = cva("relative inline-block", {
  variants: {
    variant: {
      underline: "",
      box: "",
      circle: "",
      marker: "",
    },
    color: {
      primary:
        "[--highlight-color:hsl(var(--highlight-primary))] [&_path]:[stroke:var(--highlight-color)]",
      secondary:
        "[--highlight-color:hsl(var(--highlight-secondary))] [&_path]:[stroke:var(--highlight-color)]",
      accent:
        "[--highlight-color:hsl(var(--highlight-accent))] [&_path]:[stroke:var(--highlight-color)]",
      destructive:
        "[--highlight-color:hsl(var(--highlight-destructive))] [&_path]:[stroke:var(--highlight-color)]",
    },
  },
  defaultVariants: {
    variant: "underline",
    color: "primary",
  },
});

type HighlightColor = "primary" | "secondary" | "accent" | "destructive";
type HighlightVariant = "underline" | "box" | "circle" | "marker";

export interface HighlightTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children: React.ReactNode;
  variant?: HighlightVariant;
  color?: HighlightColor;
  animationDuration?: number;
  animationDelay?: number;
  strokeWidth?: number;
  animate?: boolean;
}

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(
  (
    {
      className,
      variant = "underline",
      color = "primary",
      children,
      animationDuration = 0.8,
      animationDelay = 0,
      strokeWidth = 2,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(!animate);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const containerRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
      const element = containerRef.current;
      if (!element) return;

      const updateDimensions = () => {
        setDimensions({
          width: element.offsetWidth,
          height: element.offsetHeight,
        });
      };

      updateDimensions();

      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(element);

      return () => resizeObserver.disconnect();
    }, []);

    React.useEffect(() => {
      if (!animate) {
        setIsVisible(true);
        return;
      }

      const element = containerRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5, rootMargin: "0px 0px -50px 0px" },
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [animate]);

    const renderHighlight = () => {
      const { width, height } = dimensions;
      if (width === 0 || height === 0) return null;

      const padding = 8;
      const svgWidth = width + padding * 2;
      const svgHeight = height + padding * 2;

      const baseStyles: React.CSSProperties = {
        position: "absolute",
        top: -padding,
        left: -padding,
        width: svgWidth,
        height: svgHeight,
        pointerEvents: "none",
        overflow: "visible",
      };

      const pathStyles: React.CSSProperties = {
        fill: "none",
        stroke: "var(--highlight-color)",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        transition: `stroke-dashoffset ${animationDuration}s cubic-bezier(0.65, 0, 0.35, 1) ${animationDelay}s`,
      };

      switch (variant) {
        case "underline": {
          const y = svgHeight - padding + 2;
          const pathLength = width + 10;
          const d = `M ${padding - 2} ${y} Q ${padding + width * 0.25} ${y - 3} ${padding + width * 0.5} ${y} T ${padding + width + 2} ${y}`;

          return (
            <svg style={baseStyles} aria-hidden="true">
              <path
                d={d}
                style={{
                  ...pathStyles,
                  strokeDasharray: pathLength,
                  strokeDashoffset: isVisible ? 0 : pathLength,
                }}
              />
            </svg>
          );
        }

        case "box": {
          const boxPadding = 4;
          const pathLength = (width + height + boxPadding * 2) * 2 + 20;
          const d = `
            M ${padding - boxPadding} ${padding - boxPadding + 2}
            L ${padding + width + boxPadding} ${padding - boxPadding}
            L ${padding + width + boxPadding + 2} ${padding + height + boxPadding}
            L ${padding - boxPadding + 1} ${padding + height + boxPadding + 2}
            Z
          `;

          return (
            <svg style={baseStyles} aria-hidden="true">
              <path
                d={d}
                style={{
                  ...pathStyles,
                  strokeDasharray: pathLength,
                  strokeDashoffset: isVisible ? 0 : pathLength,
                }}
              />
            </svg>
          );
        }

        case "circle": {
          const cx = padding + width / 2;
          const cy = padding + height / 2;
          const rx = width / 2 + 6;
          const ry = height / 2 + 6;
          const pathLength = Math.PI * 2 * Math.max(rx, ry);

          // Hand-drawn ellipse using bezier curves
          const d = `
            M ${cx - rx} ${cy}
            C ${cx - rx} ${cy - ry * 0.55} ${cx - rx * 0.55} ${cy - ry - 2} ${cx} ${cy - ry}
            C ${cx + rx * 0.55} ${cy - ry + 2} ${cx + rx + 1} ${cy - ry * 0.55} ${cx + rx} ${cy + 2}
            C ${cx + rx - 1} ${cy + ry * 0.55} ${cx + rx * 0.55} ${cy + ry + 1} ${cx - 2} ${cy + ry}
            C ${cx - rx * 0.55} ${cy + ry - 1} ${cx - rx + 2} ${cy + ry * 0.55} ${cx - rx} ${cy}
          `;

          return (
            <svg style={baseStyles} aria-hidden="true">
              <path
                d={d}
                style={{
                  ...pathStyles,
                  strokeDasharray: pathLength,
                  strokeDashoffset: isVisible ? 0 : pathLength,
                }}
              />
            </svg>
          );
        }

        case "marker": {
          const markerHeight = height + 4;
          const y1 = padding - 2;
          const _y2 = padding + markerHeight;

          return (
            <svg style={baseStyles} aria-hidden="true">
              <rect
                x={padding - 2}
                y={y1}
                width={width + 4}
                height={markerHeight}
                rx={2}
                style={{
                  fill: "var(--highlight-color)",
                  opacity: isVisible ? 0.3 : 0,
                  transition: `opacity ${animationDuration}s cubic-bezier(0.65, 0, 0.35, 1) ${animationDelay}s`,
                }}
              />
            </svg>
          );
        }

        default:
          return null;
      }
    };

    return (
      <span
        ref={(node) => {
          (
            containerRef as React.MutableRefObject<HTMLSpanElement | null>
          ).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(highlightVariants({ variant, color, className }))}
        {...props}
      >
        {renderHighlight()}
        <span className="relative z-10">{children}</span>
      </span>
    );
  },
);

HighlightText.displayName = "HighlightText";

export { HighlightText, highlightVariants };
