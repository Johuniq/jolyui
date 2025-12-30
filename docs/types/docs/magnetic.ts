import type { SpringOptions } from "motion/react";
import type { EmptyProps } from "@/types";

export interface MagneticProps extends EmptyProps<"div"> {
  /**
   * The intensity of the magnetic effect.
   * Higher values create stronger attraction to the cursor.
   * @default 0.6
   */
  intensity?: number;

  /**
   * The range in pixels within which the magnetic effect is active.
   * @default 100
   */
  range?: number;

  /**
   * Defines the area that triggers the magnetic effect.
   * - "self": Effect activates when hovering over the element itself
   * - "parent": Effect activates when hovering over the parent element
   * - "global": Effect is always active (follows cursor anywhere)
   * @default "self"
   */
  actionArea?: "self" | "parent" | "global";

  /**
   * Custom spring animation configuration for the magnetic effect.
   * @default { stiffness: 26.7, damping: 4.1, mass: 0.2 }
   */
  springOptions?: SpringOptions;
}
