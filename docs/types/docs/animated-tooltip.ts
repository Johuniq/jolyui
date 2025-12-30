/**
 * Props for the AnimatedTooltip component
 */
export interface AnimatedTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover/focus
   */
  children: React.ReactNode;
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  /**
   * Animation type for the tooltip appearance
   * @default "fade"
   */
  animation?: "fade" | "scale" | "slide" | "spring";
  /**
   * Delay before showing the tooltip in milliseconds
   * @default 0
   */
  delay?: number;
  /**
   * Duration of the animation in seconds
   * @default 0.15
   */
  duration?: number;
  /**
   * Additional CSS classes for the trigger wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the tooltip content
   */
  contentClassName?: string;
  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  arrow?: boolean;
  /**
   * Distance between tooltip and trigger in pixels
   * @default 8
   */
  offset?: number;
  /**
   * Whether the tooltip is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Props for the RichTooltip component
 */
export interface RichTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover/focus
   */
  children: React.ReactNode;
  /**
   * The title text for the rich tooltip
   */
  title: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Optional image URL to display in the tooltip
   */
  image?: string;
  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the IconTooltip component
 */
export interface IconTooltipProps {
  /**
   * The trigger element (usually an icon)
   */
  children: React.ReactNode;
  /**
   * The label text to display in the tooltip
   */
  label: string;
  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  /**
   * Optional keyboard shortcut to display
   */
  shortcut?: string;
}

/**
 * Props for the HoverCardTooltip component
 */
export interface HoverCardTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover/focus
   */
  children: React.ReactNode;
  /**
   * The content to display in the tooltip
   */
  content: React.ReactNode;
  /**
   * Position of the tooltip relative to the trigger
   * @default "bottom"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the ConfirmTooltip component
 */
export interface ConfirmTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover/focus
   */
  children: React.ReactNode;
  /**
   * The confirmation message to display
   */
  message: string;
  /**
   * Callback function when user confirms
   */
  onConfirm: () => void;
  /**
   * Optional callback function when user cancels
   */
  onCancel?: () => void;
  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
  /**
   * Text for the confirm button
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * Text for the cancel button
   * @default "Cancel"
   */
  cancelText?: string;
}

/**
 * Props for individual tooltip items in TooltipGroup
 */
export interface TooltipItem {
  /**
   * The icon to display
   */
  icon: React.ReactNode;
  /**
   * The label text for the tooltip
   */
  label: string;
  /**
   * Optional keyboard shortcut
   */
  shortcut?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Props for the TooltipGroup component
 */
export interface TooltipGroupProps {
  /**
   * Array of tooltip items to display
   */
  items: TooltipItem[];
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the FloatingLabel component
 */
export interface FloatingLabelProps {
  /**
   * The input element
   */
  children: React.ReactNode;
  /**
   * The label text to display
   */
  label: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the StatusTooltip component
 */
export interface StatusTooltipProps {
  /**
   * The trigger element that shows the tooltip on hover/focus
   */
  children: React.ReactNode;
  /**
   * The status type
   */
  status: "online" | "offline" | "away" | "busy";
  /**
   * Optional custom label text
   */
  label?: string;
  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
}
