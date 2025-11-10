"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
    name: string;
    highlight?: boolean;
    included: boolean;
}

interface PricingTier {
    name: string;
    price: number;
    description: string;
    features: Feature[];
    highlight?: boolean;
    cta?: string;
}

const defaultTiers: PricingTier[] = [
    {
        name: "SELF",
        price: 299,
        description: "For small teams and growing businesses",
        features: [
            { name: "Up to 20 team members", included: true },
            { name: "Advanced analytics", included: true },
            { name: "24/7 email support", included: true },
            { name: "API access", included: true, highlight: true },
            { name: "Custom integrations", included: false },
            { name: "Enterprise features", included: false },
        ],
        cta: "Get started",
    },
    {
        name: "TEAM",
        price: 999,
        description: "For large organizations and enterprises",
        highlight: true,
        features: [
            { name: "Unlimited team members", included: true },
            { name: "Advanced analytics", included: true },
            { name: "24/7 priority support", included: true },
            { name: "Unlimited API access", included: true, highlight: true },
            { name: "Custom integrations", included: true },
            { name: "Enterprise features", included: true },
        ],
        cta: "Get started",
    },
];

export default function Pricing_02({
    tiers = defaultTiers,
}: {
    tiers?: PricingTier[];
}) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tiers.map((tier) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "rounded-2xl transition-all duration-500",
                            tier.highlight
                                ? "bg-linear-to-b from-neutral-950 to-neutral-900 dark:from-neutral-900 dark:to-neutral-950"
                                : "bg-white dark:bg-neutral-900",
                            "border border-neutral-200 dark:border-neutral-800",
                            "hover:border-neutral-300 dark:hover:border-neutral-700",
                            "hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)]"
                        )}
                    >
                        <div className="p-10 flex flex-col h-full">
                            <div className="space-y-4">
                                <h3 className={cn(
                                    "text-lg uppercase tracking-wider font-medium",
                                    tier.highlight
                                        ? "text-white"
                                        : "text-neutral-900 dark:text-white"
                                )}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-baseline gap-2">
                                    <span className={cn(
                                        "text-5xl font-light",
                                        tier.highlight
                                            ? "text-white"
                                            : "text-neutral-900 dark:text-white"
                                    )}>
                                        ${tier.price}
                                    </span>
                                    <span className={cn(
                                        "text-sm",
                                        tier.highlight
                                            ? "text-neutral-400"
                                            : "text-neutral-500 dark:text-neutral-400"
                                    )}>
                                        one-time
                                    </span>
                                </div>
                                <p className={cn(
                                    "text-sm pb-6 border-b",
                                    tier.highlight
                                        ? "text-neutral-400 border-neutral-800"
                                        : "text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800"
                                )}>
                                    {tier.description}
                                </p>
                            </div>

                            <div className="mt-8 space-y-4 grow">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature.name}
                                        className="flex items-center gap-3"
                                    >
                                        <div className={cn(
                                            "shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                                            feature.included
                                                ? tier.highlight
                                                    ? "text-white"
                                                    : "text-neutral-900 dark:text-white"
                                                : "text-neutral-300 dark:text-neutral-700"
                                        )}>
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className={cn(
                                            "text-sm",
                                            tier.highlight
                                                ? "text-neutral-300"
                                                : "text-neutral-600 dark:text-neutral-300"
                                        )}>
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <Button
                                    className={cn(
                                        "w-full h-12 group relative",
                                        tier.highlight
                                            ? "bg-white hover:bg-neutral-100 text-neutral-900"
                                            : "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900",
                                        "transition-all duration-300"
                                    )}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                                        {tier.cta}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
