import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: TreeNode[];
  icon?: React.ReactNode;
}

interface FileTreeContextValue {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  expandedIds: Set<string>;
  toggleExpanded: (id: string) => void;
}

const FileTreeContext = React.createContext<FileTreeContextValue | null>(null);

function useFileTree() {
  const context = React.useContext(FileTreeContext);
  if (!context) {
    throw new Error("useFileTree must be used within a FileTree");
  }
  return context;
}

function getAllFolderIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (node.type === "folder") {
      ids.push(node.id);
      if (node.children) {
        ids.push(...getAllFolderIds(node.children));
      }
    }
  }
  return ids;
}

interface FileTreeProps {
  data: TreeNode[];
  className?: string;
  defaultExpandedIds?: string[];
  expandAllByDefault?: boolean;
  onSelect?: (node: TreeNode) => void;
}

export function FileTree({
  data,
  className,
  defaultExpandedIds = [],
  expandAllByDefault = false,
  onSelect,
}: FileTreeProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(expandAllByDefault ? getAllFolderIds(data) : defaultExpandedIds),
  );

  const toggleExpanded = React.useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelect = React.useCallback(
    (node: TreeNode) => {
      setSelectedId(node.id);
      onSelect?.(node);
    },
    [onSelect],
  );

  return (
    <FileTreeContext.Provider
      value={{
        selectedId,
        setSelectedId: (id) => setSelectedId(id),
        expandedIds,
        toggleExpanded,
      }}
    >
      <div
        className={cn(
          "rounded-lg border border-border bg-card p-2 font-mono text-sm",
          className,
        )}
        role="tree"
        aria-label="File tree"
      >
        <TreeNodeList nodes={data} level={0} onSelect={handleSelect} />
      </div>
    </FileTreeContext.Provider>
  );
}

interface TreeNodeListProps {
  nodes: TreeNode[];
  level: number;
  onSelect: (node: TreeNode) => void;
}

function TreeNodeList({ nodes, level, onSelect }: TreeNodeListProps) {
  return (
    <ul className="space-y-0.5" role="group">
      {nodes.map((node, index) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={level}
          onSelect={onSelect}
          isLast={index === nodes.length - 1}
        />
      ))}
    </ul>
  );
}

interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
  onSelect: (node: TreeNode) => void;
  isLast: boolean;
}

function TreeNodeItem({
  node,
  level,
  onSelect,
  isLast: _isLast,
}: TreeNodeItemProps) {
  const { selectedId, expandedIds, toggleExpanded } = useFileTree();
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const hasChildren =
    node.type === "folder" && node.children && node.children.length > 0;

  const handleClick = () => {
    if (node.type === "folder") {
      toggleExpanded(node.id);
    }
    onSelect(node);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
    if (e.key === "ArrowRight" && node.type === "folder" && !isExpanded) {
      e.preventDefault();
      toggleExpanded(node.id);
    }
    if (e.key === "ArrowLeft" && node.type === "folder" && isExpanded) {
      e.preventDefault();
      toggleExpanded(node.id);
    }
  };

  const getFileIcon = () => {
    if (node.icon) return node.icon;
    if (node.type === "folder") {
      return isExpanded ? (
        <FolderOpen className="h-4 w-4 text-tree-folder" />
      ) : (
        <Folder className="h-4 w-4 text-tree-folder" />
      );
    }
    return <File className="h-4 w-4 text-tree-file" />;
  };

  return (
    <li
      role="treeitem"
      aria-expanded={node.type === "folder" ? isExpanded : undefined}
      tabIndex={0}
    >
      <motion.div
        className={cn(
          "group relative flex cursor-pointer select-none items-center gap-1 rounded-md px-2 py-1.5 transition-colors",
          isSelected
            ? "bg-tree-selected-bg text-foreground"
            : "text-muted-foreground hover:bg-tree-hover hover:text-foreground",
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {/* Indent lines */}
        {level > 0 && (
          <div
            className="absolute top-0 left-0 h-full"
            style={{ width: `${level * 12}px` }}
          >
            {Array.from({ length: level }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-px bg-tree-line opacity-30"
                style={{ left: `${i * 12 + 12}px` }}
              />
            ))}
          </div>
        )}

        {/* Chevron for folders */}
        {node.type === "folder" ? (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex h-4 w-4 shrink-0 items-center justify-center"
          >
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.div>
        ) : (
          <div className="h-4 w-4 shrink-0" />
        )}

        {/* Icon */}
        <motion.div
          className="shrink-0"
          initial={false}
          animate={{ scale: isSelected ? 1.1 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {getFileIcon()}
        </motion.div>

        {/* Name */}
        <span className="truncate text-[13px]">{node.name}</span>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-tree-selected"
            layoutId="selection-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Children */}
      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.15, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <TreeNodeList
              nodes={node.children || []}
              level={level + 1}
              onSelect={onSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export { FileTreeContext, useFileTree };
