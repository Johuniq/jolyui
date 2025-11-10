import { Search, ShoppingBag } from "lucide-react";

import { Menu } from "lucide-react";

interface HeaderProps {
    cartCount: number;
    onCartOpen: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function Header({
    cartCount,
    onCartOpen,
    searchQuery,
    onSearchChange,
}: HeaderProps) {
    return (
        <header className="fixed w-full top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
                        >
                            <Menu className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium">Store</span>
                    </div>

                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search products..."
                                className="w-full h-9 pl-9 pr-4 text-sm bg-zinc-100 dark:bg-zinc-900 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onCartOpen}
                        className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-medium flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
