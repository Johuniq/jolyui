import type * as React from "react";

export type HighlightColor = "primary" | "secondary" | "accent" | "destructive";
export type HighlightVariant = "underline" | "box" | "circle" | "marker";

export interface HighlightTextProps {
  /**
   * The content to be highlighted.
   */
  children: React.ReactNode;

  /**
   * The visual style of the highlight.
   * @default "underline"
   */
  variant?: HighlightVariant;

  /**
   * The color theme of the highlight.
   * @default "primary"
   */
  color?: HighlightColor;

  /**
   * Duration of the animation in seconds.
   * @default 0.8
   */
  animationDuration?: number;

  /**
   * Delay before the animation starts in seconds.
   * @default 0
   */
  animationDelay?: number;

  /**
   * Width of the stroke for underline, box, and circle variants.
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Whether to animate the highlight when it comes into view.
   * @default true
   */
  animate?: boolean;

  /**
   * Additional CSS classes to apply to the container.
   */
  className?: string;
}
