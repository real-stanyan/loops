"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useIsMobile from "@/components/hooks/use-mobile";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/* 图标映射：保持你原来的图标与尺寸用法 */
import { MdInsights, MdDesignServices, MdTrendingUp } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial, IoPeopleOutline } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";

const ICONS = {
  MdInsights,
  LuTableOfContents,
  IoShareSocial,
  IoIosRocket,
  MdDesignServices,
  MdTrendingUp,
  IoPeopleOutline,
} as const;

type RawLeaf = {
  name?: string;
  title?: string;
  href: string;
  icon?: keyof typeof ICONS | string;
};
type RawGroup = { name: string; items?: RawLeaf[] };
type RawNav = RawLeaf | RawGroup;
type NavLeaf = {
  name: string;
  href: string;
  Icon?: React.ComponentType<{ className?: string }>;
};
type NavGroup = { name: string; items: NavLeaf[] };
type NavNode = NavLeaf | NavGroup;

const toIcon = (k?: string) =>
  (k && (ICONS as Record<string, any>)[k]) || undefined;
const toLeaf = (x: RawLeaf): NavLeaf => ({
  name: x.name ?? x.title ?? "",
  href: x.href,
  Icon: toIcon(x.icon),
});
const normalizeNavs = (raw: RawNav[]): NavNode[] =>
  raw.map((n) =>
    "items" in n && Array.isArray(n.items)
      ? { name: n.name, items: n.items.map(toLeaf) }
      : toLeaf(n as RawLeaf)
  );

export default function HeaderNavPC() {
  const t = useTranslations("Header");
  const isMobile = useIsMobile();
  const navs = React.useMemo<NavNode[]>(
    () => normalizeNavs((t.raw("navs") as RawNav[]) ?? []),
    [t]
  );

  return (
    <NavigationMenu viewport={isMobile} className="hidden lg:block">
      <NavigationMenuList className="flex-wrap">
        {navs.map((node, idx) => {
          // 单链接：保持你原来的触发样式
          if (!("items" in node)) {
            return (
              <NavigationMenuItem key={idx}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={node.href} className="bg-transparent">
                    {node.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          // 分组下拉：保留原先的结构与样式（ul w-[300px] gap-4，单个 li 里多个 Link，icon 用 text-5xl）
          return (
            <NavigationMenuItem key={idx} className="hidden md:block">
              <NavigationMenuTrigger className="bg-transparent">
                {node.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    {node.items.map((item, i) => (
                      <NavigationMenuLink asChild key={i}>
                        <Link
                          href={item.href}
                          className="flex flex-row items-center gap-2"
                        >
                          {item.Icon && (
                            <item.Icon
                              className={`
                                text-5xl text-[var(--decoration)]
                              `}
                            />
                          )}
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
