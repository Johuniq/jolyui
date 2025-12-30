import type { EmptyProps } from "@/types";

export interface RotatingTextProps extends EmptyProps<"span"> {
  /**
   * Array of words to rotate through with smooth animations
   */
  words: string[];

  /**
   * Time interval between word changes in milliseconds
   * @default 2000
   */
  interval?: number;
}
