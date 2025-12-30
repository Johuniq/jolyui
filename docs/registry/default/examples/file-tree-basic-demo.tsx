import { FileTree } from "@/registry/default/ui/file-tree";

const basicTreeData = [
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
      { id: "utils", name: "utils.ts", type: "file" as const },
    ],
  },
  { id: "package", name: "package.json", type: "file" as const },
  { id: "readme", name: "README.md", type: "file" as const },
];

export default function FileTreeBasicDemo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Basic File Tree</h3>
      <FileTree data={basicTreeData} />
    </div>
  );
}
