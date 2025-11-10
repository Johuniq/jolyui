"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
    Check,
    Sparkles,
    ArrowRight,
    Shield,
    Zap,
    Infinity,
} from "lucide-react";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    highlight?: boolean;
}

const features: Feature[] = [
    {
        icon: <Infinity className="w-4 h-4" />,
        title: "Unlimited Projects",
        description: "Create as many projects as you need",
        highlight: true,
    },
    {
        icon: <Shield className="w-4 h-4" />,
        title: "Enterprise Security",
        description: "Advanced security protocols & encryption",
    },
    {
        icon: <Zap className="w-4 h-4" />,
        title: "Priority Access",
        description: "Early access to new features",
        highlight: true,
    },
];

export default function Pricing_01() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full max-w-sm mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "group relative overflow-hidden",
                    "bg-white dark:bg-zinc-900",
                    "border border-zinc-200 dark:border-zinc-800",
                    "rounded-2xl transition-all duration-300",
                    "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                    "dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                )}
            >
                {/* Ambient background effect */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-500/5 via-transparent to-transparent" />

                {/* Header */}
                <div className="relative p-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full" />
                            <div className="relative w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                                Enterprise Plan
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                For growing teams
                            </p>
                        </div>
                    </div>
                    <div className="px-3 py-1 text-xs font-medium bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-full">
                        Popular
                    </div>
                </div>

                {/* Pricing */}
                <div className="relative p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                            $49
                        </span>
                        <span className="text-sm text-zinc-500">/month</span>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                        Everything you need to scale your business
                    </p>
                </div>

                {/* Features */}
                <div className="relative p-6 space-y-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "flex items-start gap-3 p-3 rounded-xl transition-colors",
                                feature.highlight &&
                                    "bg-violet-50 dark:bg-violet-900/10"
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    feature.highlight
                                        ? "bg-violet-100 dark:bg-violet-900/20"
                                        : "bg-zinc-100 dark:bg-zinc-800"
                                )}
                            >
                                {feature.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {feature.title}
                                </h4>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="relative p-6 border-t border-zinc-200 dark:border-zinc-800">
                    <motion.button
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={cn(
                            "w-full h-11 flex items-center justify-center gap-2",
                            "bg-zinc-900 dark:bg-white",
                            "text-white dark:text-zinc-900",
                            "text-sm font-medium",
                            "rounded-lg transition-all duration-300",
                            "hover:bg-zinc-800 dark:hover:bg-zinc-100"
                        )}
                    >
                        Get started
                        <motion.div
                            animate={{ x: isHovered ? 4 : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
