import type { EmptyProps } from "@/types";

export interface ShutterTextProps extends EmptyProps<"div"> {
  /**
   * The text content to display with the shutter animation.
   * @default "IMMERSE"
   */
  text?: string;

  /**
   * When to trigger the shutter animation.
   * - `"auto"` — animates once on mount.
   * - `"scroll"` — animates when the element scrolls into view.
   * - `"click"` — animates on click.
   * - `"hover"` — animates on mouse enter, resets on mouse leave.
   * @default "auto"
   */
  trigger?: "auto" | "scroll" | "click" | "hover";
}
