"use client";

import { useState } from "react";
import { NotificationToast } from "@/registry/default/ui/animated-toast";

export default function AnimatedToastNotificationDemo() {
  const [showToast, setShowToast] = useState(false);

  const showNotification = () => {
    setShowToast(true);
  };

  return (
    <div className="p-8">
      <button
        onClick={showNotification}
        className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Show Notification
      </button>

      <NotificationToast
        open={showToast}
        onClose={() => setShowToast(false)}
        title="New Message"
        message="You have received a new message from John Doe. Check it out!"
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        time="2 min ago"
      />
    </div>
  );
}
