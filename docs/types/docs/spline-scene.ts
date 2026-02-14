/**
 * Props for the SplineScene component
 */
export interface SplineSceneProps {
  /**
   * URL to the Spline scene to render
   * @example "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
   */
  scene: string;
  /**
   * Additional CSS classes for styling the Spline container
   */
  className?: string;
}

/**
 * Props for the loading fallback
 */
export interface SplineSceneFallbackProps {
  /**
   * Additional CSS classes for styling the fallback
   */
  className?: string;
  /**
   * Text to display while loading
   * @default "Loading 3D Scene..."
   */
  loadingText?: string;
}
