import * as React from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  words: string[];
  className?: string;
  interval?: number;
  glitchDuration?: number;
}

const GlitchText = React.forwardRef<HTMLSpanElement, GlitchTextProps>(
  ({ words, className, interval = 3000, glitchDuration = 300 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isGlitching, setIsGlitching] = React.useState(false);
    const [displayText, setDisplayText] = React.useState(words[0] || "");

    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";

    React.useEffect(() => {
      const timer = setInterval(() => {
        setIsGlitching(true);

        const nextIndex = (currentIndex + 1) % words.length;
        const targetWord = words[nextIndex] || "";
        const iterations = 10;
        let iteration = 0;

        const glitchInterval = setInterval(() => {
          setDisplayText(
            targetWord
              .split("")
              .map((char, i) => {
                if (i < iteration) return char;
                return glitchChars[
                  Math.floor(Math.random() * glitchChars.length)
                ];
              })
              .join(""),
          );

          iteration += 1;
          if (iteration > targetWord.length) {
            clearInterval(glitchInterval);
            setDisplayText(targetWord);
            setCurrentIndex(nextIndex);
            setIsGlitching(false);
          }
        }, glitchDuration / iterations);
      }, interval);

      return () => clearInterval(timer);
    }, [currentIndex, words, interval, glitchDuration]);

    return (
      <span
        ref={ref}
        className={cn(
          "inline-block font-mono",
          isGlitching && "text-primary",
          className,
        )}
      >
        {displayText}
      </span>
    );
  },
);
GlitchText.displayName = "GlitchText";

export { GlitchText };
