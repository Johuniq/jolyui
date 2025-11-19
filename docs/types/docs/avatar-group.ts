import type {
  CompositionProps,
  Direction,
  EmptyProps,
  Orientation,
} from "@/types";

export interface AvatarGroupProps extends EmptyProps<"div">, CompositionProps {
  /**
   * The orientation of the avatar group.
   * @default "horizontal"
   */
  orientation?: Orientation;

  /**
   * The reading direction of the avatar group.
   * @default "ltr"
   */
  dir?: Direction;

  /**
   * The size of each avatar item in pixels.
   * @default 40
   */
  size?: number;

  /**
   * Maximum number of items to display. When exceeded, shows overflow indicator.
   */
  max?: number;

  /**
   * Reverse the stacking order.
   * @default false
   */
  reverse?: boolean;

  /**
   * Position of the tooltip when hovering over avatars.
   * @default "top"
   */
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}
