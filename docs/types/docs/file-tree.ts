export interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: TreeNode[];
  icon?: React.ReactNode;
}

export interface FileTreeProps {
  /**
   * The hierarchical data structure representing the file tree.
   */
  data: TreeNode[];

  /**
   * Additional CSS classes to apply to the file tree container.
   */
  className?: string;

  /**
   * Array of node IDs that should be expanded by default.
   */
  defaultExpandedIds?: string[];

  /**
   * Whether all folders should be expanded by default.
   * If true, overrides defaultExpandedIds.
   */
  expandAllByDefault?: boolean;

  /**
   * Callback function called when a node is selected.
   */
  onSelect?: (node: TreeNode) => void;
}