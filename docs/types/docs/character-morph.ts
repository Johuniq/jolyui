import type { EmptyProps } from "@/types";

export interface CharacterMorphProps extends EmptyProps<"div"> {
  /**
   * Array of texts to cycle through with character morphing effect
   */
  texts: string[];

  /**
   * Time interval between text changes in milliseconds
   * @default 3000
   */
  interval?: number;

  /**
   * Delay between each character animation in seconds
   * @default 0.03
   */
  staggerDelay?: number;

  /**
   * Duration of each character animation in seconds
   * @default 0.5
   */
  charDuration?: number;
}
