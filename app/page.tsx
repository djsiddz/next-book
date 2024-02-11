"use client";

import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "ZC/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "ZC/ui/navigation-menu";

export default function Home() {
  return (
    <div className="p-10">
      <NavigationMenu className="w-100">
        <NavigationMenuList>
          <NavigationMenuItem className="flex items-center">
            <ChevronRightSquareIcon size={36} className="inline" /> <span className="pl-3">Next Book</span>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="flex h-screen flex-col justify-center">
        <h1 className="mb-6 text-6xl">Keep track of your Books.</h1>
        <p className="mb-12 text-xl">No matter where and how you like to read them.</p>
        <div className="flex justify-start gap-4">
          <Button asChild className="w-min text-2xl px-10 py-8">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button variant="secondary" className="w-min text-2xl px-10 py-8">Learn More</Button>
        </div>
      </main>
    </div>
  );
}
