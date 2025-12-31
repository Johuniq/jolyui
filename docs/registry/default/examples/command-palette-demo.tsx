"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/registry/default/ui/command-palette";

export default function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  const groups = [
    {
      id: "suggestions",
      heading: "Suggestions",
      items: [
        {
          id: "calendar",
          label: "Calendar",
          icon: Calendar,
          onSelect: () => console.log("Calendar selected"),
        },
        {
          id: "search-emoji",
          label: "Search Emoji",
          icon: Smile,
          onSelect: () => console.log("Search Emoji selected"),
        },
        {
          id: "calculator",
          label: "Calculator",
          icon: Calculator,
          onSelect: () => console.log("Calculator selected"),
        },
      ],
    },
    {
      id: "settings",
      heading: "Settings",
      items: [
        {
          id: "profile",
          label: "Profile",
          icon: User,
          shortcut: ["⌘", "P"],
          onSelect: () => console.log("Profile selected"),
        },
        {
          id: "billing",
          label: "Billing",
          icon: CreditCard,
          shortcut: ["⌘", "B"],
          onSelect: () => console.log("Billing selected"),
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          shortcut: ["⌘", "S"],
          onSelect: () => console.log("Settings selected"),
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground text-sm">
        Press{" "}
        <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          ⌘K
        </kbd>{" "}
        to open the command palette
      </p>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>

      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} />
    </div>
  );
}
