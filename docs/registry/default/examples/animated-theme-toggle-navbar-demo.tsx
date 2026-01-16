import { AnimatedThemeToggle } from "@/registry/default/ui/animated-theme-toggle"

export default function AnimatedThemeToggleNavbarDemo() {
  return (
    <div className="flex w-full max-w-2xl items-center justify-between rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary" />
        <span className="font-semibold text-foreground">MyApp</span>
      </div>
      <nav className="hidden items-center gap-6 md:flex">
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
          Home
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
          Features
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
          Pricing
        </a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
          About
        </a>
      </nav>
      <AnimatedThemeToggle />
    </div>
  )
}
