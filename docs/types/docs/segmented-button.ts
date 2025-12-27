export interface SegmentedButtonItem {
  /**
   * Unique identifier for the button
   */
  id: string;
  /**
   * Text label to display on the button
   */
  label?: string | null;
  /**
   * Whether this button should display a logo instead of text
   */
  isLogo?: boolean;
}

export interface SegmentedButtonProps {
  /**
   * Array of button configurations
   */
  buttons: SegmentedButtonItem[];
  /**
   * ID of the button that should be active by default
   */
  defaultActive?: string;
  /**
   * Callback function called when the active button changes
   */
  onChange?: (activeId: string) => void;
  /**
   * Additional CSS classes to apply to the component
   */
  className?: string;
}