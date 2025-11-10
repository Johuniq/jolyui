import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Btn11Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    showIcon?: boolean;
}

export default function Btn11({
    className,
    children = "Button",
    showIcon = true,
    ...props
}: Btn11Props) {
    return (
        <Button
            className={cn(
                "relative h-10 px-4",
                "bg-linear-to-b from-zinc-50 to-zinc-100/80",
                "dark:from-zinc-900 dark:to-zinc-800/80",
                "text-zinc-800 dark:text-zinc-200",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:border-zinc-300 dark:hover:border-zinc-700",
                "shadow-xs hover:shadow-sm",
                "transition-all duration-200",
                "group",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-center gap-2">
                <span className="relative">
                    {children}
                    <span className={cn(
                        "absolute -bottom-px left-0 w-full h-px",
                        "bg-linear-to-r from-zinc-400/0 via-zinc-400/50 to-zinc-400/0",
                        "dark:from-zinc-600/0 dark:via-zinc-600/50 dark:to-zinc-600/0",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-200"
                    )} />
                </span>
                {showIcon && (
                    <ChevronRight 
                        className={cn(
                            "w-4 h-4",
                            "transform group-hover:translate-x-0.5",
                            "transition-transform duration-200"
                        )}
                    />
                )}
            </div>
        </Button>
    );
} 