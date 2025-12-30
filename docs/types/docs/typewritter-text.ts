import type { EmptyProps } from "@/types";

export interface TypewriterTextProps extends EmptyProps<"span"> {
  /**
   * Array of words to type through with typewriter effect
   */
  words: string[];

  /**
   * Speed of typing characters in milliseconds
   * @default 100
   */
  typingSpeed?: number;

  /**
   * Speed of deleting characters in milliseconds
   * @default 50
   */
  deletingSpeed?: number;

  /**
   * Duration to pause between typing and deleting in milliseconds
   * @default 1500
   */
  pauseDuration?: number;

  /**
   * Additional CSS classes for the blinking cursor
   */
  cursorClassName?: string;
}
