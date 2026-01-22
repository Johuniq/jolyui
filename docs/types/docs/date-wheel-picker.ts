export interface DateWheelPickerProps {
  /**
   * The currently selected date.
   */
  value?: Date;

  /**
   * Callback function triggered when the date selection changes.
   * @param date - The new selected date.
   */
  onChange: (date: Date) => void;

  /**
   * Minimum selectable year.
   * @default 1920
   */
  minYear?: number;

  /**
   * Maximum selectable year.
   * @default Current year
   */
  maxYear?: number;

  /**
   * Size variant of the picker.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Whether the picker is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Locale for month names (e.g., "en-US", "fr-FR").
   */
  locale?: string;

  /**
   * Additional CSS class names.
   */
  className?: string;
}
