/**
 * 3D position with x, y, z coordinates
 */
export interface Position3D {
  /**
   * X coordinate
   */
  x: number;
  /**
   * Y coordinate
   */
  y: number;
  /**
   * Z coordinate
   */
  z: number;
}

/**
 * Spherical position with theta, phi, and radius
 */
export interface SphericalPosition {
  /**
   * Azimuth angle in degrees
   */
  theta: number;
  /**
   * Polar angle in degrees
   */
  phi: number;
  /**
   * Distance from center
   */
  radius: number;
}

/**
 * Image data structure for sphere items
 */
export interface ImageData {
  /**
   * Unique identifier for the image
   */
  id: string;
  /**
   * Source URL of the image
   */
  src: string;
  /**
   * Alt text for accessibility
   */
  alt: string;
  /**
   * Optional title shown in spotlight modal
   */
  title?: string;
  /**
   * Optional description shown in spotlight modal
   */
  description?: string;
}

/**
 * Props for the SphereImageGrid component
 */
export interface SphereImageGridProps {
  /**
   * Array of images to display on the sphere
   */
  images?: ImageData[];
  /**
   * Size of the container in pixels
   * @default 400
   */
  containerSize?: number;
  /**
   * Radius of the sphere in pixels
   * @default 200
   */
  sphereRadius?: number;
  /**
   * Sensitivity of drag rotation
   * @default 0.5
   */
  dragSensitivity?: number;
  /**
   * Decay factor for momentum (0-1, higher = slower decay)
   * @default 0.95
   */
  momentumDecay?: number;
  /**
   * Maximum rotation speed in degrees per frame
   * @default 5
   */
  maxRotationSpeed?: number;
  /**
   * Base scale of images relative to container size
   * @default 0.12
   */
  baseImageScale?: number;
  /**
   * Scale multiplier when hovering over an image
   * @default 1.2
   */
  hoverScale?: number;
  /**
   * CSS perspective value in pixels
   * @default 1000
   */
  perspective?: number;
  /**
   * Enable automatic rotation
   * @default false
   */
  autoRotate?: boolean;
  /**
   * Speed of auto rotation in degrees per frame
   * @default 0.3
   */
  autoRotateSpeed?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}
