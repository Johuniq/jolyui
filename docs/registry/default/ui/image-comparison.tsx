import { GripHorizontal, GripVertical } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Basic Comparison Slider
interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initialPosition?: number;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
  sliderColor?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  initialPosition = 50,
  orientation = "horizontal",
  showLabels = true,
  sliderColor = "hsl(var(--background))",
}: ImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newPosition: number;

      if (orientation === "horizontal") {
        newPosition = ((clientX - rect.left) / rect.width) * 100;
      } else {
        newPosition = ((clientY - rect.top) / rect.height) * 100;
      }

      setPosition(Math.max(0, Math.min(100, newPosition)));
    },
    [orientation],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden rounded-xl",
        className,
      )}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath:
            orientation === "horizontal"
              ? `inset(0 ${100 - position}% 0 0)`
              : `inset(0 0 ${100 - position}% 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className={cn(
          "absolute z-10",
          orientation === "horizontal"
            ? "-translate-x-1/2 top-0 h-full w-0.5"
            : "-translate-y-1/2 left-0 h-0.5 w-full",
        )}
        style={{
          [orientation === "horizontal" ? "left" : "top"]: `${position}%`,
          backgroundColor: sliderColor,
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      />

      {/* Slider Handle */}
      <motion.div
        className={cn(
          "absolute z-20 flex cursor-grab items-center justify-center rounded-full border-2 bg-background shadow-lg active:cursor-grabbing",
          orientation === "horizontal"
            ? "-translate-x-1/2 -translate-y-1/2 h-10 w-10"
            : "-translate-x-1/2 -translate-y-1/2 h-10 w-10",
        )}
        style={{
          [orientation === "horizontal" ? "left" : "left"]:
            orientation === "horizontal" ? `${position}%` : "50%",
          [orientation === "horizontal" ? "top" : "top"]:
            orientation === "horizontal" ? "50%" : `${position}%`,
          borderColor: sliderColor,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {orientation === "horizontal" ? (
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        ) : (
          <GripHorizontal className="h-5 w-5 text-muted-foreground" />
        )}
      </motion.div>

      {/* Labels */}
      {showLabels && (
        <>
          <div
            className={cn(
              "absolute rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm",
              orientation === "horizontal" ? "top-3 left-3" : "top-3 left-3",
            )}
          >
            {beforeLabel}
          </div>
          <div
            className={cn(
              "absolute rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm",
              orientation === "horizontal"
                ? "top-3 right-3"
                : "bottom-3 left-3",
            )}
          >
            {afterLabel}
          </div>
        </>
      )}
    </div>
  );
}

// Hover Reveal Comparison
interface ImageComparisonHoverProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  showLabels?: boolean;
}

export function ImageComparisonHover({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  showLabels = true,
}: ImageComparisonHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  const handleMouseLeave = () => {
    setPosition(50);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative cursor-ew-resize select-none overflow-hidden rounded-xl",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Before Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Divider Line */}
      {/* <motion.div
        className="absolute top-0 h-full w-0.5 bg-background"
        animate={{ left: `${position}%` }}
        transition={{ type: "tween", duration: 0.1 }}
        style={{ transform: "translateX(-50%)", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}
      /> */}

      {/* Labels */}
      {showLabels && (
        <>
          <div className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
            {beforeLabel}
          </div>
          <div className="absolute top-3 right-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
            {afterLabel}
          </div>
        </>
      )}
    </div>
  );
}

// Split View Comparison
interface ImageComparisonSplitProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  gap?: number;
}

export function ImageComparisonSplit({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  gap = 4,
}: ImageComparisonSplitProps) {
  return (
    <div
      className={cn("flex overflow-hidden rounded-xl", className)}
      style={{ gap }}
    >
      <div className="relative flex-1 overflow-hidden">
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <img
          src={afterImage}
          alt={afterLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute right-3 bottom-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}

// Fade Toggle Comparison
interface ImageComparisonFadeProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  showLabels?: boolean;
}

export function ImageComparisonFade({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  showLabels = true,
}: ImageComparisonFadeProps) {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div
      className={cn(
        "group relative cursor-pointer select-none overflow-hidden rounded-xl",
        className,
      )}
      onClick={() => setShowBefore(!showBefore)}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Before Image with fade */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: showBefore ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Label */}
      {showLabels && (
        <motion.div
          className="-translate-x-1/2 absolute top-3 left-1/2 rounded-md bg-background/80 px-3 py-1.5 font-medium text-sm backdrop-blur-sm"
          key={showBefore ? "before" : "after"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {showBefore ? beforeLabel : afterLabel}
        </motion.div>
      )}

      {/* Click hint */}
      <div className="-translate-x-1/2 absolute bottom-3 left-1/2 rounded-md bg-background/80 px-2 py-1 text-muted-foreground text-xs opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        Click to toggle
      </div>
    </div>
  );
}

// Swipe Comparison
interface ImageComparisonSwipeProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function ImageComparisonSwipe({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: ImageComparisonSwipeProps) {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const clipPath = useTransform(
    x,
    [-containerWidth / 2, containerWidth / 2],
    [0, 100],
  );
  const displayClipPath = useTransform(
    clipPath,
    (v) => `inset(0 ${100 - (50 + v / 2)}% 0 0)`,
  );
  const linePosition = useTransform(clipPath, (v) => `${50 + v / 2}%`);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden rounded-xl",
        className,
      )}
    >
      {/* After Image */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Before Image */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: displayClipPath }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Slider Line */}
      <motion.div
        className="absolute top-0 h-full w-0.5 bg-background"
        style={{
          left: linePosition,
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      />

      {/* Draggable Handle */}
      <motion.div
        className="-translate-y-1/2 absolute top-1/2 left-1/2 z-20 flex h-12 w-12 cursor-grab items-center justify-center rounded-full border-2 border-background bg-background shadow-lg active:cursor-grabbing"
        drag="x"
        dragConstraints={{
          left: -containerWidth / 2 + 20,
          right: containerWidth / 2 - 20,
        }}
        dragElastic={0}
        style={{ x }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </motion.div>

      {/* Labels */}
      <div className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}

// Lens Comparison (magnifying glass effect)
interface ImageComparisonLensProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  lensSize?: number;
}

export function ImageComparisonLens({
  beforeImage,
  afterImage,
  className,
  lensSize = 150,
}: ImageComparisonLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative cursor-none select-none overflow-hidden rounded-xl",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Before"
        className="h-full w-full object-cover"
        draggable={false}
      />

      {/* Lens showing After Image */}
      <motion.div
        className="pointer-events-none absolute overflow-hidden rounded-full border-2 border-background shadow-2xl"
        style={{
          width: lensSize,
          height: lensSize,
          left: `calc(${lensPosition.x}% - ${lensSize / 2}px)`,
          top: `calc(${lensPosition.y}% - ${lensSize / 2}px)`,
        }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${afterImage})`,
            backgroundSize: containerRef.current
              ? `${containerRef.current.offsetWidth}px ${containerRef.current.offsetHeight}px`
              : "100% 100%",
            backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
          }}
        />
      </motion.div>

      {/* Labels */}
      <div className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
        Before
      </div>
      <div className="absolute top-3 right-3 rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm">
        Hover to see After
      </div>
    </div>
  );
}

export type {
  ImageComparisonFadeProps,
  ImageComparisonHoverProps,
  ImageComparisonLensProps,
  ImageComparisonProps,
  ImageComparisonSplitProps,
  ImageComparisonSwipeProps,
};
