import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

// Toast Types
type ToastType = "success" | "error" | "warning" | "info" | "default";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

interface Toast {
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

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

// Toast Provider
interface AnimatedToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function AnimatedToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: AnimatedToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => {
        const newToasts = [...prev, { ...toast, id }];
        return newToasts.slice(-maxToasts);
      });
      return id;
    },
    [maxToasts],
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  const positionClasses: Record<ToastPosition, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const isTop = position.startsWith("top");

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <div
        className={cn(
          "pointer-events-none fixed z-50 flex flex-col gap-2",
          positionClasses[position],
        )}
      >
        <AnimatePresence mode="popLayout">
          {(isTop ? toasts : [...toasts].reverse()).map((toast, index) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              index={index}
              onRemove={() => removeToast(toast.id)}
              isTop={isTop}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// Toast Item
interface ToastItemProps {
  toast: Toast;
  index: number;
  onRemove: () => void;
  isTop: boolean;
}

function ToastItem({ toast, index, onRemove, isTop }: ToastItemProps) {
  const { type = "default", title, message, duration = 5000, action } = toast;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onRemove, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onRemove]);

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    default: <Bell className="h-5 w-5 text-muted-foreground" />,
  };

  const borderColors: Record<ToastType, string> = {
    success: "border-l-emerald-500",
    error: "border-l-red-500",
    warning: "border-l-amber-500",
    info: "border-l-blue-500",
    default: "border-l-border",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isTop ? -20 : 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30,
          delay: index * 0.05,
        },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        x: 100,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "pointer-events-auto min-w-[320px] max-w-[420px] rounded-lg border border-l-4 bg-card p-4 shadow-lg",
        borderColors[type],
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">{icons[type]}</div>
        <div className="min-w-0 flex-1">
          {title && <p className="font-medium text-card-foreground">{title}</p>}
          <p className={cn("text-muted-foreground text-sm", title && "mt-1")}>
            {message}
          </p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 font-medium text-primary text-sm hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      {duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={cn(
            "absolute right-0 bottom-0 left-0 h-1 origin-left rounded-b-lg",
            type === "success" && "bg-emerald-500/30",
            type === "error" && "bg-red-500/30",
            type === "warning" && "bg-amber-500/30",
            type === "info" && "bg-blue-500/30",
            type === "default" && "bg-muted",
          )}
        />
      )}
    </motion.div>
  );
}

// Hook to use toast
export function useAnimatedToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useAnimatedToast must be used within AnimatedToastProvider",
    );
  }
  return context;
}

// Standalone Toast Components

// Minimal Toast
interface MinimalToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: ToastType;
}

export function MinimalToast({
  open,
  onClose,
  message,
  type = "default",
}: MinimalToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  const bgColors: Record<ToastType, string> = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    default: "bg-foreground",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={cn(
            "-translate-x-1/2 fixed bottom-8 left-1/2 z-50 rounded-full px-6 py-3 font-medium text-background text-black text-sm shadow-lg dark:text-white",
            bgColors[type],
          )}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Undo Toast
interface UndoToastProps {
  open: boolean;
  onClose: () => void;
  onUndo: () => void;
  message: string;
  duration?: number;
}

export function UndoToast({
  open,
  onClose,
  onUndo,
  message,
  duration = 5000,
}: UndoToastProps) {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            onClose();
            return 0;
          }
          return prev - 100 / (duration / 100);
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [open, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="-translate-x-1/2 fixed bottom-8 left-1/2 z-50 overflow-hidden rounded-lg bg-foreground text-background shadow-xl"
        >
          <div className="flex items-center gap-4 px-4 py-3">
            <span className="text-sm">{message}</span>
            <button
              onClick={() => {
                onUndo();
                onClose();
              }}
              className="rounded-md bg-primary px-3 py-1 font-semibold text-primary-foreground text-sm transition-opacity hover:opacity-90"
            >
              Undo
            </button>
          </div>
          <div
            className="h-1 bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Notification Toast (with avatar/image)
interface NotificationToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  avatar?: string;
  time?: string;
}

export function NotificationToast({
  open,
  onClose,
  title,
  message,
  avatar,
  time,
}: NotificationToastProps) {
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-4 right-4 z-50 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              {avatar ? (
                <Image
                  src={avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-semibold text-card-foreground">
                    {title}
                  </p>
                  {time && (
                    <span className="text-muted-foreground text-xs">
                      {time}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 line-clamp-2 text-muted-foreground text-sm">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full p-1 transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Stacked Notifications
export interface StackedToast {
  id: string;
  title: string;
  message: string;
  type?: ToastType;
}

interface StackedNotificationsProps {
  toasts: StackedToast[];
  onRemove: (id: string) => void;
  maxVisible?: number;
}

export function StackedNotifications({
  toasts,
  onRemove,
  maxVisible = 3,
}: StackedNotificationsProps) {
  const visibleToasts = toasts.slice(0, maxVisible);
  const hiddenCount = Math.max(0, toasts.length - maxVisible);

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    default: <Bell className="h-5 w-5 text-muted-foreground" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{
              opacity: 1 - index * 0.15,
              y: index * 8,
              scale: 1 - index * 0.05,
              zIndex: maxVisible - index,
            }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: index === 0 ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
            className="rounded-lg border border-border bg-card p-4 shadow-lg"
          >
            <div className="flex items-start gap-3">
              {icons[toast.type || "default"]}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-card-foreground">
                  {toast.title}
                </p>
                <p className="mt-0.5 text-muted-foreground text-sm">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => onRemove(toast.id)}
                className="rounded-md p-1 transition-colors hover:bg-muted"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {hiddenCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center text-muted-foreground text-sm"
        >
          +{hiddenCount} more notifications
        </motion.div>
      )}
    </div>
  );
}

// Promise Toast (for async operations)
interface PromiseToastProps<T> {
  promise: Promise<T>;
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: Error) => string);
}

export function usePromiseToast() {
  const { addToast, removeToast } = useAnimatedToast();

  return async function promiseToast<T>({
    promise,
    loading,
    success,
    error,
  }: PromiseToastProps<T>) {
    const id = addToast({ message: loading, type: "info", duration: 0 });

    try {
      const data = await promise;
      removeToast(id);
      addToast({
        message: typeof success === "function" ? success(data) : success,
        type: "success",
      });
      return data;
    } catch (err) {
      removeToast(id);
      addToast({
        message: typeof error === "function" ? error(err as Error) : error,
        type: "error",
      });
      throw err;
    }
  };
}
