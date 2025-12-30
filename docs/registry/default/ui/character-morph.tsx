import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface CharacterMorphProps {
  texts: string[];
  className?: string;
  interval?: number;
  staggerDelay?: number;
  charDuration?: number;
}

const CharacterMorph = React.forwardRef<HTMLDivElement, CharacterMorphProps>(
  (
    {
      texts,
      className,
      interval = 3000,
      staggerDelay = 0.03,
      charDuration = 0.5,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const currentText = texts[currentIndex] || "";

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, interval);

      return () => clearInterval(timer);
    }, [interval, texts.length]);

    const maxLength = Math.max(...texts.map((t) => t.length));

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex whitespace-nowrap", className)}
      >
        <AnimatePresence mode="popLayout">
          {currentText.split("").map((char, i) => (
            <motion.span
              key={`${currentIndex}-${i}-${char}`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)", rotateX: -90 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)", rotateX: 90 }}
              transition={{
                duration: charDuration,
                delay: i * staggerDelay,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
              style={{ transformStyle: "preserve-3d" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
        {/* Maintain minimum width */}
        <span className="invisible absolute">{"M".repeat(maxLength)}</span>
      </div>
    );
  },
);

CharacterMorph.displayName = "CharacterMorph";
export { CharacterMorph };
