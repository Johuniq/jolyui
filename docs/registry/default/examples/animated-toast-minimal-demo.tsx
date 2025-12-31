"use client";

import { useState } from "react";
import { MinimalToast } from "@/registry/default/ui/animated-toast";

export default function AnimatedToastMinimalDemo() {
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (
    _type: "success" | "error" | "warning" | "info" | "default",
  ) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => triggerToast("success")}
          className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          Success
        </button>
        <button
          onClick={() => triggerToast("error")}
          className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Error
        </button>
        <button
          onClick={() => triggerToast("warning")}
          className="rounded-md bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
        >
          Warning
        </button>
        <button
          onClick={() => triggerToast("info")}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Info
        </button>
        <button
          onClick={() => triggerToast("default")}
          className="rounded-md bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
        >
          Default
        </button>
      </div>

      <MinimalToast
        open={showToast}
        onClose={() => setShowToast(false)}
        message="This is a minimal toast notification!"
        type="success"
      />
    </div>
  );
}
