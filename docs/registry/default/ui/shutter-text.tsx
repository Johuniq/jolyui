"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ShutterTextProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  trigger?: "auto" | "scroll" | "click" | "hover";
}

export default function ShutterText({
  text = "IMMERSE",
  trigger = "auto",
  className = "",
  ...props
}: ShutterTextProps) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(trigger === "auto");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const characters = text.split("");

  // Handle scroll trigger
  useEffect(() => {
    if (trigger === "scroll" && isInView) {
      setActive(true);
      setCount((c) => c + 1);
    }
    if (trigger === "scroll" && !isInView) {
      setActive(false);
    }
  }, [trigger, isInView]);

  // Handle auto trigger – animate once on mount
  useEffect(() => {
    if (trigger === "auto") {
      setActive(true);
      setCount((c) => c + 1);
    }
  }, [trigger]);

  const handleClick = useCallback(() => {
    if (trigger === "click") {
      setActive(true);
      setCount((c) => c + 1);
    }
  }, [trigger]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover") {
      setActive(true);
      setCount((c) => c + 1);
    }
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === "hover") {
      setActive(false);
    }
  }, [trigger]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex flex-wrap items-center justify-center ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.span
            key={count}
            className="flex flex-wrap items-center justify-center"
          >
            {characters.map((char, i) => (
              <span
                key={i}
                className="relative inline-block overflow-hidden px-[0.1vw]"
              >
                {/* Main Character */}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                  className="inline-block font-black text-zinc-900 leading-none tracking-tighter dark:text-white"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>

                {/* Top Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-10 inline-block font-black text-indigo-600 leading-none dark:text-emerald-400"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                >
                  {char}
                </motion.span>

                {/* Middle Slice Layer */}
                <motion.span
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.1,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-10 inline-block font-black text-zinc-800 leading-none dark:text-zinc-200"
                  style={{
                    clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                  }}
                >
                  {char}
                </motion.span>

                {/* Bottom Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.2,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-10 inline-block font-black text-indigo-600 leading-none dark:text-emerald-400"
                  style={{
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
