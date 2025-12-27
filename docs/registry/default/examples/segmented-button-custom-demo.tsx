"use client";

import SegmentedButton from "@/registry/default/ui/segmented-button";

export default function SegmentedButtonCustomDemo() {
  return (
    <SegmentedButton
      buttons={[
        { id: "primary", label: "Primary" },
        { id: "secondary", label: "Secondary" },
        { id: "tertiary", label: "Tertiary" },
      ]}
      defaultActive="primary"
      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-1"
    />
  );
}