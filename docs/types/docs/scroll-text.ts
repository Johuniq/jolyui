import type * as React from "react";

export type ScrollEffect =
  | "fadeIn"
  | "fadeUp"
  | "fadeDown"
  | "parallax"
  | "scale"
  | "scaleUp"
  | "scaleDown"
  | "rotate"
  | "blur"
  | "slideLeft"
  | "slideRight"
  | "skew"
  | "flip"
  | "reveal";

export interface ScrollTextProps {
  /**
   * The content to be animated.
   */
  children: React.ReactNode;

  /**
   * The animation effect to apply.
   * @default "fadeIn"
   */
  effect?: ScrollEffect;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Scroll offset for triggering the animation.
   * @default ["start end", "end start"]
   */
  offset?: [string, string];

  /**
   * Speed multiplier for the animation.
   * @default 1
   */
  speed?: number;

  /**
   * Whether to use spring physics for the animation.
   * @default false
   */
  spring?: boolean;

  /**
   * Configuration for the spring physics.
   */
  springConfig?: { stiffness?: number; damping?: number; mass?: number };

  /**
   * Scroll threshold for the animation.
   * @default [0, 1]
   */
  threshold?: [number, number];
}

export interface ParallaxTextProps {
  /**
   * The content to be animated.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Speed multiplier for the parallax effect.
   * @default 1
   */
  speed?: number;

  /**
   * Direction of the parallax movement.
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";

  /**
   * Whether to use spring physics.
   * @default true
   */
  spring?: boolean;
}

export interface ScrollRevealProps {
  /**
   * The content to be revealed.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Direction from which the content reveals.
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";

  /**
   * Delay before the animation starts (in seconds).
   * @default 0
   */
  delay?: number;

  /**
   * Duration of the animation (in seconds).
   * @default 0.6
   */
  duration?: number;

  /**
   * Distance the content moves during reveal.
   * @default 60
   */
  distance?: number;

  /**
   * Whether the animation should only run once.
   * @default true
   */
  once?: boolean;
}

export interface ScrollFadeProps {
  /**
   * The content to be faded.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Whether to fade in on scroll.
   * @default true
   */
  fadeIn?: boolean;

  /**
   * Whether to fade out on scroll.
   * @default true
   */
  fadeOut?: boolean;

  /**
   * Thresholds for fade in and fade out.
   * @default [0.2, 0.8]
   */
  threshold?: [number, number];
}

export interface ScrollScaleProps {
  /**
   * The content to be scaled.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Starting scale value.
   * @default 0.8
   */
  from?: number;

  /**
   * Ending scale value.
   * @default 1
   */
  to?: number;

  /**
   * Scroll threshold for the scaling effect.
   * @default [0, 0.5]
   */
  threshold?: [number, number];
}

export interface HorizontalScrollTextProps {
  /**
   * The content to be scrolled horizontally.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Speed multiplier for the scroll.
   * @default 1
   */
  speed?: number;

  /**
   * Direction of the scroll.
   * @default "left"
   */
  direction?: "left" | "right";

  /**
   * Number of times to repeat the content.
   * @default 3
   */
  repeat?: number;
}

export interface ScrollProgressTextProps {
  /**
   * The text to display.
   */
  text: string;

  /**
   * Additional class names for the container.
   */
  className?: string;

  /**
   * Additional class names for individual characters.
   */
  charClassName?: string;

  /**
   * Stagger delay between characters.
   * @default 0.01
   */
  stagger?: number;
}

export interface StickyScrollTextProps {
  /**
   * The content to be made sticky.
   */
  children: React.ReactNode;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Height of the scroll container.
   * @default "200vh"
   */
  height?: string;

  /**
   * Animation effect to apply while sticky.
   * @default "fade"
   */
  effect?: "fade" | "scale" | "blur" | "color";
}
