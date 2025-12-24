import { AnimatedTable, ColumnDef } from "@/registry/default/ui/animated-table";
import { User } from "lucide-react";
import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const data: UserData[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Developer", status: "active" },
  { id: "3", name: "Carol White", email: "carol@example.com", role: "Designer", status: "pending" },
  { id: "4", name: "David Brown", email: "david@example.com", role: "Developer", status: "inactive" },
  { id: "5", name: "Emma Davis", email: "emma@example.com", role: "Manager", status: "active" },
];

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

export default function AnimatedTableSelectDemo() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm">Selectable Animated Table</h3>
      <AnimatedTable
        data={data}
        columns={columns}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
      {selectedIds.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selectedIds.length} row{selectedIds.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}