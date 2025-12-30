import { User } from "lucide-react";
import { useMemo, useState } from "react";
import {
  AnimatedTable,
  type ColumnDef,
} from "@/registry/default/ui/animated-table";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const generateData = (): UserData[] => [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "Designer",
    status: "pending",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "Developer",
    status: "inactive",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "7",
    name: "Grace Lee",
    email: "grace@example.com",
    role: "Designer",
    status: "active",
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry@example.com",
    role: "Developer",
    status: "pending",
  },
  {
    id: "9",
    name: "Ivy Chen",
    email: "ivy@example.com",
    role: "Manager",
    status: "active",
  },
  {
    id: "10",
    name: "Jack Taylor",
    email: "jack@example.com",
    role: "Developer",
    status: "active",
  },
  {
    id: "11",
    name: "Kate Anderson",
    email: "kate@example.com",
    role: "Designer",
    status: "inactive",
  },
  {
    id: "12",
    name: "Liam Harris",
    email: "liam@example.com",
    role: "Developer",
    status: "active",
  },
];

const allData = generateData();

const StatusBadge = ({ status }: { status: UserData["status"] }) => {
  const styles = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-red-500/20 text-red-400 border-red-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-medium text-xs ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === "active" ? "bg-green-400" : status === "inactive" ? "bg-red-400" : "bg-yellow-400"}`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const columns: ColumnDef<UserData>[] = [
  {
    id: "name",
    header: "Name",
    sortable: true,
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
    id: "status",
    header: "Status",
    sortable: true,
    align: "center",
    cell: (row) => <StatusBadge status={row.status} />,
  },
];

export default function AnimatedTablePaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allData.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className="flex flex-col gap-3">
      <AnimatedTable
        data={paginatedData}
        columns={columns}
        pagination={{
          page,
          pageSize,
          totalItems: allData.length,
          pageSizeOptions: [5, 10, 20],
          onPageChange: setPage,
          onPageSizeChange: handlePageSizeChange,
        }}
      />
    </div>
  );
}
