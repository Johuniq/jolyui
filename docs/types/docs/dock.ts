/**
 * Props for the Dock component
 */
export interface DockProps {
  /**
   * Distance threshold for magnification effect
   * @default 60
   */
  magnification?: number;
  /**
   * Maximum scale factor when hovered
   * @default 1.5
   */
  maxScale?: number;
  /**
   * Base size of dock items in pixels
   * @default 48
   */
  iconSize?: number;
  /**
   * Distance from mouse to apply magnification
   * @default 140
   */
  distance?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

/**
 * Props for the DockItem component
 */
export interface DockItemProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Props for the DockIcon component
 */
export interface DockIconProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements (typically an icon)
   */
  children?: React.ReactNode;
}

/**
 * Props for the DockLabel component
 */
export interface DockLabelProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Child elements (the label text)
   */
  children?: React.ReactNode;
}

/**
 * Props for the DockSeparator component
 */
export interface DockSeparatorProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}
