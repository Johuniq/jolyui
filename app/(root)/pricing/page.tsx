"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    Code,
    Paintbrush,
    Monitor,
    Zap,
    CircuitBoard,
    LayoutGrid,
    Palette,
    Package,
    MessageSquare,
    Pencil,
    LockKeyhole,
    Copy,
    CheckCheck,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import V0 from "@/components/icons/v0";
import TailwindCSS from "@/components/icons/tailwindcss";
import Motion from "@/components/icons/motion";
import { useActionState, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
  
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { submitContactForm } from "@/lib/contact";

interface PricingTier {
    name: string;
    badge?: string;
    price: string | number | null;
    period: string;
    description: string;
    icon: React.ReactNode;
    features: {
        highlights: {
            text: string;
            description: string;
            end: string;
            icon: React.ReactNode;
        }[];
        serviceItems: string[];
    };
    cta: {
        text: string;
        href: string;
    };
    isHighlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "What you see here!",
        badge: "Free",
        price: null,
        period: "forever",
        description: "Perfect for exploring and personal projects",
        icon: <Package className="h-5 w-5 text-blue-500" />,
        features: {
            highlights: [
                {
                    text: "UI Components",
                    description: "50+ Ready to use and more coming soon!",
                    end: "",
                    icon: <LayoutGrid className="h-4 w-4 text-indigo-500" />,
                },
                {
                    text: "Built for Next.js & React",
                    description: "",
                    end: "",
                    icon: <Code className="h-4 w-4 text-green-500" />,
                },
                {
                    text: "Design with Tailwind CSS",
                    description: "The best one!",
                    end: "",
                    icon: <TailwindCSS className="h-4 w-4 text-purple-500" />,
                },
                {
                    text: "Animation with Motion",
                    description: "",
                    end: "",
                    icon: <Motion className="h-4 w-4 text-green-500" />,
                },
                {
                    text: "Copy & Paste Ready",
                    description: "",
                    end: "",
                    icon: <CheckCheck className="h-4 w-4 text-orange-500" />,
                },
                {
                    text: "v0 Customization",
                    description: "Open in V0 for custom changes",
                    end: "",
                    icon: <V0 className="h-4 w-4 text-yellow-500" />,
                },
                {
                    text: "Dark and Light Mode",
                    description: "",
                    end: "",
                    icon: <Palette className="h-4 w-4 text-purple-500" />,
                },
                {
                    text: "Open Source",
                    description: "MIT License",
                    end: "",
                    icon: <LockKeyhole className="h-4 w-4 text-blue-500" />,
                },
            ],
            serviceItems: [],
        },
        cta: {
            text: "Browse Components",
            href: "/docs/components/action-search-bar",
        },
    },
    {
        name: "Custom Components",
        price: "799",
        period: "component",
        description: "Custom components built for your brand",
        icon: <Paintbrush className="h-5 w-5 text-purple-500" />,
        features: {
            highlights: [
                {
                    text: "Custom Components",
                    description: "Design + Development",
                    end: "",
                    icon: <LayoutGrid className="h-4 w-4 text-indigo-500" />,
                },
                {
                    text: "Built for Next.js & React",
                    description: "",
                    end: "",
                    icon: <Code className="h-4 w-4 text-green-500" />,
                },
                {
                    text: "Design with Tailwind CSS",
                    description: "The best one!",
                    end: "",
                    icon: <TailwindCSS className="h-4 w-4 text-purple-500" />,
                },
                {
                    text: "Animation with Motion",
                    description: "",
                    end: "",
                    icon: <Motion className="h-4 w-4 text-green-500" />,
                },
                {
                    text: "Support",
                    description: "24/7 access",
                    end: "24h response time",
                    icon: <Zap className="h-4 w-4 text-orange-500" />,
                },
                {
                    text: "Free Modifications",
                    description: "Up to 2 rounds",
                    end: "",
                    icon: <Pencil className="h-4 w-4 text-blue-500" />,
                },
            ],
            serviceItems: [],
        },
        cta: {
            text: "Get Started",
            href: "#",
        },
        isHighlighted: true,
    },
    {
        name: "Custom Pages",
        price: "2,999",
        period: "page",
        description: "Great for startups, small businesses, and more",
        icon: <Rocket className="h-5 w-5 text-orange-500" />,
        features: {
            highlights: [
                {
                    text: "Custom Pages",
                    description: "Web App, SaaS, AI, E-commerce, etc.",
                    end: "",
                    icon: <Package className="h-4 w-4 text-orange-500" />,
                },
                {
                    text: "Full Page Development",
                    description: "End-to-end",
                    end: "",
                    icon: <Monitor className="h-4 w-4 text-purple-500" />,
                },
                {
                    text: "Performance Optimization",
                    description: "Speed & SEO",
                    end: "",
                    icon: <Zap className="h-4 w-4 text-green-500" />,
                },
                {
                    text: "System Integration",
                    description: "CMS, API, etc.",
                    end: "",
                    icon: <CircuitBoard className="h-4 w-4 text-blue-500" />,
                },
                {
                    text: "Private Chat & Call",
                    description: "",
                    end: "",
                    icon: <MessageSquare className="h-4 w-4 text-indigo-500" />,
                },
                {
                    text: "Priority Support",
                    description: "24/7 access",
                    end: "24h response time",
                    icon: <Zap className="h-4 w-4 text-orange-500" />,
                },
                {
                    text: "Free Modifications",
                    description: "Unlimited rounds",
                    end: "",
                    icon: <Pencil className="h-4 w-4 text-blue-500" />,
                },
            ],
            serviceItems: [],
        },
        cta: {
            text: "Get Started",
            href: "#",
        },
    },
];

export default function PricingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [state, formAction, isPending] = useActionState(submitContactForm, {
        success: false,
        error: "",
    });

    function handlePricingClick(href: string) {
        if (href === "#") {
            setIsModalOpen(true);
            return;
        }
        window.location.href = href;
    }

    function copyEmailToClipboard() {
        navigator.clipboard.writeText("hi@kokonutui.com");
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 1000);
    }

    return (
        <div className="min-h-screen px-4 py-24 relative bg-zinc-50 dark:bg-white">
            {/* Dark mode backgrounds */}
            <div className="absolute inset-0 hidden dark:block">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/50 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/20 to-black" />
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/[0.02] to-transparent blur-[150px]" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/[0.02] to-transparent blur-[150px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-black to-black" />
            </div>

            {/* Light mode backgrounds */}
            <div className="absolute inset-0 dark:hidden">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50/50 to-white" />

                {/* Premium mesh gradient - updated colors */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/50 via-violet-200/30 to-blue-100/40" />

                {/* Shimmering effects - more subtle colors */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-rose-200/30 to-transparent blur-[150px] animate-pulse" />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-200/30 to-transparent blur-[150px] animate-pulse" />

                {/* Top accent gradients - softer colors */}
                <div className="absolute top-0 h-[600px] w-full bg-gradient-to-b from-rose-100/20 via-violet-200/20 to-transparent" />

                {/* Additional depth layers - updated colors */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_var(--tw-gradient-stops))] from-violet-50/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_0%,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent" />
            </div>

            <div className="relative">
                <div className="mb-20 text-center relative max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        {/* Enhanced header gradient */}
                        <div className="absolute inset-x-0 -top-20 h-[600px] w-full bg-gradient-to-r from-pink-100/40 via-violet-200/40 to-blue-100/40 dark:from-white/5 dark:via-zinc-500/5 dark:to-white/5 blur-[120px]" />

                        {/* Enhanced heading with gradient text */}
                        <h1 className="relative mb-6">
                            <span className="block text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent sm:text-4xl lg:text-5xl">
                                Building an app? A SaaS? or just needs some
                                custom components?
                            </span>
                        </h1>
                    </motion.div>

                    {/* Enhanced description with two-tone design */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto max-w-2xl space-y-6"
                    >
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            We have got you covered. Choose custom components or a
                            complete page.
                        </p>
                        {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                            Join hundreds of developers building amazing projects
                            with CodeSnippet UI
                        </p> */}
                    </motion.div>
                </div>

                <Card className="mx-auto w-full max-w-6xl border-border/40 backdrop-blur-sm bg-gradient-to-b from-zinc-50/80 to-white/60 dark:from-zinc-900/95 dark:via-zinc-950/90 dark:to-zinc-900/95 shadow-xl relative overflow-hidden rounded-[2.5rem]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/[0.02] via-violet-500/[0.02] to-blue-500/[0.02] dark:from-pink-500/[0.01] dark:via-violet-500/[0.01] dark:to-blue-500/[0.01]" />
                    <div className="relative grid gap-6 p-6 md:grid-cols-3">
                        {pricingTiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative p-8 rounded-3xl border flex flex-col ${
                                    tier.isHighlighted
                                        ? "bg-gradient-to-b from-white via-blue-50/50 to-white border-blue-200 shadow-lg shadow-blue-100/50 dark:from-zinc-900 dark:via-blue-950/5 dark:to-zinc-900 dark:border-blue-950/40 dark:shadow-none"
                                        : "bg-gradient-to-b from-white via-zinc-50/50 to-white border-zinc-200/60 shadow-md shadow-zinc-200/50 dark:from-zinc-900 dark:via-zinc-950/50 dark:to-zinc-900 dark:border-zinc-800/60 dark:shadow-none"
                                }`}
                            >
                                <div className="flex-1 space-y-6">
                                    <motion.div
                                        className="space-y-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            {tier.icon}
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                {tier.name}
                                            </h2>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {tier.description}
                                        </p>
                                    </motion.div>

                                    <div className="flex items-baseline gap-1">
                                        {tier.price ? (
                                            <>
                                                <div className="flex flex-col items-start">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                                        starts at
                                                    </span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                            ${tier.price}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                                            /{tier.period}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                                Free
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        {tier.features.highlights.map(
                                            (feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index * 0.1 +
                                                            idx * 0.05,
                                                    }}
                                                    className="px-4 py-1.5 -mx-3 flex items-center justify-between transition-colors rounded-xl cursor-default group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex-shrink-0">
                                                            {feature.icon}
                                                        </span>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 0 transition-colors">
                                                                {feature.text}
                                                            </span>
                                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                                {
                                                                    feature.description
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-600 px-2 py-1 rounded-full bg-muted/50 dark:bg-muted/10 group-hover:bg-muted dark:group-hover:bg-muted/20 transition-colors">
                                                        {feature.end}
                                                    </span>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button
                                        className={`w-full transition-all group relative overflow-hidden rounded-2xl ${
                                            tier.price
                                                ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 dark:from-rose-500 dark:to-pink-500 shadow-lg hover:shadow-xl hover:shadow-rose-500/25 text-white"
                                                : "bg-gradient-to-r hover:from-zinc-100 hover:to-zinc-50 dark:hover:from-zinc-800 dark:hover:to-zinc-900 hover:shadow-lg !dark:text-white"
                                        }`}
                                        variant={
                                            tier.price ? "ghost" : "outline"
                                        }
                                        onClick={() =>
                                            handlePricingClick(tier.cta.href)
                                        }
                                    >
                                        {tier.cta.text}
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative max-w-xl mx-auto mt-16 text-center py-12"
                >
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                        Have questions? Contact us at{" "}
                        <a
                            href="mailto:hi@kokonutui.com"
                            className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
                        >
                            hi@kokonutui.com
                        </a>
                    </p>
                </motion.div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle className="sr-only">Contact Form</DialogTitle>

                    {!isPending && !state.success && !state.error && (
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Come say hi! 👋
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Explain your needs, timeline, and budget.
                            </DialogDescription>
                        </DialogHeader>
                    )}

                    <div className="flex flex-col space-y-8 py-6">
                        {state.error ? (
                            <motion.div
                                className="flex flex-col items-center justify-center py-6 space-y-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 blur-xl bg-red-500/10 dark:bg-red-500/20 rounded-full"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                    <XCircle
                                        size={80}
                                        className="relative z-10 text-red-500 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                                    />
                                </div>
                                <motion.div
                                    className="text-center space-y-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-lg font-medium text-red-600 dark:text-red-500">
                                        Something went wrong
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {state.error}
                                    </p>
                                </motion.div>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-4"
                                >
                                    Close
                                </Button>
                            </motion.div>
                        ) : state.success ? (
                            <motion.div
                                className="flex flex-col items-center justify-center py-6 space-y-4"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <div className="relative">
                                    <motion.div
                                        className="absolute inset-0 blur-xl bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.2,
                                            duration: 0.8,
                                            ease: "easeOut",
                                        }}
                                    />
                                    <Checkmark
                                        size={80}
                                        strokeWidth={4}
                                        color="rgb(16 185 129)"
                                        className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                                    />
                                </div>
                                <motion.div
                                    className="space-y-4 text-center"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-lg font-medium text-emerald-600 dark:text-emerald-500">
                                        Message Sent Successfully!
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-4"
                                    >
                                        Close
                                    </Button>
                                </motion.div>
                            </motion.div>
                        ) : isPending ? (
                            <motion.div
                                className="flex flex-col items-center justify-center py-12 space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <svg
                                    className="animate-spin h-8 w-8 text-muted-foreground"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <p className="text-sm text-muted-foreground">
                                    Sending your message...
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="flex items-center gap-3 w-full justify-center">
                                        <span className="text-sm font-medium">
                                            Email us directly:
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={cn(
                                                "relative flex items-center gap-2 group h-9",
                                                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                                "transition-colors duration-200"
                                            )}
                                            onClick={copyEmailToClipboard}
                                        >
                                            <span className="text-sm font-medium">
                                                hi@kokonutui.com
                                            </span>
                                            {hasCopied ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="h-3.5 w-3.5 text-green-500"
                                                >
                                                    <path d="M20 6 9 17l-5-5" />
                                                    <path d="m20 10-7.5 7.5L9 17" />
                                                </svg>
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                            <span
                                                className={cn(
                                                    "absolute -top-9 left-1/2 -translate-x-1/2",
                                                    "text-xs font-medium",
                                                    "bg-white dark:bg-zinc-900 border shadow-sm",
                                                    "px-2.5 py-1 rounded-md",
                                                    "transition-all duration-200",
                                                    hasCopied
                                                        ? "opacity-100 translate-y-0"
                                                        : "opacity-0 translate-y-1"
                                                )}
                                            >
                                                Copied!
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-4 text-muted-foreground font-medium">
                                            or fill the form
                                        </span>
                                    </div>
                                </div>

                                <form action={formAction} className="space-y-5">
                                    <div className="space-y-2.5">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium"
                                        >
                                            Your Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="name@company.com"
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <Label
                                            htmlFor="message"
                                            className="text-sm font-medium"
                                        >
                                            Project Details
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project requirements, timeline, and budget..."
                                            className="min-h-[120px] resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className={cn(
                                            "w-full h-10 text-sm font-medium",
                                            "bg-gradient-to-r from-rose-500 to-pink-500",
                                            "hover:from-rose-600 hover:to-pink-600",
                                            "transition-all duration-200",
                                            "disabled:opacity-50 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        {isPending ? (
                                            <motion.div
                                                className="flex items-center gap-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Sending...
                                            </motion.div>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Add the Checkmark component from currency-transfer.tsx
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: i * 0.2,
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                ease: "easeInOut",
            },
            opacity: { delay: i * 0.2, duration: 0.2 },
        },
    }),
};

interface CheckmarkProps {
    size?: number;
    strokeWidth?: number;
    color?: string;
    className?: string;
}

function Checkmark({
    size = 100,
    strokeWidth = 2,
    color = "currentColor",
    className = "",
}: CheckmarkProps) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            className={className}
        >
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                variants={draw}
                custom={0}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.path
                d="M30 50L45 65L70 35"
                stroke={color}
                variants={draw}
                custom={1}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "transparent",
                }}
            />
        </motion.svg>
    );
}
