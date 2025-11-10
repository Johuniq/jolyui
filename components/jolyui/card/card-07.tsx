import { Calendar, Clock, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
    title: string;
    time: string;
    attendees: number;
    status: "upcoming" | "inProgress" | "completed";
}

interface Card07Props {
    date?: string;
    events?: Event[];
}

export default function Card07({
    date = "Today, December 14",
    events = [
        {
            title: "Design Review",
            time: "10:00 AM",
            attendees: 5,
            status: "completed"
        },
        {
            title: "Team Sync",
            time: "2:30 PM",
            attendees: 8,
            status: "inProgress"
        },
        {
            title: "Product Planning",
            time: "4:00 PM",
            attendees: 12,
            status: "upcoming"
        }
    ]
}: Card07Props) {
    return (
        <div className="w-full max-w-sm mx-auto">
            <div className={cn(
                "overflow-hidden",
                "bg-white dark:bg-zinc-900",
                "rounded-2xl",
                "transition-all duration-200",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:border-zinc-300 dark:hover:border-zinc-700"
            )}>
                {/* Header */}
                <div className="p-5 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "p-2.5 rounded-xl",
                            "bg-zinc-100 dark:bg-zinc-800"
                        )}>
                            <Calendar className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Schedule
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                {date}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Events List */}
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {events.map((event, index) => (
                        <div 
                            key={index}
                            className={cn(
                                "p-5",
                                "transition-colors duration-200",
                                "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                            )}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {event.title}
                                </h4>
                                <div className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    event.status === "completed" && "bg-zinc-300 dark:bg-zinc-600",
                                    event.status === "inProgress" && "bg-blue-500",
                                    event.status === "upcoming" && "bg-zinc-200 dark:bg-zinc-700"
                                )} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" />
                                        {event.attendees}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-zinc-200 dark:border-zinc-800">
                    <button className={cn(
                        "w-full",
                        "flex items-center justify-center gap-2",
                        "px-4 py-2.5 rounded-xl",
                        "bg-zinc-100 dark:bg-zinc-800",
                        "text-sm font-medium text-zinc-900 dark:text-zinc-100",
                        "transition-colors duration-200",
                        "hover:bg-zinc-200 dark:hover:bg-zinc-700",
                        "group"
                    )}>
                        View Full Schedule
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
