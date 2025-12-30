"use client";

import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/registry/default/ui/command-palette";
import {
  Bell,
  Github,
  HelpCircle,
  MessageSquare,
  Palette,
  Plus,
  Search,
  Settings,
  Shield,
  Twitter,
  User,
  Zap
} from "lucide-react";
import { useState } from "react";

export default function CommandPaletteCustomDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate loading state when searching
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const groups = [
    {
      id: "actions",
      heading: "Quick Actions",
      items: [
        {
          id: "new-file",
          label: "Create New File",
          description: "Create a new document in the current folder",
          icon: Plus,
          shortcut: ["⌘", "N"],
          onSelect: () => console.log("New file created"),
        },
        {
          id: "search-docs",
          label: "Search Documentation",
          description: "Find answers in our comprehensive docs",
          icon: Search,
          onSelect: () => console.log("Searching docs"),
        },
      ],
    },
    {
      id: "settings-nav",
      heading: "Settings & Configuration",
      items: [
        {
          id: "settings-menu",
          label: "System Settings",
          description: "Manage your account, security, and preferences",
          icon: Settings,
          children: [
            {
              id: "account-group",
              heading: "Account",
              items: [
                {
                  id: "profile",
                  label: "Edit Profile",
                  icon: User,
                  onSelect: () => console.log("Profile selected"),
                },
                {
                  id: "security",
                  label: "Security & Privacy",
                  icon: Shield,
                  onSelect: () => console.log("Security selected"),
                },
              ],
            },
            {
              id: "pref-group",
              heading: "Preferences",
              items: [
                {
                  id: "notifications",
                  label: "Notifications",
                  icon: Bell,
                  onSelect: () => console.log("Notifications selected"),
                },
                {
                  id: "appearance",
                  label: "Appearance",
                  icon: Palette,
                  onSelect: () => console.log("Appearance selected"),
                },
              ],
            },
          ],
        },
        {
          id: "theme-toggle",
          label: "Switch Theme",
          description: "Toggle between light and dark mode",
          icon: Zap,
          shortcut: ["⌘", "T"],
          onSelect: () => console.log("Theme toggled"),
        },
      ],
    },
    {
      id: "social",
      heading: "Social & Community",
      items: [
        {
          id: "github",
          label: "GitHub Repository",
          icon: Github,
          onSelect: () => window.open("https://github.com", "_blank"),
        },
        {
          id: "twitter",
          label: "Follow on Twitter",
          icon: Twitter,
          onSelect: () => window.open("https://twitter.com", "_blank"),
        },
      ],
    },
    {
      id: "help",
      heading: "Support",
      items: [
        {
          id: "help-center",
          label: "Help Center",
          icon: HelpCircle,
          onSelect: () => console.log("Opening help center"),
        },
        {
          id: "feedback",
          label: "Send Feedback",
          icon: MessageSquare,
          onSelect: () => console.log("Opening feedback"),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="p-8 rounded-2xl border bg-card shadow-sm max-w-md text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
          <div className="h-full bg-primary animate-progress w-1/3" />
        </div>
        
        <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Zap className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">Advanced Command Center</h3>
        <p className="text-sm text-muted-foreground">
          Try the new <strong>Sub-menus</strong>! Navigate to "System Settings" to see nested commands.
        </p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => setOpen(true)} className="w-full">
            Open Command Palette
          </Button>
          <p className="text-[10px] text-muted-foreground">
            Supports Recent Items, Loading States, and Fuzzy Search
          </p>
        </div>
      </div>
      
      <CommandPalette
        open={open}
        onOpenChange={handleOpenChange}
        groups={groups}
        loading={loading}
        placeholder="Search actions, settings, social..."
      />
    </div>
  );
}
