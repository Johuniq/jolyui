import type { DayPicker } from "react-day-picker";

export interface AnimatedCalendarProps
  extends Omit<
    React.ComponentProps<typeof DayPicker>,
    | "mode"
    | "onDayKeyUp"
    | "onDayKeyPress"
    | "onDayPointerEnter"
    | "onDayPointerLeave"
    | "onDayTouchCancel"
    | "onDayTouchEnd"
    | "onDayTouchMove"
    | "onDayTouchStart"
  > {
  /**
   * The selection mode for the calendar.
   * @default "single"
   */
  mode?: "single" | "range" | "multiple" | "default";

  /**
   * The selected date(s).
   */
  selected?: Date | { from?: Date; to?: Date } | Date[] | undefined;

  /**
   * Callback when selection changes.
   */
  onSelect?: (date: any) => void;

  /**
   * The variant of the buttons in the calendar.
   * @default "ghost"
   */
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

  /**
   * Whether to show days from the previous or next month.
   * @default true
   */
  showOutsideDays?: boolean;

  /**
   * The layout of the caption.
   * @default "label"
   */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";

  /**
   * Additional CSS classes.
   */
  className?: string;

  /**
   * Custom class names for internal elements.
   */
  classNames?: Record<string, string>;
}
