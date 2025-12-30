export type EasingType =
  | "linear"
  | "easeOut"
  | "easeIn"
  | "easeInOut"
  | "spring"
  | "bounce";

export interface NumberCounterProps {
  /**
   * The target value to count to.
   */
  value: number;

  /**
   * The starting value.
   * @default 0
   */
  from?: number;

  /**
   * Duration of the animation in seconds.
   * @default 2
   */
  duration?: number;

  /**
   * Delay before the animation starts in seconds.
   * @default 0
   */
  delay?: number;

  /**
   * Number of decimal places to show.
   * @default 0
   */
  decimals?: number;

  /**
   * Thousands separator.
   * @default ","
   */
  separator?: string;

  /**
   * Decimal separator.
   * @default "."
   */
  decimalSeparator?: string;

  /**
   * Prefix string.
   */
  prefix?: string;

  /**
   * Suffix string.
   */
  suffix?: string;

  /**
   * Easing function to use.
   * @default "easeOut"
   */
  easing?: EasingType;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Whether to animate only once when in view.
   * @default true
   */
  once?: boolean;

  /**
   * Custom formatting function.
   */
  formatFn?: (value: number) => string;
}

export interface RollingCounterProps {
  /**
   * The target value to count to.
   */
  value: number;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Prefix string.
   */
  prefix?: string;

  /**
   * Suffix string.
   */
  suffix?: string;

  /**
   * Thousands separator.
   * @default ","
   */
  separator?: string;
}

export interface CircularCounterProps {
  /**
   * The target percentage value (0-100).
   */
  value: number;

  /**
   * Size of the circular counter in pixels.
   * @default 120
   */
  size?: number;

  /**
   * Width of the stroke in pixels.
   * @default 8
   */
  strokeWidth?: number;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Duration of the animation in seconds.
   * @default 2
   */
  duration?: number;

  /**
   * Color of the progress stroke.
   * @default "hsl(var(--primary))"
   */
  color?: string;

  /**
   * Color of the track stroke.
   * @default "hsl(var(--muted))"
   */
  trackColor?: string;
}

export interface StatCounterProps {
  /**
   * The target value to count to.
   */
  value: number;

  /**
   * Label text displayed below the counter.
   */
  label: string;

  /**
   * Prefix string.
   */
  prefix?: string;

  /**
   * Suffix string.
   */
  suffix?: string;

  /**
   * Number of decimal places to show.
   * @default 0
   */
  decimals?: number;

  /**
   * Additional class names.
   */
  className?: string;
}
