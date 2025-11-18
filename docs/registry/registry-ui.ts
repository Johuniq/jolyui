import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "avatar-group",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
    files: [
      {
        path: "ui/avatar-group.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "github-contributors",
    type: "registry:ui",
    dependencies: [
      "@jolyui/github-contributors",
      "@radix-ui/react-tooltip",
      "lucide-react",
      "motion",
    ],
    registryDependencies: ["card", "skeleton", "tooltip"],
    files: [
      {
        path: "ui/github-contributors.tsx",
        type: "registry:ui",
      },
    ],
  },
];
