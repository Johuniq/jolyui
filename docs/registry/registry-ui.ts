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
];
