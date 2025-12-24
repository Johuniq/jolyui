import { AnimatedTable, ColumnDef, SortDirection } from "@/registry/default/ui/animated-table";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useMemo, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  department: string;
  joinDate: string;
  location: string;
  phone: string;
}

const generateData = (): UserData[] => [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active", department: "Engineering", joinDate: "2024-01-15", location: "New York, NY", phone: "+1 555-0101" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2024-02-20", location: "San Francisco, CA", phone: "+1 555-0102" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Designer", status: "pending", department: "Design", joinDate: "2024-03-10", location: "Los Angeles, CA", phone: "+1 555-0103" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "Developer", status: "inactive", department: "Engineering", joinDate: "2023-11-05", location: "Chicago, IL", phone: "+1 555-0104" },
  { id: "5", name: "Emma Davis", email: "emma@example.com", role: "Manager", status: "active", department: "Management", joinDate: "2023-08-22", location: "Boston, MA", phone: "+1 555-0105" },
  { id: "6", name: "Frank Miller", email: "frank@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2024-04-01", location: "Seattle, WA", phone: "+1 555-0106" },
  { id: "7", name: "Grace Lee", email: "grace@example.com", role: "Designer", status: "active", department: "Design", joinDate: "2024-01-30", location: "Austin, TX", phone: "+1 555-0107" },
  { id: "8", name: "Henry Wilson", email: "henry@example.com", role: "Developer", status: "pending", department: "Engineering", joinDate: "2024-05-15", location: "Denver, CO", phone: "+1 555-0108" },
  { id: "9", name: "Ivy Chen", email: "ivy@example.com", role: "Manager", status: "active", department: "Management", joinDate: "2023-06-12", location: "Portland, OR", phone: "+1 555-0109" },
  { id: "10", name: "Jack Taylor", email: "jack@example.com", role: "Developer", status: "active", department: "Engineering", joinDate: "2024-02-28", location: "Miami, FL", phone: "+1 555-0110" },
];

const allData = generateData();

const StatusBadge = ({ status }: { status: UserData["status"] }) => {
  const styles = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-red-500/20 text-red-400 border-red-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-green-400" : status === "inactive" ? "bg-red-400" : "bg-yellow-400"}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const columns: ColumnDef<UserData>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
    hideable: false,
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
          <User className="h-4 w-4" />
        </div>
        <span className="font-medium text-foreground">{row.name}</span>
      </div>
    ),
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: true,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    sortable: true,
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    sortable: true,
    align: "center",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    id: "joinDate",
    header: "Join Date",
    sortable: true,
    align: "right",
    cell: (row) => (
      <span className="text-muted-foreground">
        {new Date(row.joinDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
  },
];

const ExpandedRowContent = ({ row }: { row: UserData }) => (
  <div className="grid gap-4 pl-10 sm:grid-cols-3">
    <div className="flex items-center gap-2 text-sm">
      <Mail className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">Email:</span>
      <span className="text-foreground">{row.email}</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <Phone className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">Phone:</span>
      <span className="text-foreground">{row.phone}</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">Location:</span>
      <span className="text-foreground">{row.location}</span>
    </div>
  </div>
);

export default function AnimatedTableFullDemo() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((c) => c.id));

  const handleSort = (columnId: string, direction: SortDirection) => {
    setSortColumn(columnId);
    setSortDirection(direction);
  };

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchValue) return allData;
    const search = searchValue.toLowerCase();
    return allData.filter(
      (row) =>
        row.name.toLowerCase().includes(search) ||
        row.email.toLowerCase().includes(search) ||
        row.role.toLowerCase().includes(search) ||
        row.department.toLowerCase().includes(search)
    );
  }, [searchValue]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn as keyof UserData];
      const bVal = b[sortColumn as keyof UserData];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate sorted data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleRowClick = (row: UserData) => {
    console.log("Clicked:", row.name);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Full Featured Animated Table</h3>
      <AnimatedTable
        data={paginatedData}
        columns={columns}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onRowClick={handleRowClick}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        striped
        searchable
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search users..."
        expandable
        renderExpandedRow={(row) => <ExpandedRowContent row={row} />}
        columnVisibility
        visibleColumns={visibleColumns}
        onVisibleColumnsChange={setVisibleColumns}
        pagination={{
          page,
          pageSize,
          totalItems: sortedData.length,
          pageSizeOptions: [5, 10, 20],
          onPageChange: setPage,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
      {selectedIds.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedIds.length} row{selectedIds.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}