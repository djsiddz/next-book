"use client";

import React from "react";

import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "ZC/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "ZC/ui/navigation-menu";
import { profileLinks } from "ZL/constants";
import { cn } from "ZL/utils";

export default function DashboardNav({ email } : { email: string | undefined}) {
  return (
    <header className="min-w-100 max-w-screen flex justify-between">
      <NavigationMenu className="flex">
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center mr-10">
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <ChevronRightSquareIcon size={36} className="inline" /> <span className=" text-xl pl-3">Next Book</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/dashboard/my-collection" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Collection
              </NavigationMenuLink>
            </Link>
            <Link href="/dashboard/settings" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button asChild variant="outline" className="w-min">
              <Link href="/dashboard/new">Add New Book</Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {email}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="right-0 left-auto p-2">
              <ul className="grid w-[300px] gap-2 p-2">
              {profileLinks.map((link) => (
                <ListItem
                  key={link.title}
                  title={link.title}
                  href={link.href}
                >
                  {link.description}
                </ListItem>
              ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

