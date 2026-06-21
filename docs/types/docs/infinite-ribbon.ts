import type { EmptyProps } from "@/types";

export interface InfiniteRibbonProps extends EmptyProps<"div"> {
  /**
   * How many times the children should be repeated inside the scrolling track.
   * The track is internally duplicated so the animation loops seamlessly.
   * @default 5
   */
  repeat?: number;

  /**
   * Duration of one full scroll cycle in seconds.
   * @default 10
   */
  duration?: number;

  /**
   * Reverse the scroll direction so the ribbon moves from left to right.
   * @default false
   */
  reverse?: boolean;

  /**
   * Rotation angle in degrees applied to the ribbon container.
   * Useful for diagonal marquee effects.
   * @default 0
   */
  rotation?: number;

  /**
   * Content rendered inside the ribbon track. Repeated automatically.
   */
  children: React.ReactNode;
}
