"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItemProps {
    question: string;
    answer: string;
    category: string;
}

function CategoryButton({
    name,
    isActive,
    onClick,
}: {
    name: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-4 py-2 text-left rounded-lg transition-all w-full relative",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-white dark:hover:bg-black/20",
                isActive && [
                    "bg-zinc-100 dark:bg-black/20",
                    "text-primary font-medium",
                    "hover:bg-zinc-100 dark:hover:bg-black/20",
                    "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                    "before:w-1 before:h-6 before:bg-primary before:rounded-r-full"
                ]
            )}
        >
            {name}
        </button>
    );
}

function Faq04() {
    const [activeCategory, setActiveCategory] = useState<string>("General");

    const faqs: FAQItemProps[] = [
        {
            category: "General",
            question: "How do I get started?",
            answer: "Getting started is easy! Simply sign up for an account and follow our quick setup guide. We'll walk you through each step of the process.",
        },
        {
            category: "General",
            question: "What makes your service different?",
            answer: "Our platform combines ease of use with powerful features, backed by 24/7 support and regular updates based on user feedback.",
        },
        {
            category: "Billing",
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
        },
        {
            category: "Billing",
            question: "Can I change my plan later?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
        },
        {
            category: "Features",
            question: "Is there a free trial available?",
            answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
        },
        {
            category: "Support",
            question: "How can I contact support?",
            answer: "Our support team is available 24/7 through our help center, email support, or live chat. We typically respond within 2 hours.",
        },
    ];

    const categories = Array.from(new Set(faqs.map((faq) => faq.category)));
    const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

    return (
        <section className="py-8 w-full rounded-xl">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        How can we help?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Find answers to frequently asked questions
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
                    <div className="bg-white dark:bg-black/5 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 h-fit">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-4">
                            Categories
                        </h3>
                        <div className="space-y-1">
                            {categories.map((category) => (
                                <CategoryButton
                                    key={category}
                                    name={category}
                                    isActive={category === activeCategory}
                                    onClick={() => setActiveCategory(category)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-black/5 p-6 rounded-xl border border-gray-100 dark:border-gray-800/60">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {filteredFaqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`${index}`}
                                    className="border border-gray-100 dark:border-gray-800/60 rounded-lg px-4"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <span className="text-left font-medium text-gray-900 dark:text-gray-200 hover:text-primary">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faq04;
