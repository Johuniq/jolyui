import type { EmptyProps } from "@/types";

export interface GlitchTextProps extends EmptyProps<"span"> {
  /**
   * Array of words to cycle through with glitch effect
   */
  words: string[];

  /**
   * Time interval between word changes in milliseconds
   * @default 3000
   */
  interval?: number;

  /**
   * Duration of the glitch animation in milliseconds
   * @default 300
   */
  glitchDuration?: number;
}
