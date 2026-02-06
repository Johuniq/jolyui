import type { EmptyProps } from "@/types";

export interface FallingTextProps extends EmptyProps<"div"> {
  /**
   * The text content to display and animate.
   */
  text: string;

  /**
   * Words to highlight with special styling.
   * @default []
   */
  highlightWords?: string[];

  /**
   * When to trigger the falling animation.
   * @default "auto"
   */
  trigger?: "auto" | "scroll" | "click" | "hover";

  /**
   * Background color for the physics canvas.
   * @default "transparent"
   */
  backgroundColor?: string;

  /**
   * Show physics wireframes for debugging.
   * @default false
   */
  wireframes?: boolean;

  /**
   * Gravity strength for the physics simulation.
   * @default 1
   */
  gravity?: number;

  /**
   * Mouse interaction stiffness (0-1).
   * @default 0.2
   */
  mouseConstraintStiffness?: number;

  /**
   * Font size for the text.
   * @default "1rem"
   */
  fontSize?: string;

  /**
   * Custom className for the container.
   */
  className?: string;

  /**
   * Callback when animation starts.
   */
  onAnimationStart?: () => void;

  /**
   * Callback when animation ends (all bodies settled).
   */
  onAnimationEnd?: () => void;

  /**
   * Physics properties for word bodies.
   */
  physicsOptions?: {
    /** Bounciness (0-1) */
    restitution?: number;
    /** Air resistance */
    frictionAir?: number;
    /** Surface friction */
    friction?: number;
    /** Mass density */
    density?: number;
  };

  /**
   * Initial velocity range for words.
   */
  initialVelocity?: {
    /** Horizontal velocity range */
    x?: number;
    /** Vertical velocity range */
    y?: number;
    /** Angular velocity range */
    angular?: number;
  };

  /**
   * Custom highlight class names for highlighted words.
   * @default "text-cyan-500 font-bold"
   */
  highlightClassName?: string;

  /**
   * Word spacing in pixels.
   * @default 2
   */
  wordSpacing?: number;

  /**
   * Minimum container height.
   * @default "300px"
   */
  minHeight?: string;

  /**
   * Enable/disable mouse interactions.
   * @default true
   */
  enableMouseInteraction?: boolean;

  /**
   * Reset trigger - increment to reset animation.
   * @default 0
   */
  resetKey?: number;
}
