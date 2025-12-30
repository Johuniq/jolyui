"use client";

import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Clock,
  CornerDownLeft,
  Loader2,
  Search,
  X
} from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { LucideIcon } from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
  shortcut?: string[];
  keywords?: string[];
  onSelect?: () => void;
  children?: CommandGroup[]; // Support for sub-menus
  disabled?: boolean;
}

export interface CommandGroup {
  id: string;
  heading: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  groups: CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  shortcut?: string[];
  loading?: boolean;
  showRecent?: boolean;
  maxRecent?: number;
}

interface FlattenedItem {
  type: "group" | "item";
  groupId: string;
  groupHeading?: string;
  item?: CommandItem;
  score?: number;
  matches?: [number, number][];
}

interface PageState {
  id: string;
  title: string;
  groups: CommandGroup[];
}

export function CommandPalette({
  open: controlledOpen,
  onOpenChange,
  groups: initialGroups,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  shortcut = ["⌘", "K"],
  loading = false,
  showRecent = true,
  maxRecent = 5,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pages, setPages] = useState<PageState[]>([
    { id: "root", title: "Root", groups: initialGroups }
  ]);
  const [recentItems, setRecentItems] = useState<CommandItem[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const isOpen = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const currentPage = pages[pages.length - 1] || pages[0];

  // Load recent items from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("jolyui-command-recent");
      if (saved) {
        try {
          setRecentItems(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load recent items", e);
        }
      }
    }
  }, []);

  const saveRecent = useCallback((item: CommandItem) => {
    setRecentItems(prev => {
      const filtered = prev.filter(i => i.id !== item.id);
      const updated = [item, ...filtered].slice(0, maxRecent);
      localStorage.setItem("jolyui-command-recent", JSON.stringify(updated));
      return updated;
    });
  }, [maxRecent]);

  // Flatten and filter items based on search query
  const flattenedItems = useMemo(() => {
    const items: FlattenedItem[] = [];
    const currentGroups = currentPage?.groups || [];

    // Add Recent group if on root page and query is empty
    if (pages.length === 1 && query === "" && showRecent && recentItems.length > 0) {
      items.push({ type: "group", groupId: "recent", groupHeading: "Recent" });
      recentItems.forEach(item => {
        items.push({ type: "item", groupId: "recent", item });
      });
    }

    currentGroups.forEach((group) => {
      const matchedItems: FlattenedItem[] = [];

      group.items.forEach((item) => {
        if (item.disabled) return;

        const searchText = [item.label, ...(item.keywords || [])].join(" ");
        const match = fuzzySearch(query || "", searchText);

        if (match) {
          const labelMatch = fuzzySearch(query || "", item.label);
          matchedItems.push({
            type: "item",
            groupId: group.id,
            item,
            score: match.score,
            matches: labelMatch?.matches || [],
          });
        }
      });

      matchedItems.sort((a, b) => (b.score || 0) - (a.score || 0));

      if (matchedItems.length > 0) {
        items.push({
          type: "group",
          groupId: group.id,
          groupHeading: group.heading,
        });
        items.push(...matchedItems);
      }
    });

    return items;
  }, [currentPage?.groups, query, pages.length, showRecent, recentItems]);

  const selectableItems = useMemo(
    () => flattenedItems.filter((item) => item.type === "item"),
    [flattenedItems]
  );

  // Reset selection when query or page changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, pages.length]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setPages([{ id: "root", title: "Root", groups: initialGroups }]);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen, initialGroups]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedItem = itemRefs.current.get(selectedIndex);
    if (selectedItem && listRef.current) {
      selectedItem.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.children) {
      setPages(prev => [...prev, { 
        id: item.id, 
        title: item.label, 
        groups: item.children! 
      }]);
      setQuery("");
      return;
    }

    if (item.onSelect) {
      item.onSelect();
      saveRecent(item);
      setOpen(false);
    }
  }, [saveRecent, setOpen]);

  const handleBack = useCallback(() => {
    if (pages.length > 1) {
      setPages(prev => prev.slice(0, -1));
      setQuery("");
    }
  }, [pages.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) =>
            i < selectableItems.length - 1 ? i + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) =>
            i > 0 ? i - 1 : selectableItems.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          const selected = selectableItems[selectedIndex]?.item;
          if (selected) {
            handleSelect(selected);
          }
          break;
        case "Backspace":
          if (query === "" && pages.length > 1) {
            e.preventDefault();
            handleBack();
          }
          break;
        case "Escape":
          e.preventDefault();
          if (pages.length > 1) {
            handleBack();
          } else {
            setOpen(false);
          }
          break;
      }
    },
    [selectableItems, selectedIndex, setOpen, handleSelect, handleBack, query, pages.length]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-card border border-border shadow-2xl rounded-xl overflow-hidden flex flex-col"
            >
              {/* Header / Search */}
              <div className="flex items-center gap-3 px-4 border-b border-border relative">
                {pages.length > 1 ? (
                  <button 
                    onClick={handleBack}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground rotate-90" />
                  </button>
                ) : (
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
                
                <div className="flex-1 flex items-center min-w-0">
                  {pages.length > 1 && (
                    <div className="flex items-center gap-1 mr-2 shrink-0">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {currentPage?.title || ""}
                      </span>
                      <span className="text-muted-foreground">/</span>
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={pages.length > 1 ? `Search in ${currentPage?.title || ""}...` : placeholder}
                    className="flex-1 h-12 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                  />
                </div>

                {loading && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                
                <div className="flex items-center gap-1 ml-2">
                  {shortcut.map((key, i) => (
                    <kbd key={i} className="hidden sm:flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-mono text-muted-foreground bg-muted rounded">
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[380px] overflow-y-auto py-2 scroll-smooth"
              >
                <LayoutGroup id="command-list">
                  {flattenedItems.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center space-y-2"
                    >
                      <Search className="h-8 w-8 text-muted-foreground mx-auto opacity-20" />
                      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                    </motion.div>
                  ) : (
                    flattenedItems.map((flatItem) => {
                      if (flatItem.type === "group") {
                        return (
                          <div
                            key={`group-${flatItem.groupId}`}
                            className="px-3 py-2 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest mt-2 first:mt-0"
                          >
                            {flatItem.groupHeading}
                          </div>
                        );
                      }

                      const currentItemIndex = selectableItems.findIndex(si => si.item?.id === flatItem.item?.id);
                      const isSelected = currentItemIndex === selectedIndex;
                      const item = flatItem.item!;
                      const Icon = item.icon;
                      const highlightedLabel = highlightMatches(
                        item.label,
                        flatItem.matches || []
                      );

                      return (
                        <motion.div
                          layout
                          key={item.id}
                          ref={(el: HTMLDivElement | null) => {
                            if (el) itemRefs.current.set(currentItemIndex, el);
                          }}
                          className={cn(
                            "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 relative group",
                            isSelected && "bg-accent text-accent-foreground shadow-sm"
                          )}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(currentItemIndex)}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="active-pill"
                              className="absolute inset-0 bg-accent rounded-lg -z-10"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                            />
                          )}

                          <div className={cn(
                            "flex items-center justify-center h-8 w-8 rounded-md border transition-colors",
                            isSelected ? "bg-background border-primary/20" : "bg-muted/50 border-transparent"
                          )}>
                            {flatItem.groupId === "recent" ? (
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            ) : Icon ? (
                              <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                            ) : (
                              <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {highlightedLabel.map((part, i) => (
                                <span
                                  key={i}
                                  className={part.highlighted ? "text-primary font-semibold" : undefined}
                                >
                                  {part.text}
                                </span>
                              ))}
                            </div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {item.children && (
                              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50" />
                            )}
                            {item.shortcut && !item.children && (
                              <div className="flex items-center gap-1">
                                {item.shortcut.map((key, i) => (
                                  <kbd
                                    key={i}
                                    className="min-w-[18px] h-4 flex items-center justify-center px-1 text-[9px] font-mono text-muted-foreground bg-muted rounded border border-border/50"
                                  >
                                    {key}
                                  </kbd>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </LayoutGroup>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border text-[10px] text-muted-foreground bg-muted/20">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1 py-0.5 bg-muted rounded border border-border/50 font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1 py-0.5 bg-muted rounded border border-border/50 font-mono">
                      <CornerDownLeft className="h-2 w-2" />
                    </kbd>
                    select
                  </span>
                  {pages.length > 1 && (
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1 py-0.5 bg-muted rounded border border-border/50 font-mono">esc</kbd>
                      back
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-50">JolyUI Command</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export interface FuzzyMatch {
  item: string;
  score: number;
  matches: [number, number][];
}

export function fuzzySearch(query: string, text: string): FuzzyMatch | null {
  if (!query) return { item: text, score: 1, matches: [] };

  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  let queryIndex = 0;
  let score = 0;
  const matches: [number, number][] = [];
  let currentMatchStart = -1;
  let consecutiveMatches = 0;

  for (let i = 0; i < text.length && queryIndex < query.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      if (currentMatchStart === -1) currentMatchStart = i;
      consecutiveMatches++;
      queryIndex++;
      score += 1 + consecutiveMatches * 0.5;
      if (i === 0) score += 2;
      const prevChar = i > 0 ? text[i - 1] : "";
      if (prevChar && /[\s\-_]/.test(prevChar)) score += 1.5;
    } else {
      if (currentMatchStart !== -1) {
        matches.push([currentMatchStart, i]);
        currentMatchStart = -1;
        consecutiveMatches = 0;
      }
    }
  }

  if (currentMatchStart !== -1) matches.push([currentMatchStart, text.length]);
  if (queryIndex < query.length) return null;

  return { item: text, score: score / query.length, matches };
}

export function highlightMatches(
  text: string,
  matches: [number, number][]
): { text: string; highlighted: boolean }[] {
  if (matches.length === 0) return [{ text, highlighted: false }];

  const result: { text: string; highlighted: boolean }[] = [];
  let lastIndex = 0;

  for (const [start, end] of matches) {
    if (start > lastIndex) {
      result.push({ text: text.slice(lastIndex, start), highlighted: false });
    }
    result.push({ text: text.slice(start, end), highlighted: true });
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), highlighted: false });
  }

  return result;
}
