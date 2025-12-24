import * as React from "react";

export type SortDirection = "asc" | "desc" | null;

export interface ColumnDef<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
  hideable?: boolean;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface AnimatedTableProps<T extends { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;
  onRowClick?: (row: T) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (columnId: string, direction: SortDirection) => void;
  striped?: boolean;
  stickyHeader?: boolean;
  className?: string;
  emptyMessage?: React.ReactNode;
  loading?: boolean;
  loadingRows?: number;
  // New features
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  pagination?: PaginationConfig;
  expandable?: boolean;
  renderExpandedRow?: (row: T) => React.ReactNode;
  columnVisibility?: boolean;
  visibleColumns?: string[];
  onVisibleColumnsChange?: (columns: string[]) => void;
}