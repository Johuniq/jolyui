"use client";

import SegmentedButton from "@/registry/default/ui/segmented-button";

export default function SegmentedButtonBasicDemo() {
  const navigationTabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <SegmentedButton
      buttons={navigationTabs}
      defaultActive="home"
      onChange={(activeId) => console.log("Active tab:", activeId)}
    />
  );
}
