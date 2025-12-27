"use client";

import SegmentedButton from "@/registry/default/ui/segmented-button";
import { useState } from "react";

export default function SegmentedButtonControlledDemo() {
  const [activeTab, setActiveTab] = useState("settings");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analytics", label: "Analytics" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Active tab: <span className="font-mono">{activeTab}</span>
      </p>
      <SegmentedButton
        buttons={tabs}
        defaultActive={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}