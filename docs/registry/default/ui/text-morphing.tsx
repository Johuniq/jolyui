import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  words: string[];
  className?: string;
  interval?: number;
  animationDuration?: number;
}

const MorphingText = React.forwardRef<HTMLSpanElement, MorphingTextProps>(
  ({ words, className, interval = 3000, animationDuration = 0.5 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, interval);
      return () => clearInterval(timer);
    }, [words.length, interval]);

    return (
      <span ref={ref} className={cn("relative inline-block", className)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            className="inline-block"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  },
);
MorphingText.displayName = "MorphingText";
export { MorphingText };
