/**
 * Types for toast notifications
 */
export type ToastType = "success" | "error" | "warning" | "info" | "default";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

/**
 * Toast data structure
 */
export interface Toast {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast context type
 */
export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Props for the AnimatedToastProvider component
 */
export interface AnimatedToastProviderProps {
  /**
   * The children to render
   */
  children: React.ReactNode;
  /**
   * Position of the toast container
   * @default "top-right"
   */
  position?: ToastPosition;
  /**
   * Maximum number of toasts to display at once
   * @default 5
   */
  maxToasts?: number;
}

/**
 * Props for the MinimalToast component
 */
export interface MinimalToastProps {
  /**
   * Whether the toast is open/visible
   */
  open: boolean;
  /**
   * Callback when the toast should close
   */
  onClose: () => void;
  /**
   * The message to display in the toast
   */
  message: string;
  /**
   * The type of toast (affects styling)
   * @default "default"
   */
  type?: ToastType;
}

/**
 * Props for the UndoToast component
 */
export interface UndoToastProps {
  /**
   * Whether the toast is open/visible
   */
  open: boolean;
  /**
   * Callback when the toast should close
   */
  onClose: () => void;
  /**
   * Callback when the undo action is triggered
   */
  onUndo: () => void;
  /**
   * The message to display in the toast
   */
  message: string;
  /**
   * Duration in milliseconds before auto-close
   * @default 5000
   */
  duration?: number;
}

/**
 * Props for the NotificationToast component
 */
export interface NotificationToastProps {
  /**
   * Whether the toast is open/visible
   */
  open: boolean;
  /**
   * Callback when the toast should close
   */
  onClose: () => void;
  /**
   * The title of the notification
   */
  title: string;
  /**
   * The message content
   */
  message: string;
  /**
   * Optional avatar image URL
   */
  avatar?: string;
  /**
   * Optional timestamp string
   */
  time?: string;
}

/**
 * Props for individual stacked toast items
 */
export interface StackedToast {
  id: string;
  title: string;
  message: string;
  type?: ToastType;
}

/**
 * Props for the StackedNotifications component
 */
export interface StackedNotificationsProps {
  /**
   * Array of toast notifications to display
   */
  toasts: StackedToast[];
  /**
   * Callback when a toast should be removed
   */
  onRemove: (id: string) => void;
  /**
   * Maximum number of visible toasts
   * @default 3
   */
  maxVisible?: number;
}

/**
 * Props for promise toast operations
 */
export interface PromiseToastProps<T> {
  /**
   * The promise to track
   */
  promise: Promise<T>;
  /**
   * Message to show while loading
   */
  loading: string;
  /**
   * Message to show on success (can be a function that receives the result)
   */
  success: string | ((data: T) => string);
  /**
   * Message to show on error (can be a function that receives the error)
   */
  error: string | ((err: Error) => string);
}
