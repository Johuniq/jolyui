import { Mail, MapPin, Phone, User } from "lucide-react";
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
  location: string;
  phone: string;
}

const data: UserData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    location: "New York, NY",
    phone: "+1 555-0101",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Developer",
    status: "active",
    location: "San Francisco, CA",
    phone: "+1 555-0102",
  },
  {
    id: "3",
    name: "Carol White",
    email: "carol@example.com",
    role: "Designer",
    status: "pending",
    location: "Los Angeles, CA",
    phone: "+1 555-0103",
  },
];

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

const ExpandedRowContent = ({ row }: { row: UserData }) => (
  <div className="grid gap-4 pl-10 sm:grid-cols-2">
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
    <div className="flex items-center gap-2 text-sm sm:col-span-2">
      <MapPin className="h-4 w-4 text-muted-foreground" />
      <span className="text-muted-foreground">Location:</span>
      <span className="text-foreground">{row.location}</span>
    </div>
  </div>
);

export default function AnimatedTableExpandDemo() {
  return (
    <div className="flex flex-col gap-3">
      <AnimatedTable
        data={data}
        columns={columns}
        expandable
        renderExpandedRow={(row) => <ExpandedRowContent row={row} />}
      />
    </div>
  );
}
