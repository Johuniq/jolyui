import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  Columns3,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

// Types
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

// Search Input Component
const TableSearch = ({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-9 w-full rounded-md border border-table-border bg-background pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
    <AnimatePresence>
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

// Column Visibility Dropdown
const ColumnVisibilityDropdown = <T,>({
  columns,
  visibleColumns,
  onChange,
}: {
  columns: ColumnDef<T>[];
  visibleColumns: string[];
  onChange: (columns: string[]) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hideableColumns = columns.filter((col) => col.hideable !== false);

  const toggleColumn = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      if (visibleColumns.length > 1) {
        onChange(visibleColumns.filter((id) => id !== columnId));
      }
    } else {
      onChange([...visibleColumns, columnId]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-md border border-table-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          open && "border-primary text-foreground"
        )}
      >
        <Columns3 className="h-4 w-4" />
        <span>Columns</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-20 mt-2 min-w-[180px] rounded-lg border border-table-border bg-card p-1 shadow-lg"
          >
            {hideableColumns.map((column) => (
              <button
                key={column.id}
                onClick={() => toggleColumn(column.id)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border transition-all",
                    visibleColumns.includes(column.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40"
                  )}
                >
                  {visibleColumns.includes(column.id) && <Check className="h-3 w-3" strokeWidth={3} />}
                </div>
                <span className="text-foreground">{column.header}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Pagination Component
const TablePagination = ({
  page,
  pageSize,
  totalItems,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationConfig) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-table-border bg-table-header px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="h-8 rounded border border-table-border bg-background px-2 text-foreground focus:border-primary focus:outline-none"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>
          {totalItems > 0 ? `${startItem}-${endItem} of ${totalItems}` : "0 items"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: canGoPrev ? 1.05 : 1 }}
          whileTap={{ scale: canGoPrev ? 0.95 : 1 }}
          disabled={!canGoPrev}
          onClick={() => onPageChange(1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded border border-table-border transition-colors",
            canGoPrev ? "hover:bg-muted text-foreground" : "cursor-not-allowed text-muted-foreground/40"
          )}
        >
          <ChevronsLeft className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: canGoPrev ? 1.05 : 1 }}
          whileTap={{ scale: canGoPrev ? 0.95 : 1 }}
          disabled={!canGoPrev}
          onClick={() => onPageChange(page - 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded border border-table-border transition-colors",
            canGoPrev ? "hover:bg-muted text-foreground" : "cursor-not-allowed text-muted-foreground/40"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>

        <div className="flex items-center gap-1 px-2">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded text-sm transition-colors",
                  page === pageNum
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {pageNum}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: canGoNext ? 1.05 : 1 }}
          whileTap={{ scale: canGoNext ? 0.95 : 1 }}
          disabled={!canGoNext}
          onClick={() => onPageChange(page + 1)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded border border-table-border transition-colors",
            canGoNext ? "hover:bg-muted text-foreground" : "cursor-not-allowed text-muted-foreground/40"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: canGoNext ? 1.05 : 1 }}
          whileTap={{ scale: canGoNext ? 0.95 : 1 }}
          disabled={!canGoNext}
          onClick={() => onPageChange(totalPages)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded border border-table-border transition-colors",
            canGoNext ? "hover:bg-muted text-foreground" : "cursor-not-allowed text-muted-foreground/40"
          )}
        >
          <ChevronsRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

// Animated Table Root
const AnimatedTableRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative w-full overflow-hidden rounded-lg border border-table-border bg-card",
      className
    )}
    {...props}
  />
));
AnimatedTableRoot.displayName = "AnimatedTableRoot";

// Table Scroll Container
const TableScrollContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { stickyHeader?: boolean }
>(({ className, stickyHeader, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("overflow-auto", stickyHeader && "max-h-[400px]", className)}
    {...props}
  />
));
TableScrollContainer.displayName = "TableScrollContainer";

// Table Element
const TableElement = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
TableElement.displayName = "TableElement";

// Table Header
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { sticky?: boolean }
>(({ className, sticky, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-table-header",
      sticky && "sticky top-0 z-10 shadow-sm",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// Table Body
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// Table Row
interface TableRowProps {
  isSelected?: boolean;
  striped?: boolean;
  index?: number;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isSelected, striped, index = 0, onClick, children }, ref) => (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={onClick}
      className={cn(
        "group border-b border-table-border transition-colors",
        "hover:bg-table-row-hover",
        isSelected && "bg-table-row-selected",
        striped && index % 2 === 1 && "bg-table-row-stripe",
        className
      )}
    >
      {children}
    </motion.tr>
  )
);
TableRow.displayName = "TableRow";

// Expanded Row
const ExpandedRow = ({
  children,
  colSpan,
}: {
  children: React.ReactNode;
  colSpan: number;
}) => (
  <motion.tr
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.2 }}
    className="border-b border-table-border bg-muted/30"
  >
    <td colSpan={colSpan} className="p-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, delay: 0.05 }}
        className="px-4 py-3"
      >
        {children}
      </motion.div>
    </td>
  </motion.tr>
);

// Expand Button
const ExpandButton = ({
  isExpanded,
  onClick,
}: {
  isExpanded: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-muted"
    animate={{ rotate: isExpanded ? 90 : 0 }}
    transition={{ duration: 0.2 }}
  >
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </motion.button>
);

// Table Head Cell
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  align?: "left" | "center" | "right";
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDirection, onSort, align = "left", ...props }, ref) => {
    const alignClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

    return (
      <th
        ref={ref}
        className={cn(
          "h-12 px-4 font-medium text-muted-foreground",
          alignClass,
          sortable && "cursor-pointer select-none hover:text-foreground",
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div
          className={cn(
            "flex items-center gap-2",
            align === "center" && "justify-center",
            align === "right" && "justify-end"
          )}
        >
          <span>{children}</span>
          {sortable && (
            <motion.span
              className="flex-shrink-0"
              animate={sortDirection ? { scale: 1 } : { scale: 0.9 }}
            >
              {sortDirection === "asc" ? (
                <ChevronUp className="h-4 w-4 text-table-sort-active animate-sort-bounce" />
              ) : sortDirection === "desc" ? (
                <ChevronDown className="h-4 w-4 text-table-sort-active animate-sort-bounce" />
              ) : (
                <ChevronsUpDown className="h-4 w-4 opacity-40 group-hover:opacity-70" />
              )}
            </motion.span>
          )}
        </div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

// Table Cell
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", ...props }, ref) => {
    const alignClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[align];

    return (
      <td
        ref={ref}
        className={cn("p-4 align-middle", alignClass, className)}
        {...props}
      />
    );
  }
);
TableCell.displayName = "TableCell";

// Checkbox Cell
interface CheckboxCellProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}

const CheckboxCell = ({ checked, indeterminate, onChange }: CheckboxCellProps) => (
  <div
    role="checkbox"
    aria-checked={indeterminate ? "mixed" : checked}
    tabIndex={0}
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    onKeyDown={(e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onChange();
      }
    }}
    className={cn(
      "flex h-4 w-4 cursor-pointer items-center justify-center rounded border transition-all duration-150",
      checked || indeterminate
        ? "border-primary bg-primary text-primary-foreground"
        : "border-muted-foreground/40 hover:border-muted-foreground"
    )}
  >
    <AnimatePresence mode="wait">
      {(checked || indeterminate) && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {indeterminate ? (
            <div className="h-0.5 w-2 rounded-full bg-current" />
          ) : (
            <Check className="h-3 w-3" strokeWidth={3} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Skeleton Row for Loading State
const SkeletonRow = ({ columns, index }: { columns: number; index: number }) => (
  <motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="border-b border-table-border"
  >
    <td colSpan={columns} className="p-4">
      <div className="flex items-center gap-4">
        <div className="h-4 w-4 rounded bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div
            className="h-4 rounded bg-muted animate-pulse"
            style={{ width: `${60 + Math.random() * 30}%` }}
          />
        </div>
        {Array.from({ length: columns - 2 }).map((_, i) => (
          <div
            key={i}
            className="h-4 rounded bg-muted animate-pulse"
            style={{ width: `${40 + Math.random() * 40}px` }}
          />
        ))}
      </div>
    </td>
  </motion.tr>
);

// Empty State
const EmptyState = ({ message, colSpan }: { message: React.ReactNode; colSpan: number }) => (
  <motion.tr
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <td colSpan={colSpan} className="h-32 text-center">
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
        {message || "No data available"}
      </div>
    </td>
  </motion.tr>
);

// Main AnimatedTable Component
export function AnimatedTable<T extends { id: string | number }>({
  data,
  columns,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
  striped = false,
  stickyHeader = false,
  className,
  emptyMessage,
  loading = false,
  loadingRows = 5,
  // New features
  searchable = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  pagination,
  expandable = false,
  renderExpandedRow,
  columnVisibility = false,
  visibleColumns: controlledVisibleColumns,
  onVisibleColumnsChange,
}: AnimatedTableProps<T>) {
  const [expandedRows, setExpandedRows] = React.useState<Set<string | number>>(new Set());
  const [internalVisibleColumns, setInternalVisibleColumns] = React.useState<string[]>(
    columns.map((col) => col.id)
  );

  const visibleColumns = controlledVisibleColumns || internalVisibleColumns;
  const setVisibleColumns = onVisibleColumnsChange || setInternalVisibleColumns;

  const displayedColumns = columns.filter((col) => visibleColumns.includes(col.id));

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = () => {
    if (onSelectionChange) {
      if (allSelected) {
        onSelectionChange([]);
      } else {
        onSelectionChange(data.map((row) => row.id));
      }
    }
  };

  const handleSelectRow = (id: string | number) => {
    if (onSelectionChange) {
      if (selectedIds.includes(id)) {
        onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
      } else {
        onSelectionChange([...selectedIds, id]);
      }
    }
  };

  const handleSort = (columnId: string) => {
    if (onSort) {
      let newDirection: SortDirection;
      if (sortColumn !== columnId) {
        newDirection = "asc";
      } else if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      } else {
        newDirection = "asc";
      }
      onSort(columnId, newDirection);
    }
  };

  const toggleRowExpanded = (id: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const extraColumns = (selectable ? 1 : 0) + (expandable ? 1 : 0);
  const totalColumns = displayedColumns.length + extraColumns;

  const showToolbar = searchable || columnVisibility;

  return (
    <AnimatedTableRoot className={className}>
      {/* Toolbar */}
      {showToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-table-border bg-table-header p-3">
          {searchable && (
            <div className="w-full sm:w-64">
              <TableSearch
                value={searchValue}
                onChange={onSearchChange || (() => {})}
                placeholder={searchPlaceholder}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            {columnVisibility && (
              <ColumnVisibilityDropdown
                columns={columns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
              />
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <TableScrollContainer stickyHeader={stickyHeader}>
        <TableElement>
          <TableHeader sticky={stickyHeader}>
            <tr className="border-b border-table-border">
              {expandable && <TableHead className="w-10" />}
              {selectable && (
                <TableHead className="w-12">
                  <CheckboxCell
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {displayedColumns.map((column) => (
                <TableHead
                  key={column.id}
                  sortable={column.sortable && !!onSort}
                  sortDirection={sortColumn === column.id ? sortDirection : null}
                  onSort={() => handleSort(column.id)}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.header}
                </TableHead>
              ))}
            </tr>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: loadingRows }).map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} columns={totalColumns} index={index} />
                ))
              ) : data.length === 0 ? (
                <EmptyState message={emptyMessage} colSpan={totalColumns} />
              ) : (
                data.map((row, index) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      isSelected={selectedIds.includes(row.id)}
                      striped={striped}
                      index={index}
                      onClick={() => onRowClick?.(row)}
                      className={onRowClick ? "cursor-pointer" : undefined}
                    >
                      {expandable && (
                        <TableCell className="w-10">
                          <ExpandButton
                            isExpanded={expandedRows.has(row.id)}
                            onClick={() => toggleRowExpanded(row.id)}
                          />
                        </TableCell>
                      )}
                      {selectable && (
                        <TableCell className="w-12">
                          <CheckboxCell
                            checked={selectedIds.includes(row.id)}
                            onChange={() => handleSelectRow(row.id)}
                          />
                        </TableCell>
                      )}
                      {displayedColumns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {column.cell
                            ? column.cell(row, index)
                            : column.accessorKey
                            ? String(row[column.accessorKey] ?? "")
                            : null}
                        </TableCell>
                      ))}
                    </TableRow>
                    <AnimatePresence>
                      {expandable && expandedRows.has(row.id) && renderExpandedRow && (
                        <ExpandedRow colSpan={totalColumns}>
                          {renderExpandedRow(row)}
                        </ExpandedRow>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </TableElement>
      </TableScrollContainer>

      {/* Pagination */}
      {pagination && <TablePagination {...pagination} />}
    </AnimatedTableRoot>
  );
}

export {
  AnimatedTableRoot, CheckboxCell, ColumnVisibilityDropdown, EmptyState, ExpandButton, ExpandedRow, SkeletonRow, TableBody, TableCell, TableElement, TableHead, TableHeader, TablePagination, TableRow, TableScrollContainer, TableSearch
};

