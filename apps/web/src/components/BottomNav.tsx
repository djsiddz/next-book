"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Search, User } from "lucide-react"
import { cn } from "@/utils/cn"

export function BottomNav() {
  const pathname = usePathname()
  const isExcludedPage = pathname === "/" || pathname === "/login" || pathname === "/signup"

  if (isExcludedPage) return null

  const navItems = [
    {
      label: "Library",
      href: "/library",
      icon: Book,
    },
    {
      label: "Search",
      href: "/capture",
      icon: Search,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 z-50 flex w-full justify-around border-t border-border bg-background/95 p-3 pb-safe backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === "/library" && pathname.startsWith("/library/"))
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
            <span className={cn("text-xs font-medium", isActive && "font-black tracking-tight")}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
