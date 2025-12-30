import { FileTree } from "@/registry/default/ui/file-tree";

const expandableTreeData = [
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
          { id: "card", name: "Card.tsx", type: "file" as const },
        ],
      },
      {
        id: "hooks",
        name: "hooks",
        type: "folder" as const,
        children: [
          { id: "use-theme", name: "use-theme.ts", type: "file" as const },
          { id: "use-mobile", name: "use-mobile.ts", type: "file" as const },
        ],
      },
      { id: "utils", name: "utils.ts", type: "file" as const },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder" as const,
    children: [
      { id: "favicon", name: "favicon.ico", type: "file" as const },
      { id: "logo", name: "logo.svg", type: "file" as const },
    ],
  },
  { id: "package", name: "package.json", type: "file" as const },
  { id: "readme", name: "README.md", type: "file" as const },
];

export default function FileTreeExpandableDemo() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Expandable File Tree</h3>
      <FileTree
        data={expandableTreeData}
        defaultExpandedIds={["src", "components"]}
      />
    </div>
  );
}
