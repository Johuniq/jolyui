/**
 * Props for the LocationMap component
 */
export interface LocationMapProps {
  /**
   * Location name to display
   * @default "San Francisco, CA"
   */
  location?: string
  /**
   * Latitude coordinate
   * @default 37.7749
   */
  latitude?: number
  /**
   * Longitude coordinate
   * @default -122.4194
   */
  longitude?: number
  /**
   * Zoom level for the map (1-18, higher = more zoomed in)
   * @default 14
   */
  zoom?: number
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Map tile provider for different map styles
   * @default "carto-light"
   */
  tileProvider?: "openstreetmap" | "carto-light" | "carto-dark"
}
