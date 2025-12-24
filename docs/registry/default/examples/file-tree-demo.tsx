import { FileTree } from "@/registry/default/ui/file-tree";
import { TreeNode } from "@/types/docs/file-tree";
import { FileCode, FileJson, FileText, Image, Package, Settings } from "lucide-react";

const treeData: TreeNode[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "ui",
            name: "ui",
            type: "folder",
            children: [
              { id: "button", name: "button.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
              { id: "card", name: "card.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
              {
                id: "file-tree",
                name: "file-tree.tsx",
                type: "file",
                icon: <FileCode className="h-4 w-4 text-blue-400" />,
              },
            ],
          },
          { id: "header", name: "Header.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
          { id: "sidebar", name: "Sidebar.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
        ],
      },
      {
        id: "hooks",
        name: "hooks",
        type: "folder",
        children: [
          {
            id: "use-theme",
            name: "use-theme.ts",
            type: "file",
            icon: <FileCode className="h-4 w-4 text-yellow-400" />,
          },
          {
            id: "use-mobile",
            name: "use-mobile.ts",
            type: "file",
            icon: <FileCode className="h-4 w-4 text-yellow-400" />,
          },
        ],
      },
      {
        id: "lib",
        name: "lib",
        type: "folder",
        children: [
          { id: "utils", name: "utils.ts", type: "file", icon: <FileCode className="h-4 w-4 text-yellow-400" /> },
        ],
      },
      {
        id: "assets",
        name: "assets",
        type: "folder",
        children: [
          { id: "logo", name: "logo.svg", type: "file", icon: <Image className="h-4 w-4 text-pink-400" /> },
          { id: "hero", name: "hero.png", type: "file", icon: <Image className="h-4 w-4 text-pink-400" /> },
        ],
      },
      { id: "app", name: "App.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
      { id: "main", name: "main.tsx", type: "file", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
      { id: "index-css", name: "index.css", type: "file", icon: <FileText className="h-4 w-4 text-purple-400" /> },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder",
    children: [
      { id: "favicon", name: "favicon.ico", type: "file", icon: <Image className="h-4 w-4 text-pink-400" /> },
      { id: "robots", name: "robots.txt", type: "file", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
    ],
  },
  { id: "package", name: "package.json", type: "file", icon: <Package className="h-4 w-4 text-green-400" /> },
  { id: "tsconfig", name: "tsconfig.json", type: "file", icon: <FileJson className="h-4 w-4 text-yellow-500" /> },
  { id: "vite", name: "vite.config.ts", type: "file", icon: <Settings className="h-4 w-4 text-purple-400" /> },
  { id: "readme", name: "README.md", type: "file", icon: <FileText className="h-4 w-4 text-muted-foreground" /> },
];

export default function FileTreeDemo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">File Tree</h3>
      <FileTree data={treeData} expandAllByDefault />
    </div>
  );
}