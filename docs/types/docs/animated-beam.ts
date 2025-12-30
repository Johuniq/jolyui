/**
 * Props for the AnimatedBeam component
 */
export interface AnimatedBeamProps {
  /**
   * Reference to the container element
   */
  containerRef: React.RefObject<HTMLElement>;
  /**
   * Reference to the start element
   */
  fromRef: React.RefObject<HTMLElement>;
  /**
   * Reference to the end element
   */
  toRef: React.RefObject<HTMLElement>;
  /**
   * Curvature of the beam (-1 to 1, 0 is straight)
   * @default 0
   */
  curvature?: number;
  /**
   * Animation duration in seconds
   * @default 2
   */
  duration?: number;
  /**
   * Delay before animation starts
   * @default 0
   */
  delay?: number;
  /**
   * Reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Width of the beam path
   * @default 2
   */
  pathWidth?: number;
  /**
   * Color of the beam gradient start
   * @default "#18181b"
   */
  gradientStartColor?: string;
  /**
   * Color of the beam gradient end
   * @default "#18181b"
   */
  gradientStopColor?: string;
  /**
   * Starting point offset
   * @default 0
   */
  startXOffset?: number;
  /**
   * Starting point Y offset
   * @default 0
   */
  startYOffset?: number;
  /**
   * Ending point X offset
   * @default 0
   */
  endXOffset?: number;
  /**
   * Ending point Y offset
   * @default 0
   */
  endYOffset?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the BeamContainer component
 */
export interface BeamContainerProps {
  /**
   * The child elements
   */
  children: React.ReactNode;
}

/**
 * Props for the BeamNode component
 */
export interface BeamNodeProps {
  /**
   * The child elements
   */
  children: React.ReactNode;
}
