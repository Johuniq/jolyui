import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Basic Cursor Follower
interface CursorFollowerProps {
  size?: number;
  color?: string;
  smoothness?: number;
  className?: string;
}

export function CursorFollower({
  size = 20,
  color = "hsl(var(--primary))",
  smoothness = 0.15,
  className,
}: CursorFollowerProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 * (1 - smoothness) };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, size]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference",
        className,
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
}

// Cursor with Ring
interface CursorRingProps {
  dotSize?: number;
  ringSize?: number;
  dotColor?: string;
  ringColor?: string;
  ringWidth?: number;
  className?: string;
}

export function CursorRing({
  dotSize = 8,
  ringSize = 40,
  dotColor = "hsl(var(--primary))",
  ringColor = "hsl(var(--primary))",
  ringWidth = 2,
  className,
}: CursorRingProps) {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const dotXSpring = useSpring(dotX, { damping: 30, stiffness: 500 });
  const dotYSpring = useSpring(dotY, { damping: 30, stiffness: 500 });
  const ringXSpring = useSpring(ringX, { damping: 20, stiffness: 200 });
  const ringYSpring = useSpring(ringY, { damping: 20, stiffness: 200 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX - dotSize / 2);
      dotY.set(e.clientY - dotSize / 2);
      ringX.set(e.clientX - ringSize / 2);
      ringY.set(e.clientY - ringSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dotX, dotY, ringX, ringY, dotSize, ringSize]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999]",
        className,
      )}
    >
      {/* Dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
      />
      {/* Ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          width: ringSize,
          height: ringSize,
          border: `${ringWidth}px solid ${ringColor}`,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

// Cursor Trail
interface CursorTrailProps {
  trailLength?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function CursorTrail({
  trailLength = 8,
  size = 12,
  color = "hsl(var(--primary))",
  className,
}: CursorTrailProps) {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );
  const idRef = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: idRef.current++ };
      setTrail((prev) => [...prev.slice(-(trailLength - 1)), newPoint]);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [trailLength]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999]",
        className,
      )}
    >
      {trail.map((point, index) => {
        const scale = (index + 1) / trail.length;
        const opacity = scale * 0.8;
        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity,
              scale,
              x: point.x - (size * scale) / 2,
              y: point.y - (size * scale) / 2,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              width: size * scale,
              height: size * scale,
              backgroundColor: color,
            }}
          />
        );
      })}
    </div>
  );
}

// Cursor Spotlight
interface CursorSpotlightProps {
  size?: number;
  opacity?: number;
  blur?: number;
  color?: string;
  className?: string;
}

export function CursorSpotlight({
  size = 300,
  opacity = 0.15,
  blur = 80,
  color = "hsl(var(--primary))",
  className,
}: CursorSpotlightProps) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const xSpring = useSpring(x, { damping: 30, stiffness: 200 });
  const ySpring = useSpring(y, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [x, y, size]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9998] rounded-full",
        className,
      )}
      style={{
        x: xSpring,
        y: ySpring,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

// Cursor Text
interface CursorTextProps {
  text?: string;
  size?: number;
  className?: string;
}

export function CursorText({
  text = "View",
  size = 80,
  className,
}: CursorTextProps) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const xSpring = useSpring(x, { damping: 25, stiffness: 300 });
  const ySpring = useSpring(y, { damping: 25, stiffness: 300 });

  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTextElement = target.closest(
        "[data-cursor-text]",
      ) as HTMLElement;
      if (cursorTextElement) {
        setCurrentText(cursorTextElement.dataset.cursorText || text);
        setIsVisible(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-text]")) {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y, size, text]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-primary font-medium text-primary-foreground text-sm",
            className,
          )}
          style={{
            x: xSpring,
            y: ySpring,
            width: size,
            height: size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentText}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cursor Morph
interface CursorMorphProps {
  defaultSize?: number;
  hoverSize?: number;
  color?: string;
  className?: string;
}

export function CursorMorph({
  defaultSize = 16,
  hoverSize: _hoverSize = 60,
  color = "hsl(var(--primary))",
  className,
}: CursorMorphProps) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const xSpring = useSpring(x, { damping: 25, stiffness: 400 });
  const ySpring = useSpring(y, { damping: 25, stiffness: 400 });

  const [size, setSize] = useState(defaultSize);
  const [borderRadius, setBorderRadius] = useState("50%");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const morphElement = target.closest("[data-cursor-morph]") as HTMLElement;
      if (morphElement) {
        const rect = morphElement.getBoundingClientRect();
        setSize(Math.max(rect.width, rect.height) + 20);
        setBorderRadius(getComputedStyle(morphElement).borderRadius || "8px");
      }
    };

    const handleMouseOut = () => {
      setSize(defaultSize);
      setBorderRadius("50%");
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y, size, defaultSize]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference",
        className,
      )}
      style={{
        x: xSpring,
        y: ySpring,
        backgroundColor: color,
      }}
      animate={{
        width: size,
        height: size,
        borderRadius,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    />
  );
}

// Cursor Emoji
interface CursorEmojiProps {
  emoji?: string;
  size?: number;
  className?: string;
}

export function CursorEmoji({
  emoji = "👆",
  size = 32,
  className,
}: CursorEmojiProps) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const xSpring = useSpring(x, { damping: 20, stiffness: 400 });
  const ySpring = useSpring(y, { damping: 20, stiffness: 400 });

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const moveCursor = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      x.set(e.clientX);
      y.set(e.clientY);
      setRotation(angle + 90);

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [x, y]);

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center",
        className,
      )}
      style={{
        x: xSpring,
        y: ySpring,
        fontSize: size,
        rotate: rotation,
      }}
    >
      {emoji}
    </motion.div>
  );
}

// Cursor Magnetic Area
interface CursorMagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function CursorMagnetic({
  children,
  strength = 0.3,
  className,
}: CursorMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { damping: 20, stiffness: 300 });
  const ySpring = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

export type {
  CursorEmojiProps,
  CursorFollowerProps,
  CursorMagneticProps,
  CursorMorphProps,
  CursorRingProps,
  CursorSpotlightProps,
  CursorTextProps,
  CursorTrailProps,
};
