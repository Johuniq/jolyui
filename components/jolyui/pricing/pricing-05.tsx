"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
    name: string;
    price: number;
    description: string;
    features: string[];
    highlight?: boolean;
}

const defaultTiers: PricingTier[] = [
    {
        name: "Basic",
        price: 9,
        description: "Essential features for small teams",
        features: [
            "5 Team Members",
            "Basic Analytics",
            "Community Support",
            "1GB Storage",
        ],
    },
    {
        name: "Pro",
        price: 29,
        description: "Everything you need to scale",
        highlight: true,
        features: [
            "Unlimited Members",
            "Advanced Analytics",
            "Priority Support",
            "Unlimited Storage",
            "Custom Integrations",
        ],
    },
];

export default function Pricing_05() {
    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {defaultTiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative",
                            "bg-white dark:bg-black",
                            "border border-zinc-200 dark:border-zinc-800",
                            "rounded-lg overflow-hidden",
                            tier.highlight && [
                                "before:absolute before:inset-0",
                                "before:border before:border-black dark:before:border-white",
                                "before:rounded-lg before:pointer-events-none",
                                "before:-m-[1px]"
                            ]
                        )}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-sm font-medium tracking-wide uppercase">
                                    {tier.name}
                                </h3>
                                {tier.highlight && (
                                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black">
                                        Popular
                                    </span>
                                )}
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-semibold">${tier.price}</span>
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">/month</span>
                            </div>
                            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                                {tier.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="p-6">
                            <div className="space-y-3">
                                {tier.features.map((feature) => (
                                    <div 
                                        key={feature}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <Check className="w-4 h-4 mt-0.5 text-zinc-900 dark:text-white" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="mt-6">
                                <Button 
                                    className={cn(
                                        "w-full h-9",
                                        "text-xs font-medium tracking-wide",
                                        tier.highlight
                                            ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                                            : "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 dark:bg-black dark:text-white dark:border-zinc-800 dark:hover:bg-zinc-900"
                                    )}
                                >
                                    Get started
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 