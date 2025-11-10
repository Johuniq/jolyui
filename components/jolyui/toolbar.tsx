"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
    Filter,
    Settings,
    Download,
    Share2,
    type LucideIcon,
    User,
    Bell,
    Sun,
    Edit2,
    Lock,
} from "lucide-react";

interface ToolbarItem {
    id: string;
    title: string;
    icon: LucideIcon;
    type?: never;
}

interface ToolbarProps {
    className?: string;
    activeColor?: string;
    onSearch?: (value: string) => void;
}

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
        gap: isSelected ? ".5rem" : 0,
        paddingLeft: isSelected ? "1rem" : ".5rem",
        paddingRight: isSelected ? "1rem" : ".5rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: -10 },
    exit: { opacity: 0, y: -20 },
};

const lineVariants = {
    initial: { scaleX: 0, x: "-50%" },
    animate: {
        scaleX: 1,
        x: "0%",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
        scaleX: 0,
        x: "50%",
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

const transition = { type: "spring", bounce: 0, duration: 0.4 };

export function Toolbar({
    className,
    activeColor = "text-primary",
    onSearch,
}: ToolbarProps) {
    const [selected, setSelected] = React.useState<string | null>("filter");
    const [isToggled, setIsToggled] = React.useState(false);
    const [activeNotification, setActiveNotification] = React.useState<
        string | null
    >(null);
    const outsideClickRef = React.useRef(null);

    const toolbarItems: ToolbarItem[] = [
        { id: "filter", title: "Filter", icon: Filter },
        { id: "settings", title: "Settings", icon: Settings },
        { id: "download", title: "Download", icon: Download },
        { id: "share", title: "Share", icon: Share2 },
        { id: "notifications", title: "Notifications", icon: Bell },
        { id: "profile", title: "Profile", icon: User },
        { id: "theme", title: "Theme", icon: Sun },
    ];

    const handleItemClick = (itemId: string) => {
        setSelected(selected === itemId ? null : itemId);
        setActiveNotification(itemId);
        setTimeout(() => setActiveNotification(null), 1500);
    };

    return (
        <div className="space-y-2">
            <div
                ref={outsideClickRef}
                className={cn(
                    "flex items-center gap-3 p-2 relative",
                    "bg-background",
                    "border rounded-xl",
                    "transition-all duration-200",
                    className
                )}
            >
                <AnimatePresence>
                    {activeNotification && (
                        <motion.div
                            variants={notificationVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50"
                        >
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                                {
                                    toolbarItems.find(
                                        (item) => item.id === activeNotification
                                    )?.title
                                }{" "}
                                clicked!
                            </div>
                            <motion.div
                                variants={lineVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute -bottom-1 left-1/2 w-full h-[2px] bg-primary origin-left"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-2">
                    {toolbarItems.map((item) => (
                        <motion.button
                            key={item.id}
                            variants={buttonVariants}
                            initial={false}
                            animate="animate"
                            custom={selected === item.id}
                            onClick={() => handleItemClick(item.id)}
                            transition={transition}
                            className={cn(
                                "relative flex items-center rounded-none px-3 py-2",
                                "text-sm font-medium transition-colors duration-300",
                                selected === item.id
                                    ? "bg-[#1F9CFE] text-white rounded-lg"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <item.icon
                                size={16}
                                className={cn(
                                    selected === item.id && "text-white"
                                )}
                            />
                            <AnimatePresence initial={false}>
                                {selected === item.id && (
                                    <motion.span
                                        variants={spanVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={transition}
                                        className="overflow-hidden"
                                    >
                                        {item.title}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsToggled(!isToggled)}
                        className="flex items-center gap-2 px-4 py-2
                            bg-primary text-primary-foreground
                            rounded-xl 
                            border border-primary/30
                            shadow-sm 
                            transition-all duration-200
                            hover:shadow-md 
                            hover:bg-primary/90
                            hover:border-primary/40
                            active:border-primary/50"
                    >
                        {isToggled ? (
                            <Edit2 className="w-3.5 h-3.5" />
                        ) : (
                            <Lock className="w-3.5 h-3.5" />
                        )}
                        <span className="text-sm font-medium">
                            {isToggled ? "On" : "Off"}
                        </span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default Toolbar;
