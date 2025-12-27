import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import * as React from "react";

interface TypewriterTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorClassName?: string;
}

const TypewriterText = React.forwardRef<HTMLSpanElement, TypewriterTextProps>(
  (
    {
      words,
      className,
      typingSpeed = 100,
      deletingSpeed = 50,
      pauseDuration = 1500,
      cursorClassName,
    },
    ref
  ) => {
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [currentText, setCurrentText] = React.useState("");
    const [isDeleting, setIsDeleting] = React.useState(false);

    React.useEffect(() => {
      const currentWord = words[currentWordIndex] || "";

      const timeout = setTimeout(
        () => {
          if (!isDeleting) {
            if (currentText.length < currentWord.length) {
              setCurrentText(currentWord.slice(0, currentText.length + 1));
            } else {
              setTimeout(() => setIsDeleting(true), pauseDuration);
            }
          } else {
            if (currentText.length > 0) {
              setCurrentText(currentText.slice(0, -1));
            } else {
              setIsDeleting(false);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }
        },
        isDeleting ? deletingSpeed : typingSpeed
      );

      return () => clearTimeout(timeout);
    }, [
      currentText,
      isDeleting,
      currentWordIndex,
      words,
      typingSpeed,
      deletingSpeed,
      pauseDuration,
    ]);

    return (
      <span ref={ref} className={cn("inline-block", className)}>
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className={cn("inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle", cursorClassName)}
        />
      </span>
    );
  }
);
TypewriterText.displayName = "TypewriterText";

export { TypewriterText };
