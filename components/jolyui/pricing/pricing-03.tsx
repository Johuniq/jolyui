"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
    name: string;
    included: "starter" | "pro" | "all" | null;
}

const features: Feature[] = [
    { name: "Basic Analytics", included: "starter" },
    { name: "Up to 5 team members", included: "starter" },
    { name: "Basic support", included: "starter" },
    { name: "Advanced Analytics", included: "pro" },
    { name: "Up to 20 team members", included: "pro" },
    { name: "Priority support", included: "pro" },
    { name: "Custom integrations", included: "all" },
    { name: "Unlimited team members", included: "all" },
    { name: "24/7 phone support", included: "all" },
];

const plans = [
    {
        name: "Starter",
        price: { monthly: 15, yearly: 144 },
        level: "starter" as const,
    },
    {
        name: "Pro",
        price: { monthly: 49, yearly: 470 },
        level: "pro" as const,
    },
    {
        name: "Enterprise",
        price: { monthly: 99, yearly: 990 },
        level: "all" as const,
    },
];

export default function Pricing_03() {
    const [isYearly, setIsYearly] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string>("pro");

    return (
        <div className="w-full max-w-3xl mx-auto px-4">
            <div className="flex justify-end mb-4 sm:mb-8">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm">
                    <button
                        type="button"
                        onClick={() => setIsYearly(false)}
                        className={cn(
                            "px-3 py-1 rounded-md transition-colors",
                            !isYearly
                                ? "bg-zinc-100 dark:bg-zinc-800"
                                : "text-zinc-500"
                        )}
                    >
                        Monthly
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsYearly(true)}
                        className={cn(
                            "px-3 py-1 rounded-md transition-colors",
                            isYearly
                                ? "bg-zinc-100 dark:bg-zinc-800"
                                : "text-zinc-500"
                        )}
                    >
                        Yearly
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {plans.map((plan) => (
                    <button
                        key={plan.name}
                        type="button"
                        onClick={() => setSelectedPlan(plan.level)}
                        className={cn(
                            "flex-1 p-4 rounded-xl text-left transition-all",
                            "border border-zinc-200 dark:border-zinc-800",
                            selectedPlan === plan.level &&
                                "ring-2 ring-blue-500 dark:ring-blue-400"
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                                {plan.name}
                            </span>
                            {plan.level === "pro" && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>
                        <div className="text-2xl font-bold">
                            ${isYearly ? plan.price.yearly : plan.price.monthly}
                            <span className="text-sm font-normal text-zinc-500">
                                /{isYearly ? "year" : "month"}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-[640px] divide-y divide-zinc-200 dark:divide-zinc-800">
                        <div className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-900">
                            <div className="flex-1 text-sm font-medium">Features</div>
                            <div className="flex items-center gap-8 text-sm">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.level}
                                        className="w-16 text-center font-medium"
                                    >
                                        {plan.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className={cn(
                                    "flex items-center p-4 transition-colors",
                                    feature.included === selectedPlan &&
                                        "bg-blue-50/50 dark:bg-blue-900/20"
                                )}
                            >
                                <div className="flex-1 text-sm">{feature.name}</div>
                                <div className="flex items-center gap-8 text-sm">
                                    {plans.map((plan) => (
                                        <div
                                            key={plan.level}
                                            className={cn(
                                                "w-16 flex justify-center",
                                                plan.level === selectedPlan &&
                                                    "font-medium"
                                            )}
                                        >
                                            {shouldShowCheck(
                                                feature.included,
                                                plan.level
                                            ) ? (
                                                <Check className="w-5 h-5 text-blue-500" />
                                            ) : (
                                                <span className="text-zinc-300 dark:text-zinc-700">
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center">
                <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-xl">
                    Get started with{" "}
                    {plans.find((p) => p.level === selectedPlan)?.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

function shouldShowCheck(
    included: Feature["included"],
    level: string
): boolean {
    if (included === "all") return true;
    if (included === "pro" && (level === "pro" || level === "all")) return true;
    if (
        included === "starter" &&
        (level === "starter" || level === "pro" || level === "all")
    )
        return true;
    return false;
}
