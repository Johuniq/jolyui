/**
 * Preview data for a single hoverable item
 */
export interface PreviewData {
  /**
   * Image URL for the preview card
   */
  image: string
  /**
   * Title displayed in the preview card
   */
  title: string
  /**
   * Subtitle or description displayed below the title
   */
  subtitle?: string
}

/**
 * Props for the HoverPreviewLink component
 */
export interface HoverPreviewLinkProps {
  /**
   * Unique key to identify which preview data to show
   */
  previewKey: string
  /**
   * Content to render as the hoverable link
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the link
   */
  className?: string
}

/**
 * Configuration options for the preview card
 */
export interface HoverPreviewCardProps {
  /**
   * Width of the preview card in pixels
   * @default 300
   */
  width?: number
  /**
   * Border radius of the card in pixels
   * @default 16
   */
  borderRadius?: number
  /**
   * Additional CSS classes for the card
   */
  className?: string
}

/**
 * Props for the HoverPreviewProvider component
 */
export interface HoverPreviewProviderProps {
  /**
   * Preview data object with keys matching the previewKey in HoverPreviewLink
   */
  data: Record<string, PreviewData>
  /**
   * Children components (should include HoverPreviewLink components)
   */
  children: React.ReactNode
  /**
   * Card configuration options
   */
  cardProps?: HoverPreviewCardProps
  /**
   * Offset distance from cursor in pixels
   * @default 20
   */
  cursorOffset?: number
  /**
   * Whether to preload all images on mount
   * @default true
   */
  preloadImages?: boolean
  /**
   * Additional CSS classes for the container
   */
  className?: string
}
