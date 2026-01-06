"use client";

import { FeedbackWidget } from "@/registry/default/ui/feedback-widget";

export default function FeedbackWidgetCustomLabelDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      <FeedbackWidget
        label="Rate your experience"
        placeholder="Tell us what you think..."
        onSubmit={(data) => {
          console.log("Feedback submitted:", data);
        }}
      />
    </div>
  );
}
