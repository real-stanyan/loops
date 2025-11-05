"use client";

import * as React from "react";
import Link from "next/link";

import useIsMobile from "@/components/hooks/use-mobile";

import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function HeaderNavPC() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile} className="hidden lg:block">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className="bg-transparent">
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-transparent">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <MdInsights
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Brand Strategy & Market Insights
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <LuTableOfContents
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Creative Direction & Content Production
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <IoShareSocial
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Marketing, Media & Communications
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <IoIosRocket
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Brand Growth & Consulting
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-transparent">
            Signature Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <MdInsights
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Brand Strategy & Market Insights
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <LuTableOfContents
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Creative Direction & Content Production
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <IoShareSocial
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Marketing, Media & Communications
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <IoIosRocket
                      className={`
                        text-5xl text-[var(--decoration)] 
                        `}
                    />
                    Brand Growth & Consulting
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/partnerships" className="bg-transparent">
              Partnerships
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/faqs" className="bg-transparent">
              FAQs
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
