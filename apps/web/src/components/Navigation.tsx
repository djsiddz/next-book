"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DollarSign, Sparkle, User } from "lucide-react"

import { cn } from "@/utils/cn"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navItems = [
  {
    label: "Features",
    href: "#features",
    icon: Sparkle,
  },
  {
    label: "Pricing",
    href: "#pricing",
    icon: DollarSign,
  },
  {
    label: "Login",
    href: "/login",
    icon: User,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden sm:flex">
      <NavigationMenuList>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/library" && pathname.startsWith("/library/"))

          return (
            <NavigationMenuItem key={item.href}>

              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "gap-2",
                  isActive && "bg-accent/50 font-bold"
                )}
                render={<Link href={item.href} passHref></Link>}
              >
                <Icon className="size-4" />
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
