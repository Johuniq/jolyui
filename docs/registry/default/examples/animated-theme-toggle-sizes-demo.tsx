import { AnimatedThemeToggle } from "@/registry/default/ui/animated-theme-toggle"

export default function AnimatedThemeToggleSizesDemo() {
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <AnimatedThemeToggle className="h-8 w-8" />
      <AnimatedThemeToggle className="h-10 w-10" />
      <AnimatedThemeToggle className="h-12 w-12" />
    </div>
  )
}
