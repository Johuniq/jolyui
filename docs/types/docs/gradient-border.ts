/**
 * Props for the GradientBorder component
 */
export interface GradientBorderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be wrapped by the gradient border
   */
  children: React.ReactNode;
  /**
   * Array of colors for the gradient border
   * @default ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"]
   */
  colors?: string[];
  /**
   * Duration of the animation in seconds
   * @default 3
   */
  duration?: number;
  /**
   * Width of the border in pixels
   * @default 2
   */
  borderWidth?: number;
  /**
   * Border radius of the component
   * @default "1rem"
   */
  borderRadius?: string;
  /**
   * Whether the gradient should animate
   * @default true
   */
  animated?: boolean;
}

/**
 * Props for the GradientBorderCard component
 */
export interface GradientBorderCardProps extends GradientBorderProps {
  /**
   * Whether to add a glow effect around the border
   * @default false
   */
  glowEffect?: boolean;
  /**
   * Opacity of the glow effect (0-1)
   * @default 0.3
   */
  glowOpacity?: number;
}

/**
 * Props for the GradientBorderButton component
 */
export interface GradientBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Array of colors for the gradient border
   * @default ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"]
   */
  colors?: string[];
  /**
   * Duration of the animation in seconds
   * @default 3
   */
  duration?: number;
  /**
   * Width of the border in pixels
   * @default 2
   */
  borderWidth?: number;
  /**
   * Whether the gradient should animate
   * @default true
   */
  animated?: boolean;
}

/**
 * Props for the ShimmerBorder component
 */
export interface ShimmerBorderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be wrapped by the shimmer border
   */
  children: React.ReactNode;
  /**
   * Color of the shimmer effect
   * @default "hsl(var(--primary))"
   */
  color?: string;
  /**
   * Duration of the shimmer animation in seconds
   * @default 2
   */
  duration?: number;
  /**
   * Width of the border in pixels
   * @default 2
   */
  borderWidth?: number;
  /**
   * Border radius of the component
   * @default "1rem"
   */
  borderRadius?: string;
}

/**
 * Props for the PulseBorder component
 */
export interface PulseBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be wrapped by the pulse border
   */
  children: React.ReactNode;
  /**
   * Color of the pulse border
   * @default "hsl(var(--primary))"
   */
  color?: string;
  /**
   * Duration of the pulse animation in seconds
   * @default 2
   */
  duration?: number;
  /**
   * Width of the border in pixels
   * @default 2
   */
  borderWidth?: number;
  /**
   * Border radius of the component
   * @default "1rem"
   */
  borderRadius?: string;
}
