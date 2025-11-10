import { cn } from "@/lib/utils";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    ShoppingCart,
    CreditCard,
    type LucideIcon,
    ArrowRight,
} from "lucide-react";

interface Transaction {
    id: string;
    title: string;
    amount: string;
    type: "incoming" | "outgoing";
    category: string;
    icon: LucideIcon;
    timestamp: string;
    status: "completed" | "pending" | "failed";
}

interface List02Props {
    transactions?: Transaction[];
    className?: string;
}

const categoryStyles = {
    shopping: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    food: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    transport: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
    entertainment:
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
};

const TRANSACTIONS: Transaction[] = [
    {
        id: "1",
        title: "Apple Store Purchase",
        amount: "$999.00",
        type: "outgoing",
        category: "shopping",
        icon: ShoppingCart,
        timestamp: "Today, 2:45 PM",
        status: "completed",
    },
    {
        id: "2",
        title: "Salary Deposit",
        amount: "$4,500.00",
        type: "incoming",
        category: "transport",
        icon: Wallet,
        timestamp: "Today, 9:00 AM",
        status: "completed",
    },
    {
        id: "3",
        title: "Netflix Subscription",
        amount: "$15.99",
        type: "outgoing",
        category: "entertainment",
        icon: CreditCard,
        timestamp: "Yesterday",
        status: "pending",
    },
    {
        id: "4",
        title: "Apple Store Purchase",
        amount: "$999.00",
        type: "outgoing",
        category: "shopping",
        icon: ShoppingCart,
        timestamp: "Today, 2:45 PM",
        status: "completed",
    },
    {
        id: "5",
        title: "Supabase Subscription",
        amount: "$15.99",
        type: "outgoing",
        category: "entertainment",
        icon: CreditCard,
        timestamp: "Yesterday",
        status: "pending",
    },
    {
        id: "6",
        title: "Vercel Subscription",
        amount: "$15.99",
        type: "outgoing",
        category: "entertainment",
        icon: CreditCard,
        timestamp: "Yesterday",
        status: "pending",
    },
];

export default function List02({
    transactions = TRANSACTIONS,
    className,
}: List02Props) {
    return (
        <div
            className={cn(
                "w-full max-w-xl mx-auto",
                "bg-white dark:bg-zinc-900/70",
                "border border-zinc-100 dark:border-zinc-800",
                "rounded-xl shadow-sm backdrop-blur-xl",
                className
            )}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Recent Activity
                        <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">
                            (23 transactions)
                        </span>
                    </h2>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                        This Month
                    </span>
                </div>

                <div className="space-y-1">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className={cn(
                                "group flex items-center gap-3",
                                "p-2 rounded-lg",
                                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                                "transition-all duration-200"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-2 rounded-lg",
                                    "bg-zinc-100 dark:bg-zinc-800",
                                    "border border-zinc-200 dark:border-zinc-700"
                                )}
                            >
                                <transaction.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                            </div>

                            <div className="flex-1 flex items-center justify-between min-w-0">
                                <div className="space-y-0.5">
                                    <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                        {transaction.title}
                                    </h3>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                                        {transaction.timestamp}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1.5 pl-3">
                                    <span
                                        className={cn(
                                            "text-xs font-medium",
                                            transaction.type === "incoming"
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-red-600 dark:text-red-400"
                                        )}
                                    >
                                        {transaction.type === "incoming"
                                            ? "+"
                                            : "-"}
                                        {transaction.amount}
                                    </span>
                                    {transaction.type === "incoming" ? (
                                        <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                        <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                    type="button"
                    className={cn(
                        "w-full flex items-center justify-center gap-2",
                        "py-2 px-3 rounded-lg",
                        "text-xs font-medium",
                        "bg-gradient-to-r from-zinc-900 to-zinc-800",
                        "dark:from-zinc-50 dark:to-zinc-200",
                        "text-zinc-50 dark:text-zinc-900",
                        "hover:from-zinc-800 hover:to-zinc-700",
                        "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
                        "shadow-sm hover:shadow",
                        "transform transition-all duration-200",
                        "hover:-translate-y-0.5",
                        "active:translate-y-0",
                        "focus:outline-none focus:ring-2",
                        "focus:ring-zinc-500 dark:focus:ring-zinc-400",
                        "focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                    )}
                >
                    <span>View All Transactions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}
