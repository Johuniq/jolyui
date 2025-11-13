"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export type CursorVariant =
  | "default"
  | "text"
  | "grab"
  | "pointer"
  | "crosshair";

export type FigmaCursorProps = {
  label?: string;
  color?: string;
  hideNative?: boolean;
  size?: number;
  variant?: CursorVariant;
  /** smoothness - lower = snappier */
  stiffness?: number;
  damping?: number;
};

/**
 * Improved Figma-like cursor:
 * - smoother spring trailing for icon and bubble
 * - rotated pointer based on direction of movement
 * - clamps bubble to stay inside viewport
 * - respects prefers-reduced-motion
 * - touch fallback
 */
export default function FigmaCursor({
  label,
  color = "#7c3aed",
  hideNative = true,
  size = 1,
  variant = "default",
  stiffness = 260,
  damping = 28,
}: FigmaCursorProps) {
  // raw target mouse coords (updated by event listeners)
  const targetX = useMotionValue(-1000);
  const targetY = useMotionValue(-1000);

  // previous raw coords for computing direction
  const prev = useRef({ x: -1000, y: -1000, time: Date.now() });

  // clamps to keep bubble visible on screen
  function clampToViewport(
    x: number,
    y: number,
    bubbleWidth = 200,
    bubbleHeight = 40
  ) {
    const pad = 8;
    const vw = typeof window !== "undefined" ? window.innerWidth : 1000;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    let nx = x;
    let ny = y;
    // if bubble would overflow to the right, position to left of pointer
    if (x + bubbleWidth / 2 + pad > vw) nx = vw - bubbleWidth / 2 - pad;
    // if bubble would overflow to the left
    if (x - bubbleWidth / 2 - pad < 0) nx = bubbleWidth / 2 + pad;
    // vertical clamp
    if (y + bubbleHeight / 2 + pad > vh) ny = vh - bubbleHeight / 2 - pad;
    if (y - bubbleHeight / 2 - pad < 0) ny = bubbleHeight / 2 + pad;
    return [nx, ny];
  }

  // smooth springs for rendering (these follow targetX/targetY)
  const springX = useSpring(targetX, { stiffness, damping });
  const springY = useSpring(targetY, { stiffness, damping });

  // separate springs for the label (slightly more damped -> lags more)
  const labelTargetX = useMotionValue(-1000);
  const labelTargetY = useMotionValue(-1000);
  const labelSpringX = useSpring(labelTargetX, {
    stiffness: stiffness * 0.7,
    damping: damping * 1.2,
  });
  const labelSpringY = useSpring(labelTargetY, {
    stiffness: stiffness * 0.7,
    damping: damping * 1.2,
  });

  // rotation for pointer: stored as a motion value and smoothed
  const rot = useMotionValue(0);
  const rotSpring = useSpring(rot, { stiffness: 600, damping: 45 });

  // reduced-motion respect
  useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (mq && mq.matches) {
      // if user prefers reduced motion, make springs nearly instant and don't hide native cursor
      targetX.set(-1000);
      targetY.set(-1000);
      labelTargetX.set(-1000);
      labelTargetY.set(-1000);
      if (hideNative) document.documentElement.style.cursor = "auto";
    }
  }, [hideNative, targetX, targetY, labelTargetX, labelTargetY]);

  useEffect(() => {
    let mounted = true;

    const move = (e: MouseEvent) => {
      if (!mounted) return;
      const rawX = e.clientX;
      const rawY = e.clientY;

      // compute slight offset so pointer doesn't sit exactly at the tip
      const offsetX = 8;
      const offsetY = 6;
      const tx = rawX + offsetX;
      const ty = rawY + offsetY;

      // update main target
      targetX.set(tx);
      targetY.set(ty);

      // compute rotation from previous sampled coordinates
      const now = Date.now();
      const dx = rawX - prev.current.x;
      const dy = rawY - prev.current.y;
      const dt = Math.max(1, now - prev.current.time);
      // only update angle if movement > tiny threshold to avoid jitter
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // degrees
        // pointer SVGs expect rotation that points along movement; offset by 0 or -45 depending on your arrow
        rot.set(angle + 0); // tweak the offset if your arrow orientation is different
      }

      prev.current = { x: rawX, y: rawY, time: now };

      // compute label target and clamp to viewport so it never disappears.
      if (label) {
        // bubble sits to the right of pointer by default
        const bubbleWidth = Math.max(120, label.length * 8 + 48);
        const bubbleHeight = 36;
        const lx = tx + (bubbleWidth / 2 + 18) * (size || 1);
        const ly = ty;
        // if near right edge, place bubble to left
        const [clx, cly] = clampToViewport(lx, ly, bubbleWidth, bubbleHeight);
        labelTargetX.set(clx);
        labelTargetY.set(cly);
      }
    };

    const touchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const rawX = t.clientX;
      const rawY = t.clientY;
      const tx = rawX + 8;
      const ty = rawY + 6;
      targetX.set(tx);
      targetY.set(ty);
      if (label) {
        const bubbleWidth = Math.max(120, label.length * 8 + 48);
        const bubbleHeight = 36;
        const lx = tx + (bubbleWidth / 2 + 18) * (size || 1);
        const ly = ty;
        const [clx, cly] = clampToViewport(lx, ly, bubbleWidth, bubbleHeight);
        labelTargetX.set(clx);
        labelTargetY.set(cly);
      }
    };

    if (hideNative) document.documentElement.style.cursor = "none";

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });

    // cleanup
    return () => {
      mounted = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touchMove);
      if (hideNative) document.documentElement.style.cursor = "auto";
    };
  }, [
    hideNative,
    label,
    size,
    targetX,
    targetY,
    labelTargetX,
    labelTargetY,
    rot,
  ]);

  // pick SVG/icon by variant. They receive style for `transform` rotation via rotSpring.
  const Icon = ({ className = "" }: { className?: string }) => {
    const svgProps = {
      className,
      "aria-hidden": true,
      style: { display: "block" as const },
    };

    if (variant === "text") {
      return (
        <svg
          {...svgProps}
          width={12 * size}
          height={18 * size}
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 0v6m0 6V18"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (variant === "grab") {
      return (
        <svg
          {...svgProps}
          width={14 * size}
          height={14 * size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12v6a2 2 0 0 0 2 2h8"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (variant === "crosshair") {
      return (
        <svg
          {...svgProps}
          width={14 * size}
          height={14 * size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth={1.6}
          />
        </svg>
      );
    }

    // default arrow / pointer: rotate based on rotSpring
    return (
      <motion.svg
        {...svgProps}
        width={14 * size}
        height={18 * size}
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate: rotSpring }}
      >
        {/* arrow shape that points along +x by default; rotation aligns it */}
        <path d="M1 1l10 8-5 2 1 6-6-16z" fill="currentColor" />
      </motion.svg>
    );
  };

  // small shadow + outline style for that "Figma" crisp look
  const bubbleBg = "rgba(255,255,255,0.98)";
  const bubbleShadow = "0 10px 30px rgba(2,6,23,0.28)";

  return (
    <>
      {/* main icon (small square with icon) */}
      <motion.div
        style={{ x: springX, y: springY, scale: springX ? 1 : 1 }}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <div
          style={{
            transform: `scale(${size})`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            className="flex items-center justify-center rounded-sm"
            style={{
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color,
              boxShadow: "0 6px 12px rgba(2,6,23,0.18)",
              background: bubbleBg,
              borderRadius: 6,
              border: "1px solid rgba(15,23,42,0.06)",
            }}
          >
            <Icon />
          </div>
        </div>
      </motion.div>

      {/* label bubble (separate element that lags a bit more) */}
      {label ? (
        <motion.div
          style={{ x: labelSpringX, y: labelSpringY }}
          className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div
            className="select-none"
            style={{
              fontSize: 13,
              padding: "8px 10px",
              borderRadius: 10,
              background: bubbleBg,
              boxShadow: bubbleShadow,
              color: "#0f172a",
              border: `1px solid rgba(15,23,42,0.06)`,
              display: "flex",
              gap: 8,
              alignItems: "center",
              minWidth: 96,
              maxWidth: 280,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: color,
                boxShadow: `0 0 0 6px ${hexToRgba(color, 0.06)}`,
                flex: "0 0 10px",
              }}
            />
            <span
              style={{
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </span>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}

// helper: hex to rgba (robust)
function hexToRgba(hex: string, alpha = 1) {
  try {
    const cleaned = hex.replace("#", "");
    const full =
      cleaned.length === 3
        ? cleaned
            .split("")
            .map((c) => c + c)
            .join("")
        : cleaned;
    const bigint = parseInt(full, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return `rgba(124,58,237,${alpha})`;
  }
}
