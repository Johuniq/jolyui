"use client";

import { IconGrid } from "@/components/icona/icon-grid";
import { SvgEditorModal } from "@/components/icona/svg-editor-modal";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { MotionEffect } from "@/components/landing/motion-effect";
import { SplittingText } from "@/components/landing/splitting";
import { Spotlight } from "@/components/landing/spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGlobalIconSearch } from "@/hooks/use-global-icon-search";
import { useIconLibrary } from "@/hooks/use-icon-library";
import { ChevronLeft, ChevronRight, Copy, Download, Globe, Loader2, PackageSearch, Palette, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Helper function to format category names
const formatCategoryName = (category: string): string => {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CATEGORIES = [
  "academicons",
  "akar-icons",
  "ant-design",
  "arcticons",
  "basil",
  "bi",
  "bitcoin-icons",
  "bpmn",
  "brandico",
  "bubbles",
  "bx",
  "bxl",
  "bxs",
  "bytesize",
  "carbon",
  "catppuccin",
  "cbi",
  "charm",
  "ci",
  "cib",
  "cif",
  "cil",
  "circle-flags",
  "circum",
  "clarity",
  "codex",
  "codicon",
  "covid",
  "cryptocurrency-color",
  "cryptocurrency",
  "cuida",
  "dashicons",
  "devicon-line",
  "devicon-original",
  "devicon-plain",
  "devicon",
  "duo-icons",
  "ei",
  "el",
  "emblemicons",
  "emojione-monotone",
  "emojione-v1",
  "emojione",
  "entypo-social",
  "entypo",
  "eos-icons",
  "ep",
  "et",
  "eva",
  "f7",
  "fa-brands",
  "fa-regular",
  "fa-solid",
  "fa",
  "fa6-brands",
  "fa6-regular",
  "fa6-solid",
  "fad",
  "famicons",
  "fe",
  "feather",
  "file-icons",
  "flag",
  "flagpack",
  "flat-color-icons",
  "flat-ui",
  "flowbite",
  "fluent-color",
  "fluent-emoji-flat",
  "fluent-emoji-high-contrast",
  "fluent-emoji",
  "fluent-mdl2",
  "fluent",
  "fontelico",
  "fontisto",
  "formkit",
  "foundation",
  "fxemoji",
  "gala",
  "game-icons",
  "garden",
  "geo",
  "gg",
  "gis",
  "gravity-ui",
  "gridicons",
  "grommet-icons",
  "guidance",
  "healthicons",
  "heroicons-outline",
  "heroicons-solid",
  "heroicons",
  "hugeicons",
  "humbleicons",
  "ic",
  "icomoon-free",
  "icon-park-outline",
  "icon-park-solid",
  "icon-park-twotone",
  "icon-park",
  "iconamoon",
  "iconoir",
  "icons8",
  "il",
  "ion",
  "iwwa",
  "ix",
  "jam",
  "la",
  "lets-icons",
  "line-md",
  "lineicons",
  "logos",
  "ls",
  "lsicon",
  "lucide-lab",
  "lucide",
  "mage",
  "majesticons",
  "maki",
  "map",
  "marketeq",
  "material-symbols-light",
  "material-symbols",
  "mdi-light",
  "mdi",
  "medical-icon",
  "memory",
  "meteocons",
  "meteor-icons",
  "mi",
  "mingcute",
  "mono-icons",
  "mynaui",
  "nimbus",
  "nonicons",
  "noto-v1",
  "noto",
  "nrk",
  "octicon",
  "oi",
  "ooui",
  "openmoji",
  "oui",
  "pajamas",
  "pepicons-pencil",
  "pepicons-pop",
  "pepicons-print",
  "pepicons",
  "ph",
  "pixelarticons",
  "prime",
  "proicons",
  "ps",
  "qlementine-icons",
  "quill",
  "radix-icons",
  "raphael",
  "ri",
  "rivet-icons",
  "si-glyph",
  "si",
  "simple-icons",
  "simple-line-icons",
  "skill-icons",
  "solar",
  "stash",
  "streamline-emojis",
  "streamline",
  "subway",
  "svg-spinners",
  "system-uicons",
  "tabler",
  "tdesign",
  "teenyicons",
  "token-branded",
  "token",
  "topcoat",
  "twemoji",
  "typcn",
  "uil",
  "uim",
  "uis",
  "uit",
  "uiw",
  "unjs",
  "vaadin",
  "vs",
  "vscode-icons",
  "websymbol",
  "weui",
  "whh",
  "wi",
  "wpf",
  "zmdi",
  "zondicons",
];

export default function IconaClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("brandico");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMode, setSearchMode] = useState<"category" | "global">("category");
  const [selectedIcon, setSelectedIcon] = useState<{
    name: string;
    svg: string;
    category: string;
    width: number;
    height: number;
  } | null>(null);

  // Debounce search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const ICONS_PER_PAGE = 48;

  // Category-specific search
  const { icons, defaultDimensions, loading: categoryLoading, error } = useIconLibrary(selectedCategory);

  // Global search across all categories (using debounced search)
  const { 
    results: globalResults, 
    loading: globalLoading, 
    searchedCategories,
    totalCategories 
  } = useGlobalIconSearch(
    debouncedSearch,
    CATEGORIES,
    searchMode === "global" && debouncedSearch.length >= 2
  );

  // Determine which mode to use based on search query
  const isGlobalSearchActive = debouncedSearch.length >= 2;
  const effectiveSearchMode = isGlobalSearchActive ? "global" : "category";
  const loading = effectiveSearchMode === "global" ? globalLoading : categoryLoading;
  const isTyping = searchQuery !== debouncedSearch;
  
  // For global search, show results immediately as they come in (chunk by chunk)
  // For category search, wait for debounce to complete
  const showResults = effectiveSearchMode === "global" ? true : (debouncedSearch === searchQuery);

  const filteredIcons = useMemo(() => {
    if (effectiveSearchMode === "global") {
      return globalResults;
    }

    if (!icons) return [];
    
    return Object.entries(icons)
      .filter(([name]) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(([name, icon]: [string, any]) => ({
        name,
        svg: icon.body as string,
        width: icon.width ?? defaultDimensions.width,
        height: icon.height ?? defaultDimensions.height,
        category: selectedCategory,
        categoryDisplay: formatCategoryName(selectedCategory),
      }));
  }, [icons, searchQuery, defaultDimensions, selectedCategory, effectiveSearchMode, globalResults]);

  const totalPages = Math.ceil(filteredIcons.length / ICONS_PER_PAGE);
  
  const paginatedIcons = useMemo(() => {
    // For global search, don't paginate - show all results as they come in
    if (effectiveSearchMode === "global") {
      return filteredIcons;
    }
    
    // For category search, use pagination
    const startIndex = (currentPage - 1) * ICONS_PER_PAGE;
    const endIndex = startIndex + ICONS_PER_PAGE;
    return filteredIcons.slice(startIndex, endIndex);
  }, [filteredIcons, currentPage, effectiveSearchMode]);

  // Reset to page 1 when search or category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    // Auto-switch to global search when user types
    if (query.length >= 2) {
      setSearchMode("global");
    } else {
      setSearchMode("category");
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      <Header />
      
      {/* Hero Section - Matching Main Landing Page */}
      <div className="relative overflow-hidden flex flex-col items-center px-5 border-b">
        <div className="relative z-10 flex flex-col items-center justify-center pt-30 space-y-5 pb-20">
            <MotionEffect
              slide={{ direction: 'down' }}
              fade
              zoom
              inView
            >
              <div className="mb-8 rounded-full bg-accent py-1 pl-1 pr-3 text-sm flex items-center gap-2">
                <span className="h-6 px-2 bg-primary text-xs text-primary-foreground rounded-full flex gap-1 items-center justify-center">
                  New
                  <Sparkles className="size-4" />
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  200+ Icon Collections • 50,000+ Icons
                </span>
              </div>
            </MotionEffect>

            <MotionEffect
              slide={{ direction: 'down' }}
              fade
              zoom
              inView
              delay={0.15}
            >
              <div className="relative z-10">
                <h1 className="md:max-w-[800px] max-w-[320px]">
                  <SplittingText
                    text=" Icon library for everyone. "
                    aria-hidden="true"
                    className="block md:text-5xl text-4xl font-medium text-center text-neutral-200 dark:text-neutral-800"
                    disableAnimation
                  />
                </h1>
                <div className="md:max-w-[800px] max-w-[320px] absolute inset-0 flex items-center justify-center">
                  <SplittingText
                    text=" Icon library for everyone. "
                    className="block md:text-5xl text-4xl font-medium text-center"
                    type="chars"
                    delay={400}
                    initial={{ y: 0, opacity: 0, x: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </MotionEffect>

            <MotionEffect
              slide={{ direction: 'down' }}
              fade
              zoom
              inView
              delay={0.3}
            >
              <p className="block font-normal md:text-lg sm:text-base text-sm text-center mt-3 text-muted-foreground md:max-w-[660px] sm:max-w-[450px] text-balance">
                Discover and customize thousands of professionally crafted icons from 200+ top design systems. 
                Search globally, edit in real-time, and export instantly with our powerful built-in SVG editor.
              </p>
            </MotionEffect>

            {/* <div className="flex sm:flex-row flex-col sm:gap-4 gap-3 mt-5 mb-8 max-sm:w-full">
              <MotionEffect
                slide={{ direction: 'down' }}
                fade
                zoom
                delay={0.45}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full !pr-5" variant="default">
                    Start Searching
                    <Search className="!size-5" />
                  </Button>
                </motion.div>
              </MotionEffect>

              <MotionEffect
                slide={{ direction: 'down' }}
                fade
                zoom
                delay={0.6}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full">
                    Browse Collections
                  </Button>
                </motion.div>
              </MotionEffect>
            </div> */}

            <div className="flex items-center gap-4 justify-center sm:justify-start flex-wrap">
              <MotionEffect slide={{ direction: 'down' }} fade zoom delay={0.75}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card/50">
                  <Copy className="size-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-xs font-medium">One-Click Copy</span>
                </div>
              </MotionEffect>
              
              <MotionEffect slide={{ direction: 'down' }} fade zoom delay={0.85}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card/50">
                  <Palette className="size-5 text-fuchsia-600 dark:text-fuchsia-400" />
                  <span className="text-xs font-medium">Color Editor</span>
                </div>
              </MotionEffect>
              
              <MotionEffect slide={{ direction: 'down' }} fade zoom delay={0.95}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card/50">
                  <PackageSearch className="size-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-medium">Global Search</span>
                </div>
              </MotionEffect>
              
              <MotionEffect slide={{ direction: 'down' }} fade zoom delay={1.05}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-card/50">
                  <Download className="size-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-xs font-medium">Instant Export</span>
                </div>
              </MotionEffect>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-7xl py-12 px-4 md:px-6 lg:px-8">
          {/* Search and Filter Controls */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Type to search across 200+ icon collections..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 pr-32 h-12 text-base rounded-xl border-2 focus-visible:ring-2 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setDebouncedSearch("");
                        setSearchMode("category");
                      }}
                      className="h-8 w-8 p-0 hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  {isTyping && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      <Loader2 className="h-3 w-3 text-yellow-600 dark:text-yellow-400 animate-spin" />
                      <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                        Typing...
                      </span>
                    </div>
                  )}
                  {effectiveSearchMode === "global" && !isTyping && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 animate-pulse">
                      <Globe className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
                        Global
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Select 
                value={selectedCategory} 
                onValueChange={handleCategoryChange}
                disabled={effectiveSearchMode === "global"}
              >
                <SelectTrigger className="w-full md:w-[320px] h-12 text-base rounded-xl border-2 focus-visible:ring-2">
                  <SelectValue placeholder="Select icon collection" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {formatCategoryName(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Mode Info */}
            {effectiveSearchMode === "global" && debouncedSearch && (
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 border border-violet-500/20 backdrop-blur-sm">
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{backgroundSize: '200% 100%'}} />
                )}
                <div className="relative flex items-center gap-3 px-4 py-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20">
                    <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                      Global Search Active
                    </p>
                    {loading ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-violet-200 dark:bg-violet-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 ease-out"
                            style={{width: `${(searchedCategories / totalCategories) * 100}%`}}
                          />
                        </div>
                        <span className="text-xs font-medium text-violet-700 dark:text-violet-300 tabular-nums">
                          {searchedCategories}/{totalCategories}
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-violet-700 dark:text-violet-300 mt-1">
                        Found results from {totalCategories} collections
                      </p>
                    )}
                  </div>
                  {!loading && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-700 dark:text-violet-300">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">{filteredIcons.length}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Stats Bar */}

          </div>

          {/* Icon Grid */}
          <div className="min-h-[400px]">
            {((loading && filteredIcons.length === 0) || isTyping) && (
              <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 animate-pulse" />
                  <Loader2 className="absolute inset-0 m-auto h-10 w-10 animate-spin text-violet-600 dark:text-violet-400" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">
                    {isTyping ? "Waiting for input..." : effectiveSearchMode === "global" ? "Searching globally..." : "Loading icons..."}
                  </p>
                  {effectiveSearchMode === "global" && !isTyping && loading && (
                    <p className="text-sm text-muted-foreground">
                      Scanning {searchedCategories} of {totalCategories} collections
                    </p>
                  )}
                </div>
              </div>
            )}

            {!loading && !isTyping && error && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="space-y-2">
                  <p className="text-destructive font-semibold">Failed to load icons</p>
                  <p className="text-sm text-muted-foreground max-w-md">{error}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  Reload Page
                </Button>
              </div>
            )}

            {!loading && !isTyping && !error && filteredIcons.length === 0 && debouncedSearch && showResults && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                    <Search className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div className="space-y-3 max-w-md">
                  <p className="text-xl font-bold">No icons found for "{debouncedSearch}"</p>
                  <p className="text-sm text-muted-foreground">
                    {effectiveSearchMode === "global" 
                      ? `We searched across all ${totalCategories} collections but couldn't find any matches.`
                      : `No matches in the ${formatCategoryName(selectedCategory)} collection.`
                    }
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setDebouncedSearch("");
                      }}
                    >
                      Clear Search
                    </Button>
                    {effectiveSearchMode === "category" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchMode("global");
                        }}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Search All Collections
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!loading && !isTyping && !error && filteredIcons.length === 0 && !debouncedSearch && (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                  <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Start searching for icons</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Type in the search box to find icons across 200+ collections
                  </p>
                </div>
              </div>
            )}

            {!isTyping && !error && filteredIcons.length > 0 && (effectiveSearchMode === "global" || !loading) && (
              <>
                <IconGrid
                  icons={paginatedIcons}
                  onIconClick={(icon: any) =>
                    setSelectedIcon({
                      ...icon,
                      category: icon.category ?? selectedCategory,
                    })
                  }
                />
                
                {/* Pagination Controls */}
                {totalPages > 1 && effectiveSearchMode !== "global" && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="lg"
                            onClick={() => setCurrentPage(pageNum)}
                            className="w-12 h-12 rounded-xl"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-xl"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* SVG Editor Modal */}
        <SvgEditorModal
          icon={selectedIcon}
          open={!!selectedIcon}
          onOpenChange={(open: boolean) => !open && setSelectedIcon(null)}
        />
        
        <Footer />
      </main>
  );
}
