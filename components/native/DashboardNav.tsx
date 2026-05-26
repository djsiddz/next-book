"use client";

import React from "react";
import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { BookSearch } from "./BookSearch";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "ZC/ui/navigation-menu";
import { profileLinks } from "ZL/constants";
import { cn } from "ZL/utils";

export default function DashboardNav({ email }: { email: string | undefined }) {
  return (
    <header className="min-w-100 max-w-screen flex justify-between">
      <NavigationMenu className="flex">
        <NavigationMenuList>
          <NavigationMenuItem className="mr-10 flex items-center">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/dashboard">
                <ChevronRightSquareIcon size={36} className="inline" /> <span className="pl-3 text-xl">Next Book</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/dashboard/my-collection">My Collection</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/dashboard/settings">Settings</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <BookSearch searchButtonLabel="Add New Book" />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{email}</NavigationMenuTrigger>
            <NavigationMenuContent className="left-auto right-0 p-2">
              <ul className="grid w-[300px] gap-2 p-2">
                {profileLinks.map((link) => (
                  <ListItem key={link.title} title={link.title} href={link.href}>
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
