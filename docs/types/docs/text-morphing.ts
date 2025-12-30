import type { EmptyProps } from "@/types";

export interface MorphingTextProps extends EmptyProps<"span"> {
  /**
   * Array of words to cycle through
   */
  words: string[];

  /**
   * Time interval between word changes in milliseconds
   * @default 3000
   */
  interval?: number;

  /**
   * Duration of the morphing animation in seconds
   * @default 0.5
   */
  animationDuration?: number;
}
