import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  /** Reference to the container element */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Reference to the start element */
  fromRef: React.RefObject<HTMLElement | null>;
  /** Reference to the end element */
  toRef: React.RefObject<HTMLElement | null>;
  /** Curvature of the beam (-1 to 1, 0 is straight) */
  curvature?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Reverse the animation direction */
  reverse?: boolean;
  /** Width of the beam path */
  pathWidth?: number;
  /** Color of the beam gradient start */
  gradientStartColor?: string;
  /** Color of the beam gradient end */
  gradientStopColor?: string;
  /** Starting point offset */
  startXOffset?: number;
  startYOffset?: number;
  /** Ending point offset */
  endXOffset?: number;
  endYOffset?: number;
  className?: string;
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 2,
  delay = 0,
  reverse = false,
  pathWidth = 2,
  gradientStartColor = "#18181b",
  gradientStopColor = "#18181b",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  className,
}: AnimatedBeamProps) => {
  const [pathD, setPathD] = React.useState("");
  const [svgDimensions, setSvgDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const uniqueId = React.useId();

  const updatePath = React.useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    const startX =
      fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
    const startY =
      fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
    const endX =
      toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
    const endY =
      toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Calculate control point for quadratic bezier curve
    const dx = endX - startX;
    const dy = endY - startY;
    const controlX = midX - dy * curvature;
    const controlY = midY + dx * curvature;

    const path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
    setPathD(path);
    setSvgDimensions({
      width: containerRect.width,
      height: containerRect.height,
    });
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  React.useEffect(() => {
    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePath);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [updatePath, containerRef]);

  return (
    <svg
      className={cn(
        "pointer-events-none absolute top-0 left-0 h-full w-full",
        className,
      )}
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background path gradient */}
        <linearGradient
          id={`beam-gradient-bg-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0.1" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0.1" />
        </linearGradient>

        {/* Animated beam gradient */}
        <linearGradient
          id={`beam-gradient-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="5%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="95%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>

        {/* Glow filter */}
        <filter
          id={`beam-glow-${uniqueId}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Mask for animated beam */}
        <mask id={`beam-mask-${uniqueId}`}>
          <rect
            className="beam-mask-rect"
            x="-100%"
            y="0"
            width="50%"
            height="100%"
            fill="url(#beam-mask-gradient)"
            style={{
              animation: `beam-flow ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              animationDirection: reverse ? "reverse" : "normal",
            }}
          />
        </mask>

        <linearGradient
          id="beam-mask-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="black" />
          <stop offset="25%" stopColor="white" />
          <stop offset="75%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>

      {/* Background path */}
      <path
        d={pathD}
        stroke={`url(#beam-gradient-bg-${uniqueId})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        fill="none"
      />

      {/* Animated glowing beam */}
      <path
        d={pathD}
        stroke={`url(#beam-gradient-${uniqueId})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        fill="none"
        filter={`url(#beam-glow-${uniqueId})`}
        className="animated-beam-path"
        style={{
          strokeDasharray: "20 1000",
          strokeDashoffset: reverse ? "-1000" : "1000",
          animation: `beam-dash ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      />
    </svg>
  );
};

interface BeamContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BeamContainer = React.forwardRef<HTMLDivElement, BeamContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    );
  },
);
BeamContainer.displayName = "BeamContainer";

interface BeamNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const BeamNode = React.forwardRef<HTMLDivElement, BeamNodeProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-xl border bg-background p-3 shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
BeamNode.displayName = "BeamNode";

export {
  AnimatedBeam,
  BeamContainer,
  BeamNode,
  type AnimatedBeamProps,
  type BeamContainerProps,
  type BeamNodeProps,
};
