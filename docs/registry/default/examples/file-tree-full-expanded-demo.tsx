import { FileTree } from "@/registry/default/ui/file-tree";

const fullExpandedTreeData = [
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
          { id: "button", name: "Button.tsx", type: "file" as const },
          { id: "input", name: "Input.tsx", type: "file" as const },
        ],
      },
      {
        id: "utils",
        name: "utils",
        type: "folder" as const,
        children: [
          { id: "cn", name: "cn.ts", type: "file" as const },
          { id: "format", name: "format.ts", type: "file" as const },
        ],
      },
      { id: "app", name: "App.tsx", type: "file" as const },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder" as const,
    children: [
      { id: "favicon", name: "favicon.ico", type: "file" as const },
      { id: "robots", name: "robots.txt", type: "file" as const },
    ],
  },
  { id: "package", name: "package.json", type: "file" as const },
  { id: "tsconfig", name: "tsconfig.json", type: "file" as const },
];

export default function FileTreeFullExpandedDemo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Fully Expanded File Tree</h3>
      <FileTree data={fullExpandedTreeData} expandAllByDefault />
    </div>
  );
}
