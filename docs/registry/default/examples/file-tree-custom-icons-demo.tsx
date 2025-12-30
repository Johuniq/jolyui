import { FileCode, FileJson, Image, Package, Settings } from "lucide-react";
import { FileTree } from "@/registry/default/ui/file-tree";

const customIconsTreeData = [
  {
    id: "src",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "components",
        name: "components",
        type: "folder" as const,
        children: [
          {
            id: "button",
            name: "Button.tsx",
            type: "file" as const,
            icon: <FileCode className="h-4 w-4 text-blue-400" />,
          },
          {
            id: "input",
            name: "Input.tsx",
            type: "file" as const,
            icon: <FileCode className="h-4 w-4 text-blue-400" />,
          },
        ],
      },
      {
        id: "utils",
        name: "utils.ts",
        type: "file" as const,
        icon: <FileCode className="h-4 w-4 text-yellow-400" />,
      },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder" as const,
    children: [
      {
        id: "logo",
        name: "logo.svg",
        type: "file" as const,
        icon: <Image className="h-4 w-4 text-pink-400" />,
      },
      {
        id: "favicon",
        name: "favicon.ico",
        type: "file" as const,
        icon: <Image className="h-4 w-4 text-pink-400" />,
      },
    ],
  },
  {
    id: "package",
    name: "package.json",
    type: "file" as const,
    icon: <Package className="h-4 w-4 text-green-400" />,
  },
  {
    id: "tsconfig",
    name: "tsconfig.json",
    type: "file" as const,
    icon: <FileJson className="h-4 w-4 text-yellow-500" />,
  },
  {
    id: "vite",
    name: "vite.config.ts",
    type: "file" as const,
    icon: <Settings className="h-4 w-4 text-purple-400" />,
  },
];

export default function FileTreeCustomIconsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">File Tree with Custom Icons</h3>
      <FileTree data={customIconsTreeData} />
    </div>
  );
}
