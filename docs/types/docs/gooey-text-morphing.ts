/**
 * Props for the GooeyText component
 */
export interface GooeyTextProps {
  /**
   * Array of strings to morph between
   */
  texts: string[];
  /**
   * Time in seconds for the morphing animation
   * @default 1
   */
  morphTime?: number;
  /**
   * Time in seconds to wait between morphs
   * @default 0.25
   */
  cooldownTime?: number;
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Additional class names for the text elements
   */
  textClassName?: string;
}
