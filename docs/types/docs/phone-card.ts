export interface PhoneCardProps {
  /**
   * Main title text displayed in the card
   * @default "8°"
   */
  title?: string;

  /**
   * Subtitle text providing additional context
   * @default "Clear night. Great for render farm runs."
   */
  sub?: string;

  /**
   * Badge tone label shown at the bottom
   * @default "calm"
   */
  tone?: string;

  /**
   * Tailwind gradient classes for the overlay effect
   * @default "from-[#0f172a] via-[#14532d] to-[#052e16]"
   */
  gradient?: string;

  /**
   * URL of the video source
   */
  videoSrc?: string;

  /**
   * URL of the image source
   */
  imageSrc?: string;

  /**
   * Type of media to display
   * @default "video"
   */
  mediaType?: "video" | "image";
}
