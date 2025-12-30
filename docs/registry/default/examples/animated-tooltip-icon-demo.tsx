"use client";

import { Home, Mail, Search, Settings, User } from "lucide-react";
import { TooltipGroup } from "@/components/ui/animated-tooltip";

export default function AnimatedTooltipIconDemo() {
  return (
    <div className="flex justify-center">
      <TooltipGroup
        items={[
          { icon: <Home className="h-4 w-4" />, label: "Home", shortcut: "H" },
          {
            icon: <Search className="h-4 w-4" />,
            label: "Search",
            shortcut: "⌘K",
          },
          {
            icon: <Mail className="h-4 w-4" />,
            label: "Messages",
            shortcut: "M",
          },
          {
            icon: <Settings className="h-4 w-4" />,
            label: "Settings",
            shortcut: "S",
          },
          {
            icon: <User className="h-4 w-4" />,
            label: "Profile",
            shortcut: "P",
          },
        ]}
      />
    </div>
  );
}
