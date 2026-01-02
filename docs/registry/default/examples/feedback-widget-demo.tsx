"use client";

import { FeedbackWidget } from "@/registry/default/ui/feedback-widget";

export default function FeedbackWidgetDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center bg-zinc-950">
      <FeedbackWidget
        onSubmit={(data) => {
          console.log("Feedback submitted:", data);
        }}
      />
    </div>
  );
}
