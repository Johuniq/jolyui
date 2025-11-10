"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TextSplitProps {
    text: string;
    className?: string;
    containerClassName?: string;
    splitSpacing?: number;
}

const Text_02: React.FC<TextSplitProps> = ({
    text = "Payout fees",
    className = "",
    containerClassName = "",
    splitSpacing = 2,
}) => {
    return (
        <motion.div
            className={cn(
                "w-full text-center relative inline-block",
                containerClassName
            )}
            whileHover="hover"
            initial="default"
        >
            <motion.div
                className={cn("absolute w-full text-4xl -ml-0.5", className)}
                variants={{
                    default: {
                        clipPath: "inset(0 0 50% 0)",
                        y: -splitSpacing / 2,
                        opacity: 1,
                    },
                    hover: {
                        clipPath: "inset(0 0 0 0)",
                        y: 0,
                        opacity: 0,
                    },
                }}
                transition={{ duration: 0.1 }}
            >
                {text}
            </motion.div>
            <motion.div
                className={cn("absolute w-full text-4xl", className)}
                variants={{
                    default: {
                        clipPath: "inset(50% 0 0 0)",
                        y: splitSpacing / 2,
                        opacity: 1,
                    },
                    hover: {
                        clipPath: "inset(0 0 0 0)",
                        y: 0,
                        opacity: 1,
                    },
                }}
                transition={{ duration: 0.1 }}
            >
                {text}
            </motion.div>

            {/* Hidden text for maintaining layout size */}
            <div className={cn("invisible text-4xl", className)}>{text}</div>
        </motion.div>
    );
};

export default Text_02;
