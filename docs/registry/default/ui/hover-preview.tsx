"use client"

import { cn } from "@/lib/cn"
import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState } from "react"

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface PreviewData {
  /** Image URL for the preview card */
  image: string
  /** Title displayed in the preview card */
  title: string
  /** Subtitle or description displayed below the title */
  subtitle?: string
}

export interface HoverPreviewLinkProps {
  /** Unique key to identify which preview data to show */
  previewKey: string
  /** Content to render as the hoverable link */
  children: React.ReactNode
  /** Additional CSS classes for the link */
  className?: string
}

export interface HoverPreviewCardProps {
  /** Width of the preview card in pixels */
  width?: number
  /** Border radius of the card */
  borderRadius?: number
  /** Additional CSS classes for the card */
  className?: string
}

export interface HoverPreviewProviderProps {
  /** Preview data object with keys matching the previewKey in HoverPreviewLink */
  data: Record<string, PreviewData>
  /** Children components (should include HoverPreviewLink components) */
  children: React.ReactNode
  /** Card configuration options */
  cardProps?: HoverPreviewCardProps
  /** Offset distance from cursor in pixels */
  cursorOffset?: number
  /** Whether to preload all images on mount */
  preloadImages?: boolean
  /** Additional CSS classes for the container */
  className?: string
}

// ==========================================
// CONTEXT
// ==========================================

interface HoverPreviewContextValue {
  data: Record<string, PreviewData>
  activePreview: PreviewData | null
  position: { x: number; y: number }
  isVisible: boolean
  cardProps: HoverPreviewCardProps
  handleHoverStart: (key: string, e: React.MouseEvent) => void
  handleHoverMove: (e: React.MouseEvent) => void
  handleHoverEnd: () => void
}

const HoverPreviewContext = createContext<HoverPreviewContextValue | null>(null)

function useHoverPreview() {
  const context = useContext(HoverPreviewContext)
  if (!context) {
    throw new Error("HoverPreviewLink must be used within a HoverPreviewProvider")
  }
  return context
}

// ==========================================
// COMPONENTS
// ==========================================

export function HoverPreviewProvider({
  data,
  children,
  cardProps = {},
  cursorOffset = 20,
  preloadImages = true,
  className,
}: HoverPreviewProviderProps) {
  const [activePreview, setActivePreview] = useState<PreviewData | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const cardWidth = cardProps.width ?? 300
  const cardHeight = 250

  // Preload all images on mount
  useEffect(() => {
    if (!preloadImages) return
    Object.values(data).forEach((item) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = item.image
    })
  }, [data, preloadImages])

  const updatePosition = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      let x = e.clientX - cardWidth / 2
      let y = e.clientY - cardHeight - cursorOffset

      // Boundary checks
      if (x + cardWidth > window.innerWidth - 20) {
        x = window.innerWidth - cardWidth - 20
      }
      if (x < 20) {
        x = 20
      }
      if (y < 20) {
        y = e.clientY + cursorOffset
      }

      setPosition({ x, y })
    },
    [cardWidth, cardHeight, cursorOffset]
  )

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      const previewData = data[key]
      if (previewData) {
        setActivePreview(previewData)
        setIsVisible(true)
        updatePosition(e)
      }
    },
    [data, updatePosition]
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition]
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  const contextValue: HoverPreviewContextValue = {
    data,
    activePreview,
    position,
    isVisible,
    cardProps: { width: cardWidth, ...cardProps },
    handleHoverStart,
    handleHoverMove,
    handleHoverEnd,
  }

  return (
    <HoverPreviewContext.Provider value={contextValue}>
      <div className={cn("relative", className)}>
        {children}
        <HoverPreviewCard ref={cardRef} />
      </div>
    </HoverPreviewContext.Provider>
  )
}

export function HoverPreviewLink({ previewKey, children, className }: HoverPreviewLinkProps) {
  const { handleHoverStart, handleHoverMove, handleHoverEnd } = useHoverPreview()

  return (
    <span
      className={cn(
        "relative inline-block cursor-pointer font-semibold text-foreground transition-colors",
        "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-primary/60 after:transition-all after:duration-300",
        "hover:after:w-full",
        className
      )}
      onMouseEnter={(e) => handleHoverStart(previewKey, e)}
      onMouseMove={handleHoverMove}
      onMouseLeave={handleHoverEnd}
    >
      {children}
    </span>
  )
}

const HoverPreviewCard = forwardRef<HTMLDivElement>((_, ref) => {
  const { activePreview, position, isVisible, cardProps } = useHoverPreview()

  if (!activePreview) return null

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none fixed z-50 transition-all duration-200",
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0 translate-y-2"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: cardProps.width,
      }}
    >
      <div
        className={cn(
          "overflow-hidden border border-border/50 bg-card/95 p-2 shadow-2xl backdrop-blur-md",
          cardProps.className
        )}
        style={{ borderRadius: cardProps.borderRadius ?? 16 }}
      >
        <img
          src={activePreview.image}
          alt={activePreview.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className="aspect-video w-full rounded-lg object-cover"
        />
        <div className="px-2 pt-3 pb-1">
          <div className="text-sm font-semibold text-foreground">{activePreview.title}</div>
          {activePreview.subtitle && (
            <div className="mt-1 text-xs text-muted-foreground">{activePreview.subtitle}</div>
          )}
        </div>
      </div>
    </div>
  )
})

HoverPreviewCard.displayName = "HoverPreviewCard"

// ==========================================
// EXPORTS
// ==========================================

export { HoverPreviewContext, useHoverPreview }
