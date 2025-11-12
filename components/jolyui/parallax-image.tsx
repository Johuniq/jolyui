"use client";
import React, { useEffect, useRef } from "react";

export type IconSpec = {
  id: string;
  src: string; // path under /public or an external url
  left?: string; // Tailwind arbitrary or percent e.g. "12%" or "left-[12%]"
  top?: string; // e.g. "-top-[80px]" or "-top-[100px]"
  width?: string; // e.g. "w-[130px]"
  height?: string; // e.g. "h-[130px]"
  rotate?: string; // e.g. "rotate-[6deg]" or "-rotate-[10deg]"
  factor?: number; // parallax factor
  label?: string; // optional small label text
  labelClassName?: string;
  hiddenOnMobile?: boolean; // default true
};

export interface ParallaxImageProps {
  children?: React.ReactNode;
  className?: string;
  icons?: IconSpec[];
  // global multipliers to tune movement
  xMultiplier?: number;
  yMultiplier?: number;
}

const DEFAULT_ICONS: IconSpec[] = [
  {
    id: "fill",
    src: "/fill.gif",
    left: "12%",
    top: "-80px",
    width: "120px",
    height: "120px",
    rotate: "-10deg",
    factor: 1.25,
    label: "Tiny Fill",
  },
  {
    id: "command",
    src: "/command.gif",
    left: "30%",
    top: "-100px",
    width: "130px",
    height: "130px",
    rotate: "6deg",
    factor: 0.75,
    label: "Command",
  },
  {
    id: "face",
    src: "/face-id.gif",
    left: "48%",
    top: "-140px",
    width: "120px",
    height: "120px",
    rotate: "4deg",
    factor: 0.5,
    label: "Face ID",
  },
  {
    id: "cellar",
    src: "/cellar.gif",
    left: "66%",
    top: "-100px",
    width: "130px",
    height: "130px",
    rotate: "-4deg",
    factor: 1,
    label: "Cellar",
  },
  {
    id: "pay",
    src: "/pay-bitcoin.gif",
    left: "82%",
    top: "-80px",
    width: "130px",
    height: "130px",
    rotate: "8deg",
    factor: 1.5,
    label: "Pay",
  },
];

function makePositionClass(
  left?: string,
  top?: string,
  w?: string,
  h?: string,
  rotate?: string
) {
  // We'll set inline style for left/top/width/height/rotate to keep arbitrary values simple.
  const style: React.CSSProperties = {};
  if (left) {
    // accept percentages like "12%" or pixel strings like "120px"
    style.left = left.includes("%") || left.includes("px") ? left : left;
  }
  if (top) style.top = top.includes("%") || top.includes("px") ? top : top;
  if (w) style.width = w;
  if (h) style.height = h;
  if (rotate) style.transform = `rotate(${rotate})`;
  return style;
}

export function ParallaxImage({
  children,
  className = "",
  icons = DEFAULT_ICONS,
  xMultiplier = 60,
  yMultiplier = 80,
}: ParallaxImageProps) {
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!parallaxRef.current) return;

    const elements = parallaxRef.current.querySelectorAll<HTMLElement>(
      "[data-parallax-factor]"
    );

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      elements.forEach((el) => {
        const factor = Number(
          parseFloat(el.getAttribute("data-parallax-factor") || "1")
        );
        // If the element already contains a rotate transform (from inline style),
        // we only append translate3d so rotation is preserved.
        el.style.transform = `${el.style.transform.replace(/translate3d\([^)]*\)/, "")} translate3d(${
          x * factor * xMultiplier
        }px, ${y * factor * yMultiplier}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [xMultiplier, yMultiplier]);

  return (
    <div
      ref={parallaxRef}
      className={`relative w-full flex justify-center ${className}`}
    >
      {icons.map((ic) => {
        const style = makePositionClass(
          ic.left,
          ic.top,
          ic.width,
          ic.height,
          ic.rotate
        );
        // ensure initial transform doesn't wipe rotation: set it to the rotate value if present
        if (ic.rotate) style.transform = `rotate(${ic.rotate})`;
        const mobileHidden = ic.hiddenOnMobile ?? true;

        return (
          <div
            key={ic.id}
            data-parallax-factor={(ic.factor ?? 1).toString()}
            // absolute positioned element; we use inline style for precise values
            className={`${
              mobileHidden ? "hidden md:flex" : "flex"
            } absolute z-[-1] bg-no-repeat bg-center pointer-events-none items-center justify-center`}
            style={{
              ...style,
              backgroundImage: `url(${ic.src})`,
              backgroundSize: "80%",
            }}
            aria-hidden
          >
            {ic.label ? (
              <span
                className={`absolute top-[110%] text-sm font-medium ${ic.labelClassName ?? ""}`}
                // label is positioned relative to its parent absolute container
              >
                {ic.label}
              </span>
            ) : null}
          </div>
        );
      })}

      {children && <div className="relative z-10 ">{children}</div>}
    </div>
  );
}
