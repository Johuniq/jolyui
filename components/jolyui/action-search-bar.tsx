"use client"

import type React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Search,
  Send,
  BarChart2,
  Video,
  PlaneTakeoff,
  AudioLines,
  LayoutGrid,
  Command,
  Settings,
  FileText,
  Calendar,
  Mail,
  MessageSquare,
  Globe,
  Zap,
  Sparkles,
  Palette,
  Bookmark,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Action {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  shortcut?: string
  category?: string
  tags?: string[]
  color?: string
  isNew?: boolean
  isPinned?: boolean
  execute?: () => void
}

interface ActionCategory {
  name: string
  actions: Action[]
}

interface SearchResult {
  categories: ActionCategory[]
  recentActions: Action[]
  suggestedActions: Action[]
}

// Sample action data with more variety and categories
const allActions: Action[] = [
  {
    id: "1",
    label: "Book tickets",
    icon: <PlaneTakeoff className="h-4 w-4" style={{ color: "#3b82f6" }} />,
    description: "Find and book travel tickets",
    shortcut: "⌘B",
    category: "Travel",
    tags: ["booking", "travel", "tickets"],
    color: "#3b82f6",
  },
  {
    id: "2",
    label: "Summarize document",
    icon: <BarChart2 className="h-4 w-4" style={{ color: "#f97316" }} />,
    description: "AI-powered document summary",
    shortcut: "⌘S",
    category: "AI Tools",
    tags: ["ai", "summary", "document"],
    color: "#f97316",
    isNew: true,
  },
  {
    id: "3",
    label: "Screen Studio",
    icon: <Video className="h-4 w-4" style={{ color: "#8b5cf6" }} />,
    description: "Record and edit screen captures",
    shortcut: "⌘R",
    category: "Media",
    tags: ["video", "recording", "screen"],
    color: "#8b5cf6",
  },
  {
    id: "4",
    label: "Talk to Assistant",
    icon: <AudioLines className="h-4 w-4" style={{ color: "#10b981" }} />,
    description: "Voice-enabled AI assistant",
    shortcut: "⌘T",
    category: "AI Tools",
    tags: ["voice", "ai", "assistant"],
    color: "#10b981",
    isPinned: true,
  },
  {
    id: "5",
    label: "Component Library",
    icon: <LayoutGrid className="h-4 w-4" style={{ color: "#0ea5e9" }} />,
    description: "Browse UI component collection",
    shortcut: "⌘L",
    category: "Design",
    tags: ["ui", "components", "design"],
    color: "#0ea5e9",
  },
  {
    id: "6",
    label: "System Settings",
    icon: <Settings className="h-4 w-4" style={{ color: "#6b7280" }} />,
    description: "Configure system preferences",
    shortcut: "⌘,",
    category: "System",
    tags: ["settings", "preferences", "config"],
    color: "#6b7280",
  },
  {
    id: "7",
    label: "Create Document",
    icon: <FileText className="h-4 w-4" style={{ color: "#ec4899" }} />,
    description: "Create a new document",
    shortcut: "⌘N",
    category: "Productivity",
    tags: ["document", "create", "new"],
    color: "#ec4899",
  },
  {
    id: "8",
    label: "Schedule Meeting",
    icon: <Calendar className="h-4 w-4" style={{ color: "#14b8a6" }} />,
    description: "Add event to calendar",
    shortcut: "⌘M",
    category: "Productivity",
    tags: ["calendar", "meeting", "schedule"],
    color: "#14b8a6",
    isNew: true,
  },
  {
    id: "9",
    label: "Compose Email",
    icon: <Mail className="h-4 w-4" style={{ color: "#6366f1" }} />,
    description: "Write a new email",
    shortcut: "⌘E",
    category: "Communication",
    tags: ["email", "compose", "write"],
    color: "#6366f1",
  },
  {
    id: "10",
    label: "Start Chat",
    icon: <MessageSquare className="h-4 w-4" style={{ color: "#f43f5e" }} />,
    description: "Begin a new conversation",
    shortcut: "⌘C",
    category: "Communication",
    tags: ["chat", "message", "conversation"],
    color: "#f43f5e",
  },
  {
    id: "11",
    label: "Browse Internet",
    icon: <Globe className="h-4 w-4" style={{ color: "#0284c7" }} />,
    description: "Open web browser",
    shortcut: "⌘I",
    category: "Web",
    tags: ["browser", "internet", "web"],
    color: "#0284c7",
  },
  {
    id: "12",
    label: "Quick Actions",
    icon: <Zap className="h-4 w-4" style={{ color: "#eab308" }} />,
    description: "Access frequently used tools",
    shortcut: "⌘Q",
    category: "System",
    tags: ["quick", "actions", "tools"],
    color: "#eab308",
    isPinned: true,
  },
  {
    id: "13",
    label: "Generate Image",
    icon: <Sparkles className="h-4 w-4" style={{ color: "#a855f7" }} />,
    description: "AI image generation",
    shortcut: "⌘G",
    category: "AI Tools",
    tags: ["ai", "image", "generate"],
    color: "#a855f7",
    isNew: true,
  },
  {
    id: "14",
    label: "Theme Settings",
    icon: <Palette className="h-4 w-4" style={{ color: "#f59e0b" }} />,
    description: "Customize appearance",
    shortcut: "⌘P",
    category: "Design",
    tags: ["theme", "appearance", "customize"],
    color: "#f59e0b",
  },
  {
    id: "15",
    label: "Saved Items",
    icon: <Bookmark className="h-4 w-4" style={{ color: "#0d9488" }} />,
    description: "View bookmarked content",
    shortcut: "⌘D",
    category: "Productivity",
    tags: ["saved", "bookmarks", "favorites"],
    color: "#0d9488",
  },
]

// Group actions by category
const groupActionsByCategory = (actions: Action[]): ActionCategory[] => {
  const categories: Record<string, Action[]> = {}

  actions.forEach((action) => {
    const category = action.category || "Uncategorized"
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(action)
  })

  return Object.entries(categories).map(([name, actions]) => ({
    name,
    actions,
  }))
}

export default function ActionSearchBar({
  defaultOpen = false,
  className,
}: {
  defaultOpen?: boolean
  className?: string
}) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(defaultOpen)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [recentActions] = useState<Action[]>(allActions.filter((a) => a.isPinned).slice(0, 3))
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Process and filter actions based on query
  const getSearchResults = (): SearchResult => {
    if (!query.trim()) {
      // Show categories, recent and suggested when no query
      return {
        categories: groupActionsByCategory(allActions),
        recentActions: recentActions,
        suggestedActions: allActions.filter((a) => a.isNew).slice(0, 3),
      }
    }

    const normalizedQuery = query.toLowerCase().trim()
    const filteredActions = allActions.filter((action) => {
      const searchableText = [
        action.label.toLowerCase(),
        action.description?.toLowerCase() || "",
        ...(action.tags || []).map((tag) => tag.toLowerCase()),
      ].join(" ")

      return searchableText.includes(normalizedQuery)
    })

    // If filtering by category, only show that category
    if (activeCategory) {
      const categoryActions = filteredActions.filter((a) => a.category === activeCategory)
      return {
        categories: [
          {
            name: activeCategory,
            actions: categoryActions,
          },
        ],
        recentActions: [],
        suggestedActions: [],
      }
    }

    return {
      categories: groupActionsByCategory(filteredActions),
      recentActions: [],
      suggestedActions: [],
    }
  }

  const searchResults = getSearchResults()

  // Calculate total number of visible actions for keyboard navigation
  const getAllVisibleActions = (): Action[] => {
    const allVisible: Action[] = []

    if (searchResults.recentActions.length > 0) {
      allVisible.push(...searchResults.recentActions)
    }

    if (searchResults.suggestedActions.length > 0) {
      allVisible.push(...searchResults.suggestedActions)
    }

    searchResults.categories.forEach((category) => {
      allVisible.push(...category.actions)
    })

    return allVisible
  }

  const visibleActions = getAllVisibleActions()

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0)
  }, [query, activeCategory])

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % visibleActions.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + visibleActions.length) % visibleActions.length)
        break
      case "Enter":
        e.preventDefault()
        if (visibleActions[selectedIndex]) {
          executeAction(visibleActions[selectedIndex])
        }
        break
      case "Escape":
        e.preventDefault()
        setIsFocused(false)
        inputRef.current?.blur()
        break
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" })
      }
    }
  }, [selectedIndex])

  // Global keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsFocused(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown as any)
    return () => window.removeEventListener("keydown", handleKeyDown as any)
  }, [])

  const executeAction = (action: Action) => {
    console.log(`Executing action: ${action.label}`)
    if (action.execute) {
      action.execute()
    }
    setIsFocused(false)
    setQuery("")
    inputRef.current?.blur()
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.1,
      },
    },
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full sticky top-0 bg-background z-10 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="action-search">
              Search Commands
            </label>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                ⌘K
              </kbd>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Command className="h-4 w-4" />
            </div>

            <Input
              ref={inputRef}
              id="action-search"
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onKeyDown={handleKeyDown}
              className="pl-9 pr-9 py-2 h-10 text-sm rounded-lg focus-visible:ring-offset-0 bg-background border-border"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <AnimatePresence mode="wait">
                {query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Send className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full" ref={resultsRef}>
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="w-full border rounded-lg shadow-lg overflow-hidden bg-popover mt-1 max-h-[70vh] overflow-y-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Category filters */}
                {searchResults.categories.length > 1 && (
                  <motion.div className="p-2 border-b flex gap-1 flex-wrap" variants={itemVariants}>
                    {searchResults.categories.map((category) => (
                      <Badge
                        key={category.name}
                        variant={activeCategory === category.name ? "default" : "outline"}
                        className="cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Recent actions */}
                {searchResults.recentActions.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="px-3 pt-2 pb-1">
                      <h3 className="text-xs font-medium text-muted-foreground">Recent</h3>
                    </div>
                    <ul>
                      {searchResults.recentActions.map((action, idx) => (
                        <motion.li
                          key={action.id}
                          data-index={idx}
                          className={cn(
                            "px-3 py-2 mx-1 my-0.5 flex items-center justify-between hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md transition-colors",
                            selectedIndex === idx ? "bg-accent text-accent-foreground" : "",
                          )}
                          variants={itemVariants}
                          onClick={() => executeAction(action)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center justify-center w-6 h-6 rounded-md"
                              style={{ backgroundColor: `${action.color}20` }}
                            >
                              {action.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{action.label}</div>
                              <div className="text-xs text-muted-foreground">{action.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {action.shortcut && (
                              <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                                {action.shortcut}
                              </kbd>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Suggested actions */}
                {searchResults.suggestedActions.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="px-3 pt-2 pb-1">
                      <h3 className="text-xs font-medium text-muted-foreground">Suggested</h3>
                    </div>
                    <ul>
                      {searchResults.suggestedActions.map((action, idx) => {
                        const actionIndex = searchResults.recentActions.length + idx
                        return (
                          <motion.li
                            key={action.id}
                            data-index={actionIndex}
                            className={cn(
                              "px-3 py-2 mx-1 my-0.5 flex items-center justify-between hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md transition-colors",
                              selectedIndex === actionIndex ? "bg-accent text-accent-foreground" : "",
                            )}
                            variants={itemVariants}
                            onClick={() => executeAction(action)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="flex items-center justify-center w-6 h-6 rounded-md"
                                style={{ backgroundColor: `${action.color}20` }}
                              >
                                {action.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{action.label}</span>
                                  {action.isNew && (
                                    <Badge
                                      variant="default"
                                      className="text-[10px] px-1 py-0 h-4 bg-emerald-500 hover:bg-emerald-500"
                                    >
                                      New
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">{action.description}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {action.shortcut && (
                                <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                                  {action.shortcut}
                                </kbd>
                              )}
                            </div>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )}

                {/* Categorized actions */}
                {searchResults.categories.map((category, categoryIndex) => {
                  const startingIndex = searchResults.recentActions.length + searchResults.suggestedActions.length

                  return (
                    <motion.div key={category.name} variants={itemVariants}>
                      <div className="px-3 pt-2 pb-1">
                        <h3 className="text-xs font-medium text-muted-foreground">{category.name}</h3>
                      </div>
                      <ul>
                        {category.actions.map((action, idx) => {
                          // Calculate the absolute index for this action
                          let actionIndex = startingIndex
                          for (let i = 0; i < categoryIndex; i++) {
                            actionIndex += searchResults.categories[i].actions.length
                          }
                          actionIndex += idx

                          return (
                            <motion.li
                              key={action.id}
                              data-index={actionIndex}
                              className={cn(
                                "px-3 py-2 mx-1 my-0.5 flex items-center justify-between hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md transition-colors",
                                selectedIndex === actionIndex ? "bg-accent text-accent-foreground" : "",
                              )}
                              variants={itemVariants}
                              onClick={() => executeAction(action)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="flex items-center justify-center w-6 h-6 rounded-md"
                                  style={{ backgroundColor: `${action.color}20` }}
                                >
                                  {action.icon}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{action.label}</span>
                                    {action.isNew && (
                                      <Badge
                                        variant="default"
                                        className="text-[10px] px-1 py-0 h-4 bg-emerald-500 hover:bg-emerald-500"
                                      >
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {action.shortcut && (
                                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                                    {action.shortcut}
                                  </kbd>
                                )}
                              </div>
                            </motion.li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )
                })}

                {/* Footer with keyboard shortcuts */}
                <motion.div
                  className="mt-1 px-3 py-2 border-t flex items-center justify-between text-xs text-muted-foreground"
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                        ↑
                      </kbd>
                      <kbd className="px-1 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                        ↓
                      </kbd>
                      <span>to navigate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                        enter
                      </kbd>
                      <span>to select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-muted rounded border border-border">
                      esc
                    </kbd>
                    <span>to close</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
