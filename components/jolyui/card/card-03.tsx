import { Rocket, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamMember {
    name: string;
    role: string;
    avatar: string;
    status: "online" | "busy" | "offline";
}

interface Milestone {
    title: string;
    dueDate: string;
    completed: boolean;
}

interface Card03Props {
    projectName?: string;
    description?: string;
    teamMembers?: TeamMember[];
    milestones?: Milestone[];
}

export default function Card03({
    projectName = "To complete",
    description = "Revamp the design of the website",
    teamMembers = [
        {
            name: "Alex",
            role: "Lead Designer",
            avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
            status: "online",
        },
        {
            name: "Sarah",
            role: "Developer",
            avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
            status: "busy",
        },
        {
            name: "Mike",
            role: "PM",
            avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-03-JateJIUhtd3PXynaMG9TDWQ55j5AVP.png",
            status: "offline",
        },
    ],
    milestones = [
        { title: "Dark Mode", dueDate: "2d", completed: true },
        { title: "Components", dueDate: "5d left", completed: false },
        { title: "Documentation", dueDate: "7d left", completed: false },
    ],
}: Card03Props) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className={cn(
                    "relative overflow-hidden",
                    "bg-white/50 dark:bg-zinc-900/50",
                    "backdrop-blur-xl",
                    "border border-zinc-200/50 dark:border-zinc-800/50",
                    "rounded-2xl",
                    "transition-all duration-300",
                    "hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
                    "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
                )}
            >
                <div className="p-5">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {projectName}
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <div className="flex space-x-2">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={member.name}
                                        className={cn(
                                            "relative rounded-full ",
                                            "hover:z-10"
                                        )}
                                    >
                                        <Image
                                            src={member.avatar}
                                            alt={member.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <div
                                            className={cn(
                                                "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full",
                                                "ring-2 ring-white dark:ring-zinc-900",
                                                member.status === "online" &&
                                                    "bg-emerald-500",
                                                member.status === "busy" &&
                                                    "bg-amber-500",
                                                member.status === "offline" &&
                                                    "bg-zinc-300 dark:bg-zinc-600"
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                Milestones
                            </h3>
                            {milestones.map((milestone) => (
                                <div
                                    key={milestone.title}
                                    className={cn(
                                        "flex items-center justify-between",
                                        "p-3 rounded-xl",
                                        "bg-zinc-50 dark:bg-zinc-800/50",
                                        "transition-colors duration-200",
                                        "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "w-5 h-5 rounded-full",
                                                "flex items-center justify-center",
                                                milestone.completed
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500"
                                            )}
                                        >
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                            {milestone.title}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        {milestone.dueDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
