/**
 * Props for the ImageComparison component
 */
export interface ImageComparisonProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Label for the before image
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Label for the after image
   * @default "After"
   */
  afterLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Initial slider position as percentage (0-100)
   * @default 50
   */
  initialPosition?: number;
  /**
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean;
  /**
   * Color of the slider line
   * @default "hsl(var(--background))"
   */
  sliderColor?: string;
}

/**
 * Props for the ImageComparisonHover component
 */
export interface ImageComparisonHoverProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Label for the before image
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Label for the after image
   * @default "After"
   */
  afterLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean;
}

/**
 * Props for the ImageComparisonFade component
 */
export interface ImageComparisonFadeProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Label for the before image
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Label for the after image
   * @default "After"
   */
  afterLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show labels
   * @default true
   */
  showLabels?: boolean;
}

/**
 * Props for the ImageComparisonSplit component
 */
export interface ImageComparisonSplitProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Label for the before image
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Label for the after image
   * @default "After"
   */
  afterLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Gap between the two images in pixels
   * @default 4
   */
  gap?: number;
}

/**
 * Props for the ImageComparisonLens component
 */
export interface ImageComparisonLensProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Size of the lens in pixels
   * @default 150
   */
  lensSize?: number;
}

/**
 * Props for the ImageComparisonSwipe component
 */
export interface ImageComparisonSwipeProps {
  /**
   * Source URL for the before image
   */
  beforeImage: string;
  /**
   * Source URL for the after image
   */
  afterImage: string;
  /**
   * Label for the before image
   * @default "Before"
   */
  beforeLabel?: string;
  /**
   * Label for the after image
   * @default "After"
   */
  afterLabel?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}
