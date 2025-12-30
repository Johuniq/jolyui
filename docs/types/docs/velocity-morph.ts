import type { EmptyProps } from "@/types";

export interface VelocityMorphProps extends EmptyProps<"div"> {
  /**
   * Array of texts to cycle through with velocity morphing effect
   */
  texts: string[];

  /**
   * Time interval between text changes in milliseconds
   * @default 3000
   */
  interval?: number;
}
