export interface FeedbackWidgetProps {
  /**
   * Callback function when the user submits feedback.
   * @param data - The feedback data containing rating and optional text.
   */
  onSubmit?: (data: { rating: string; feedback: string }) => void;

  /**
   * Callback function when the widget is closed (e.g. after submission or manual close).
   */
  onClose?: () => void;

  /**
   * Additional CSS classes for the container.
   */
  className?: string;

  /**
   * Text shown in the collapsed state.
   * @default "Was this helpful?"
   */
  label?: string;

  /**
   * Placeholder text for the feedback textarea.
   * @default "Your feedback..."
   */
  placeholder?: string;
}
