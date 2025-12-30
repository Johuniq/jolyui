import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface VelocityMorphProps {
  texts: string[];
  className?: string;
  interval?: number;
}

const VelocityMorph = React.forwardRef<HTMLDivElement, VelocityMorphProps>(
  ({ texts, className, interval = 3000 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }, interval);

      return () => clearInterval(timer);
    }, [interval, texts.length]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden whitespace-nowrap p-2",
          className,
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.8,
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
            }}
            exit={{
              y: -40,
              opacity: 0,
              filter: "blur(10px)",
              scale: 0.8,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {texts[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);

VelocityMorph.displayName = "VelocityMorph";

export { VelocityMorph };
