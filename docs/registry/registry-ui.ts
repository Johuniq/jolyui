import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "avatar-group",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "motion"],
    files: [
      {
        path: "ui/avatar-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "animated-table",
    type: "registry:ui",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "ui/animated-table.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "motion"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "file-tree",
    type: "registry:ui",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "ui/file-tree.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "github-contributors",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-tooltip",
      "lucide-react",
      "motion",
    ],
    files: [
      {
        path: "ui/github-contributors.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "phone-card",
    type: "registry:ui",
    registryDependencies: ["lazy-video"],
    files: [
      {
        path: "ui/phone-card.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "lazy-video",
    type: "registry:ui",
    files: [
      {
        path: "ui/lazy-video.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "vercel-tabs",
    type: "registry:ui",
    files: [
      {
        path: "ui/vercel-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "magnetic",
    type: "registry:ui",
    dependencies: ["motion"],
    files: [
      {
        path: "ui/magnetic.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "video-player",
    type: "registry:ui",
    dependencies: ["lucide-react", "motion"],
    files: [
      {
        path: "ui/video-player.tsx",
        type: "registry:ui",
      },
    ],
  },
];
