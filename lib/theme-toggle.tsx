"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunMoon } from "lucide-react";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
            }}
        >
            {theme === "light" ? (
                <SunMoon className="h-5 w-5 text-black" />
            ) : (
                <SunMoon
                    className="h-5 w-5 rotate-180 text-white"
                    color="white"
                />
            )}
        </div>
    );
}
