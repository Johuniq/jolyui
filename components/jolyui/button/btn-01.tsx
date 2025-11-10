import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Btn01Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export default function Btn01({
    className,
    children = "Continue",
    ...props
}: Btn01Props) {
    return (
        <Button
            className={cn(
                "relative h-11 px-6",
                "bg-zinc-900 dark:bg-zinc-50",
                "text-zinc-50 dark:text-zinc-900",
                "hover:bg-zinc-800 dark:hover:bg-zinc-100",
                "rounded-xl",
                "transition-all duration-300",
                "overflow-hidden",
                "group",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "flex items-center gap-2",
                    "transition-all duration-300"
                )}
            >
                <span>{children}</span>
                <ArrowRight
                    className={cn(
                        "w-4 h-4",
                        "transition-transform duration-300",
                        "group-hover:translate-x-1"
                    )}
                />
            </div>
        </Button>
    );
}
