"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/config/navigation";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

interface ComponentNavProps {
    sections: NavSection[];
}

export default function ComponentNav({ sections }: ComponentNavProps) {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);

    const totalItems = sections.reduce(
        (acc, section) => acc + section.items.length,
        0
    );

    const currentPage = sections
        .flatMap((section) => section.items)
        .find((item) => {
            if (item.href === "/docs") {
                return (
                    pathname === "/docs" || pathname === "/docs/introduction"
                );
            }
            if (item.href === "/docs/components/block/") {
                return pathname.startsWith("/docs/components/block");
            }
            if (item.href.includes("/docs/components/")) {
                return pathname === item.href;
            }
            if(item.href.includes("/docs/hooks")){
                return pathname === item.href
            }
            return pathname === item.href;
        });

    const handleExpandToggle = () => setIsExpanded(!isExpanded);
    const handleItemClick = () => setIsExpanded(false);

    return (
        <>
            <DesktopNav sections={sections} pathname={pathname} />
            <MobileNav
                sections={sections}
                pathname={pathname}
                isExpanded={isExpanded}
                currentPage={currentPage}
                totalItems={totalItems}
                onExpandToggle={handleExpandToggle}
                onItemClick={handleItemClick}
            />
        </>
    );
}
