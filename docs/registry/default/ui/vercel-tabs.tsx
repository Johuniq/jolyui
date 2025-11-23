"use client"

import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react"

interface TabData {
  label: string
  value: string
  content: React.ReactNode
}

interface VercelTabsProps {
  tabs: TabData[]
  defaultTab?: string
  className?: string
}

export function VercelTabs({ tabs, defaultTab, className }: VercelTabsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]!.value)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex, tabs])

  useEffect(() => {
    requestAnimationFrame(() => {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [activeIndex])

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={setActiveTab}
      className={`w-full flex flex-col items-center ${className}`}
    >
      <TabsList className="relative bg-transparent p-0 h-auto gap-[6px] select-none">
        {/* Hover Highlight */}
        <div
          className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center left-0 top-0"
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />

        {/* Active Indicator */}
        <div
          className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] dark:bg-white transition-all duration-300 ease-out"
          style={activeStyle}
        />

        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={(el) => { tabRefs.current[index] = el }}
            className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] rounded-md bg-transparent border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=active]:bg-transparent data-[state=active]:shadow-none z-10 ${
              activeTab === tab.value ? "text-[#0e0e10] dark:text-white" : "text-[#0e0f1199] dark:text-[#ffffff99]"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-sm font-medium leading-5 whitespace-nowrap">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Content Area */}
      <div className="w-full mt-8 px-4">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full animate-in fade-in-50 duration-500">
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
