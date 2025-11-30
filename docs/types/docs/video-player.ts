/**
 * Quality source configuration for multi-quality video support
 */
export interface QualitySource {
  /**
   * The quality label (e.g., "720p", "480p", "360p")
   */
  quality: string;

  /**
   * The source URL for this quality
   */
  src: string;
}

/**
 * Caption track configuration
 */
export interface CaptionTrack {
  /**
   * The source URL for the caption file (vtt)
   */
  src: string;

  /**
   * The label for the track (e.g., "English", "Spanish")
   */
  label: string;

  /**
   * The language code (e.g., "en", "es")
   */
  srcLang: string;

  /**
   * Whether this is the default track
   */
  default?: boolean;
}

export interface VideoPlayerProps {
  /**
   * The source URL of the video file.
   * Can be a single string URL or an array of quality sources for quality switching.
   */
  src: string | QualitySource[];

  /**
   * Optional array of caption tracks
   */
  tracks?: CaptionTrack[];

  /**
   * Optional poster image URL to display before the video plays.
   */
  poster?: string;

  /**
   * Optional title for the video.
   */
  title?: string;

  /**
   * Optional description for the video.
   */
  description?: string;

  /**
   * Whether to use compact mode with minimal controls.
   * @default false
   */
  compact?: boolean;

  /**
   * Callback function triggered when the video time updates.
   * Receives the current time in seconds.
   */
  onTimeUpdate?: (time: number) => void;

  /**
   * Callback function triggered when the next video button is clicked.
   * Used for playlist functionality.
   */
  onNextVideo?: () => void;

  /**
   * Callback function triggered when the previous video button is clicked.
   * Used for playlist functionality.
   */
  onPrevVideo?: () => void;

  /**
   * The current video index in a playlist.
   * Used to show/hide navigation controls.
   * @default 0
   */
  currentVideoIndex?: number;

  /**
   * The total number of videos in a playlist.
   * Used to show/hide navigation controls.
   * @default 1
   */
  totalVideos?: number;
}
