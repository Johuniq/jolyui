"use client";

import SegmentedButton from "@/registry/default/ui/segmented-button";
import { useTheme } from "next-themes";

export default function SegmentedButtonThemeDemo() {
  const { theme, setTheme } = useTheme();

  const themeTabs = [
    { id: "light", label: "Light" },
    { id: "dark", label: "Dark" },
    { id: "system", label: "System" },
  ];

  return (
    <SegmentedButton
      buttons={themeTabs}
      defaultActive={theme || "system"}
      onChange={(activeId) => setTheme(activeId)}
    />
  );
}