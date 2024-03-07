import React from "react";

import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "ZC/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "ZC/ui/navigation-menu";
import { resourcesLinks, socialLinks } from "ZL/constants";
import { cn } from "ZL/utils";

export default function Nav() {
  return (
    <NavigationMenu className="min-w-100 max-w-screen flex justify-between">
      <NavigationMenuList className="">
        <NavigationMenuItem className="flex items-center mr-10">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <ChevronRightSquareIcon size={36} className="inline" /> <span className=" text-xl pl-3">Next Book</span>
            </NavigationMenuLink>
          </Link>

        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#features" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Features
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[300px] gap-2 p-2 md:grid-cols-2 md:w-[500px]">
            {resourcesLinks.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[300px] gap-2 p-2 md:grid-cols-2 md:w-[500px]">
            {socialLinks.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <Button asChild variant="outline" className="w-min">
        <Link href="/login">Login</Link>
      </Button>
    </NavigationMenu>
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

