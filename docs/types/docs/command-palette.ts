import { LucideIcon } from "lucide-react";

/**
 * Represents an individual command item in the palette
 */
export interface CommandItem {
  /** Unique identifier for the item */
  id: string;
  /** Label displayed for the command */
  label: string;
  /** Optional description displayed below the label */
  description?: string;
  /** Optional icon displayed next to the label */
  icon?: LucideIcon;
  /** Optional keyboard shortcut keys (e.g., ["⌘", "P"]) */
  shortcut?: string[];
  /** Optional keywords for search filtering */
  keywords?: string[];
  /** Callback function when the item is selected */
  onSelect?: () => void;
  /** Optional sub-menu groups */
  children?: CommandGroup[];
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Represents a group of command items
 */
export interface CommandGroup {
  /** Unique identifier for the group */
  id: string;
  /** Heading displayed for the group */
  heading: string;
  /** List of command items in this group */
  items: CommandItem[];
}

/**
 * Props for the CommandPalette component
 */
export interface CommandPaletteProps {
  /** Whether the palette is open (controlled) */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** List of command groups to display */
  groups: CommandGroup[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Message displayed when no results are found */
  emptyMessage?: string;
  /** Global keyboard shortcut to toggle the palette */
  shortcut?: string[];
  /** Whether the palette is in a loading state */
  loading?: boolean;
  /** Whether to show recently used items */
  showRecent?: boolean;
  /** Maximum number of recent items to store */
  maxRecent?: number;
}
