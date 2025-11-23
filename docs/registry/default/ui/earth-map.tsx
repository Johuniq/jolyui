"use client"

import { useEffect, useState } from "react"

export function EarthMap() {
  const [svgContent, setSvgContent] = useState<string>("")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const svgFile = isDark ? "/map-dark.svg" : "/map.svg"
        const response = await fetch(svgFile)
        const svgText = await response.text()
        setSvgContent(svgText)
      } catch (error) {
        console.error("Failed to load SVG:", error)
      }
    }

    if (mounted) {
      loadSVG()
    }
  }, [isDark, mounted])

  useEffect(() => {
    if (svgContent) {
      const timer = setTimeout(() => {
        const rects = document.querySelectorAll("#map-svg rect")
        console.log(`[v0] Found ${rects.length} rect elements`)

        rects.forEach((rect, index) => {
          const duration = Math.random() * 1.5 + 0.5 // 0.5-2 seconds (faster)
          const delay = Math.random() * 1 // 0-1 seconds

          rect.setAttribute(
            "style",
            `
            animation: glimmer ${duration}s ease-in-out ${delay}s infinite alternate;
          `,
          )
        })

        const style = document.createElement("style")
        style.textContent = `
          @keyframes glimmer {
            0% { opacity: 1; }
            100% { opacity: 0.1; }
          }
        `
        document.head.appendChild(style)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [svgContent])

  const toggleTheme = () => {
    console.log("[v0] Toggling theme, current isDark:", isDark)

    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    console.log("[v0] Theme toggled to:", newIsDark ? "dark" : "light")
  }

  if (!mounted) {
    return (
      <div
        className="min-h-screen w-full overflow-x-hidden flex items-center justify-center p-4"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex justify-center items-center w-full">
          <div
            className="bg-gray-200 animate-pulse rounded-lg"
            style={{ width: "800px", height: "800px", maxWidth: "800px", maxHeight: "800px" }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden flex items-center justify-center p-4"
      style={{ backgroundColor: isDark ? "#0A0A0A" : "#ffffff" }}
    >
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.75 14.75H7.25V13H8.75V14.75ZM4.99512 12.0654L3.75781 13.3037L2.69629 12.2422L3.93457 11.0049L4.99512 12.0654ZM13.3037 12.2422L12.2422 13.3037L11.0049 12.0654L12.0654 11.0049L13.3037 12.2422ZM8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5ZM8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6ZM3 8.75H1.25V7.25H3V8.75ZM14.75 8.75H13V7.25H14.75V8.75ZM4.99512 3.93457L3.93457 4.99512L2.69629 3.75781L3.75781 2.69629L4.99512 3.93457ZM13.3037 3.75781L12.0654 4.99512L11.0049 3.93457L12.2422 2.69629L13.3037 3.75781ZM8.75 3H7.25V1.25H8.75V3Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.00293 3.55371C6.83979 4.00447 6.75005 4.49131 6.75 5C6.75026 7.34699 8.65295 9.25 11 9.25C11.5084 9.25 11.9951 9.16034 12.4463 8.99707L13.4062 9.95703C12.6058 12.1673 10.4896 13.75 8 13.75C4.82452 13.75 2.25026 11.1754 2.25 8C2.25023 5.51079 3.83242 3.39313 6.04297 2.59277L7.00293 3.55371ZM5.25488 4.75781C4.33483 5.53763 3.75014 6.70065 3.75 8C3.75026 10.347 5.65295 12.25 8 12.25C9.29935 12.25 10.4607 11.6643 11.2402 10.7441C11.1606 10.7474 11.0805 10.75 11 10.75C7.82452 10.75 5.25026 8.17542 5.25 5C5.25001 4.91907 5.25154 4.83796 5.25488 4.75781ZM12.5 3.5H13.75V5H12.5V6.25H11V5H9.75V3.5H11V2.25H12.5V3.5Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>

      <div className="flex justify-center items-center w-full">
        {svgContent ? (
          <div
            id="map-svg"
            className="overflow-hidden flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            style={{ width: "800px", height: "800px", maxWidth: "800px", maxHeight: "800px" }}
          />
        ) : (
          <div
            className="bg-gray-200 animate-pulse rounded-lg"
            style={{ width: "800px", height: "800px", maxWidth: "800px", maxHeight: "800px" }}
          />
        )}
      </div>
    </div>
  )
}
