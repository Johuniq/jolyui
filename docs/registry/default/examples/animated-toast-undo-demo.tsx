"use client";

import { useState } from "react";
import { UndoToast } from "@/registry/default/ui/animated-toast";

export default function AnimatedToastUndoDemo() {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("Item deleted");

  const deleteItem = () => {
    setMessage("Item deleted");
    setShowToast(true);
  };

  const undoDelete = () => {
    setMessage("Deletion undone!");
    setTimeout(() => setMessage("Item deleted"), 2000);
  };

  return (
    <div className="p-8">
      <p className="mb-4 text-muted-foreground">{message}</p>

      <button
        onClick={deleteItem}
        className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
      >
        Delete Item
      </button>

      <UndoToast
        open={showToast}
        onClose={() => setShowToast(false)}
        onUndo={undoDelete}
        message="Item deleted successfully"
        duration={5000}
      />
    </div>
  );
}
