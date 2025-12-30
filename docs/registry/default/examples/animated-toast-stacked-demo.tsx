"use client";

import { useState } from "react";
import {
  StackedNotifications,
  type StackedToast,
} from "@/registry/default/ui/animated-toast";

export default function AnimatedToastStackedDemo() {
  const [toasts, setToasts] = useState<StackedToast[]>([]);

  const addToast = (
    type: "success" | "error" | "warning" | "info" | "default",
  ) => {
    const newToast: StackedToast = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Notification`,
      message: `This is a ${type} notification that will stack with others.`,
      type,
    };
    setToasts((prev) => [newToast, ...prev]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => addToast("success")}
          className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          Add Success
        </button>
        <button
          onClick={() => addToast("error")}
          className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Add Error
        </button>
        <button
          onClick={() => addToast("warning")}
          className="rounded-md bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
        >
          Add Warning
        </button>
        <button
          onClick={() => addToast("info")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Add Info
        </button>
      </div>

      <p className="text-muted-foreground text-sm">
        Click buttons to add stacked notifications. They will appear in the
        top-right corner.
      </p>

      <StackedNotifications
        toasts={toasts}
        onRemove={removeToast}
        maxVisible={3}
      />
    </div>
  );
}
