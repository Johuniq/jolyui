import { useState } from "react";
import { FileTree, type TreeNode } from "@/registry/default/ui/file-tree";

const selectableTreeData: TreeNode[] = [
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
          { id: "button", name: "Button.tsx", type: "file" },
          { id: "input", name: "Input.tsx", type: "file" },
        ],
      },
      { id: "utils", name: "utils.ts", type: "file" },
    ],
  },
  { id: "package", name: "package.json", type: "file" },
  { id: "readme", name: "README.md", type: "file" },
];

export default function FileTreeSelectableDemo() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Selectable File Tree</h3>
      <FileTree data={selectableTreeData} onSelect={handleSelect} />
      {selectedNode && (
        <p className="text-muted-foreground text-sm">
          Selected: {selectedNode.name} ({selectedNode.type})
        </p>
      )}
    </div>
  );
}
