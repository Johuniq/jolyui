import { cn } from "@/lib/utils";
import { MessageSquare, type LucideIcon, Music, Store } from "lucide-react";

interface ListItem {
    id: string;
    title: string;
    description?: string;
    icon: LucideIcon;
    iconStyle: string;
    time: string;
    badge?: {
        text: string;
        variant: "pink" | "indigo" | "orange";
    };
    starred?: boolean;
}

interface List01Props {
    items?: ListItem[];
    className?: string;
}

const iconStyles = {
    music: "from-pink-500/20 to-pink-500/10 text-pink-600 dark:from-pink-400/20 dark:to-pink-400/10 dark:text-pink-400",
    store: "from-indigo-500/20 to-indigo-500/10 text-indigo-600 dark:from-indigo-400/20 dark:to-indigo-400/10 dark:text-indigo-400",
    message:
        "from-emerald-500/20 to-emerald-500/10 text-emerald-600 dark:from-emerald-400/20 dark:to-emerald-400/10 dark:text-emerald-400",
};

const ITEMS: ListItem[] = [
    {
        id: "1",
        title: "iMessage",
        description:
            'John sent you a message: "Hey, what do you think about..."',
        icon: MessageSquare,
        iconStyle: "message",
        time: "now",
        badge: { text: "New", variant: "orange" },
    },
    {
        id: "2",
        title: "Apple Music",
        description: "Your Daily Mix is ready with 25 new songs",
        icon: Music,
        iconStyle: "music",
        time: "2 min ago",
        badge: { text: "Music", variant: "pink" },
    },
    {
        id: "3",
        title: "App Store",
        description: "Figma has been updated to version 2.0",
        icon: Store,
        iconStyle: "store",
        time: "5 min ago",
        badge: { text: "Update", variant: "indigo" },
    },
];

const badgeVariants = {
    pink: "bg-pink-500/10 text-pink-600 dark:bg-pink-400/10 dark:text-pink-300",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
    orange: "bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300",
};

export default function List01({ items = ITEMS, className }: List01Props) {
    return (
        <div
            className={cn(
                "w-full max-w-2xl mx-auto p-4",
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl",
                "rounded-3xl border border-white/20 dark:border-zinc-800/50",
                "shadow-sm",
                className
            )}
        >
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "group relative flex items-start gap-4 p-4",
                            "bg-white/50 dark:bg-zinc-800/50",
                            "hover:bg-white/80 dark:hover:bg-zinc-700/50",
                            "backdrop-blur-lg",
                            "transition-all duration-300 ease-out",
                            "rounded-2xl",
                            "border border-white/20 dark:border-zinc-700/50",
                            "shadow-xs hover:shadow-sm"
                        )}
                    >
                        <div
                            className={cn(
                                "shrink-0 p-3 rounded-2xl",
                                "bg-linear-to-br",
                                iconStyles[
                                    item.iconStyle as keyof typeof iconStyles
                                ],
                                "shadow-xs border border-white/10 dark:border-zinc-700/50",
                                "transition-colors duration-300"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                    {item.title}
                                </h3>
                                {item.badge && (
                                    <span
                                        className={cn(
                                            "px-2.5 py-0.5 rounded-full text-xs font-medium",
                                            "transition-colors duration-300",
                                            "shadow-xs",
                                            badgeVariants[
                                                item.badge
                                                    .variant as keyof typeof badgeVariants
                                            ]
                                        )}
                                    >
                                        {item.badge.text}
                                    </span>
                                )}
                            </div>
                            {item.description && (
                                <p className="text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            )}
                            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-2 block">
                                {item.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
