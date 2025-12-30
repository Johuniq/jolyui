import * as React from "react";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the orbit in pixels */
  radius?: number;
  /** Duration of one full orbit in seconds */
  duration?: number;
  /** Delay before animation starts (stagger effect) */
  delay?: number;
  /** Reverse the orbit direction */
  reverse?: boolean;
  /** Size of the orbiting item */
  iconSize?: number;
  /** Path stroke color */
  pathColor?: string;
}

const OrbitingCircles = React.forwardRef<HTMLDivElement, OrbitingCirclesProps>(
  (
    {
      className,
      children,
      radius = 160,
      duration = 20,
      delay = 0,
      reverse = false,
      iconSize = 40,
      pathColor = "hsl(var(--border))",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "orbiting-circle absolute flex items-center justify-center rounded-full border bg-background/80 shadow-sm backdrop-blur-sm",
          className,
        )}
        style={
          {
            "--duration": `${duration}s`,
            "--delay": `${-delay}s`,
            "--radius": `${radius}px`,
            "--icon-size": `${iconSize}px`,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  },
);
OrbitingCircles.displayName = "OrbitingCircles";

interface OrbitingCirclesContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Show orbit path rings */
  showPaths?: boolean;
  /** Array of orbit radii to show as paths */
  pathRadii?: number[];
}

const OrbitingCirclesContainer = React.forwardRef<
  HTMLDivElement,
  OrbitingCirclesContainerProps
>(
  (
    { className, children, showPaths = true, pathRadii = [160], ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "orbiting-container relative flex h-[400px] w-full items-center justify-center",
          className,
        )}
        {...props}
      >
        {/* Orbit paths */}
        {showPaths &&
          pathRadii.map((radius) => (
            <svg
              key={radius}
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="opacity-40"
              />
            </svg>
          ))}
        {children}
      </div>
    );
  },
);
OrbitingCirclesContainer.displayName = "OrbitingCirclesContainer";

export {
  OrbitingCircles,
  OrbitingCirclesContainer,
  type OrbitingCirclesContainerProps,
  type OrbitingCirclesProps,
};
