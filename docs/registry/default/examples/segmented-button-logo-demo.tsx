"use client";

import SegmentedButton from "@/registry/default/ui/segmented-button";

export default function SegmentedButtonLogoDemo() {
  const logoTabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "logo", isLogo: true },
    { id: "profile", label: "Profile" },
  ];

  return (
    <SegmentedButton
      buttons={logoTabs}
      defaultActive="dashboard"
      onChange={(activeId) => console.log("Active section:", activeId)}
    />
  );
}
