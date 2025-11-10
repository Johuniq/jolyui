"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, ChartNoAxesColumn } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
    name: string;
    description: string;
    included: boolean;
}

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: {
        monthly: number;
        yearly: number;
    };
    description: string;
    features: Feature[];
}

const tiers: PricingTier[] = [
    {
        name: "Pro",
        icon: <ChartNoAxesColumn className="w-5 h-5" />,
        price: {
            monthly: 49,
            yearly: 470,
        },
        description: "Perfect for growing teams and businesses",
        features: [
            {
                name: "Team Management",
                description: "Add up to 20 team members",
                included: true,
            },
            {
                name: "Advanced Analytics",
                description: "Get detailed insights and reports",
                included: true,
            },
            {
                name: "Priority Support",
                description: "24/7 email and chat support",
                included: true,
            },
            {
                name: "API Access",
                description: "Full access to our REST API",
                included: true,
            },
        ],
    },
    {
        name: "Enterprise",
        icon: <Sparkles className="w-5 h-5" />,
        price: {
            monthly: 99,
            yearly: 990,
        },
        description: "For organizations that need more",
        features: [
            {
                name: "Unlimited Teams",
                description: "No limit on team members",
                included: true,
            },
            {
                name: "Custom Analytics",
                description: "Tailored reports and insights",
                included: true,
            },
            {
                name: "Dedicated Support",
                description: "Personal account manager",
                included: true,
            },
            {
                name: "Advanced Security",
                description: "Enhanced security features",
                included: true,
            },
            {
                name: "Custom Integrations",
                description: "Build custom workflows",
                included: true,
            },
            {
                name: "SLA Guarantee",
                description: "99.9% uptime guarantee",
                included: true,
            },
        ],
    },
];

export default function Pricing_04() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-zinc-100/50 dark:bg-zinc-800/50 rounded-full p-1">
                    {["Monthly", "Yearly"].map((period) => (
                        <button
                            key={period}
                            onClick={() => setIsYearly(period === "Yearly")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                (period === "Yearly") === isYearly
                                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs"
                                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            )}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative rounded-2xl overflow-hidden",
                            "bg-white dark:bg-zinc-900",
                            "border border-zinc-200 dark:border-zinc-800",
                            "transition-all duration-300",
                            "hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                    >
                        {/* Header */}
                        <div className="p-8 pb-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                        {tier.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        {tier.name}
                                    </h3>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">
                                        ${isYearly ? tier.price.yearly : tier.price.monthly}
                                    </span>
                                    <span className="text-zinc-500 text-sm">
                                        /{isYearly ? "year" : "month"}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 mt-2">
                                    {tier.description}
                                </p>
                            </div>

                            <Button
                                className={cn(
                                    "w-full",
                                    index === 1
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                )}
                            >
                                Get started
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="p-8 mt-8">
                            <div className="space-y-4">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="shrink-0 mt-1">
                                            <Check className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {feature.name}
                                            </p>
                                            <p className="text-sm text-zinc-500">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
