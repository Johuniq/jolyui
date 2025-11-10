import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Btn09({
    className,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
}) {
    return (
        <Button
            {...props}
            className={cn(
                "relative p-2",
                "rounded-lg overflow-hidden",
                "bg-linear-to-b from-zinc-50 to-zinc-100",
                "dark:from-zinc-800 dark:to-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                "transition-all duration-300 ease-out",
                "group",
                "inline-flex items-center justify-center",
                className
            )}
        >
            {children}
            <span
                className={cn(
                    "absolute inset-0",
                    "bg-linear-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0",
                    "translate-x-[-100%]",
                    "group-hover:translate-x-[100%]",
                    "transition-transform duration-500",
                    "ease-out"
                )}
            />
        </Button>
    );
}
