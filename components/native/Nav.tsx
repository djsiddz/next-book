import React from "react";

import { ChevronRightSquareIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "ZC/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "ZC/ui/navigation-menu";
import { resourcesLinks, socialLinks } from "ZL/constants";
import { cn } from "ZL/utils";

export default function Nav() {
  return (
    <NavigationMenu className="min-w-100 max-w-screen flex justify-between px-0">
      <NavigationMenuList>
        <NavigationMenuItem id="mobile-nav" className="visible flex items-center md:hidden">
          <NavigationMenuTrigger className="pl-0">
            <ChevronRightSquareIcon size={36} className="inline" /> <span className=" pl-3 text-xl">Next Book</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[280px] gap-2 md:w-[500px] md:grid-cols-2">
              <ListItem key={"features-link"} title="Features" href={"#features"}></ListItem>
              <h3 className="text-bold pl-2 pt-4 text-base uppercase">Resources</h3>
              {resourcesLinks.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
              <h3 className="text-bold pl-2 pt-4 text-base uppercase">Contact</h3>
              {socialLinks.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem id="desktop-logo" className="hidden items-center md:visible md:flex">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={`px-0 md:mr-10 ${navigationMenuTriggerStyle()}`}>
              <ChevronRightSquareIcon size={36} className="inline" /> <span className=" pl-3 text-xl">Next Book</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem id="features-link" className="hidden md:flex">
          <Link href="#features" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Features</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem id="resources-links" className="hidden md:flex">
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[300px] gap-2 p-2 md:w-[500px] md:grid-cols-2">
              {resourcesLinks.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem id="contact-links" className="hidden md:flex">
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <ul className="grid w-[300px] gap-2 p-2 md:w-[500px] md:grid-cols-2">
              {socialLinks.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
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
