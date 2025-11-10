import { Calendar, Sparkles, Code2, ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Skill {
    name: string;
    level: number;
}

interface Card02Props {
    name?: string;
    role?: string;
    image?: string;
    status?: string;
    skills?: Skill[];
    portfolio?: string;
}

const defaultProfile = {
    name: "Eugene K",
    role: "Senior Developer",
    image: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
    status: "Open to Work",
    skills: [
        { name: "Frontend", level: 5 },
        { name: "Backend", level: 4 },
        { name: "DevOps", level: 4 },
    ],
    portfolio: "github.com/alexchen",
} satisfies Required<Card02Props>;

export default function Card02({
    name = defaultProfile.name,
    role = defaultProfile.role,
    image = defaultProfile.image,
    status = defaultProfile.status,
    skills = defaultProfile.skills,
    portfolio = defaultProfile.portfolio,
}: Card02Props = defaultProfile) {
    return (
        <div className="w-full max-w-xs mx-auto">
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
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div
                                className={cn(
                                    "w-16 h-16 rounded-xl overflow-hidden",
                                    "ring-2 ring-zinc-100 dark:ring-zinc-800"
                                )}
                            >
                                <Image
                                    src={image}
                                    alt={name}
                                    width={64}
                                    height={64}
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                                {name}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-0.5">
                                {role}
                            </p>
                            <div
                                className={cn(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
                                    "bg-emerald-50 dark:bg-emerald-900/20",
                                    "text-emerald-600 dark:text-emerald-400",
                                    "text-xs font-medium"
                                )}
                            >
                                <Calendar className="w-3 h-3" />
                                {status}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-5">
                    <div className="space-y-2.5">
                        {skills?.map((skill) => (
                            <div
                                key={skill.name}
                                className={cn(
                                    "flex items-center gap-3",
                                    "p-2 rounded-xl",
                                    "bg-zinc-50 dark:bg-zinc-800/50",
                                    "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                    "transition-colors duration-200"
                                )}
                            >
                                <Code2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between text-sm mb-1.5">
                                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                                            {skill.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "h-1 rounded-full flex-1",
                                                    i < skill.level
                                                        ? "bg-zinc-900 dark:bg-zinc-100"
                                                        : "bg-zinc-200 dark:bg-zinc-700"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-5 pb-5 flex gap-2 items-center">
                    <Button
                        variant="default"
                        size="sm"
                        className={cn(
                            "w-full",
                            "bg-zinc-900 dark:bg-zinc-100",
                            "hover:bg-zinc-700 dark:hover:bg-zinc-300",
                            "text-white dark:text-zinc-900",
                            "shadow-xs"
                        )}
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Portfolio
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg p-1.5"
                    >
                        <Share2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">
                            Share
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
