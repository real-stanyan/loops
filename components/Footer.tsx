import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
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
type RawGroup = { name: string; items: RawLeaf[] };
type RawBottom = { left: string; right: string };

const toIcon = (k?: string) =>
  (k && (ICONS as Record<string, any>)[k]) || undefined;

export default async function Footer() {
  const t = await getTranslations("Footer");

  // ✅ 分别读取
  const title = t("title");
  const navs = (t.raw("navs") as RawGroup[]) ?? [];
  const bottom = (t.raw("bottom") as RawBottom) ?? { left: "", right: "" };

  // 可选：兜底处理，避免缺 key 时报错
  if (!navs.length) {
    return null; // 或者渲染一个最简 footer
  }

  const [services, signature, others] = navs;

  const renderGroup = (group?: RawGroup, showIcons = true) => {
    if (!group) return null;
    return (
      <div
        className={`space-y-4 ${
          group.name === "Other" ? "hidden md:block" : ""
        }`}
      >
        <div
          className={`
          font-black text-md md:text-xl uppercase bg-[#1d1d1f] text-[#f5f5f7]
          px-2 py-1 rounded whitespace-nowrap overflow-ellipsis
          `}
        >
          {group.name}
        </div>
        <div className="flex flex-col gap-2">
          {group.items.map((item, idx) => {
            const Icon = showIcons ? toIcon(item.icon) : undefined;
            const label = item.name ?? item.title ?? "";
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex justify-start items-center gap-2 cursor-pointer group"
              >
                {Icon && (
                  <Icon
                    aria-hidden
                    className="text-2xl md:text-3xl text-[var(--decoration)]"
                  />
                )}
                <span className="text-sm md:text-base group-hover:font-bold duration-200 ease-in-out transition-all">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#f5f5f7] text-[#1d1d1f] p-5 md:p-10 xl:p-20 flex justify-between items-start gap-10 lg:gap-20 flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center w-[40%] md:w-[20%] self-center">
          <Image
            src={"/logo_black.webp"}
            width={400}
            height={400}
            alt="logo"
            className="p-4"
          />
          <h3 className="uppercase font-black text-lg md:text-xl xl:text-2xl whitespace-nowrap">
            {title}
          </h3>
        </div>

        <div className="flex flex-1 justify-evenly gap-4 w-full">
          {renderGroup(services, true)}
          {renderGroup(signature, true)}
          <div className="hidden md:block">{renderGroup(others, false)}</div>
        </div>
      </div>

      <div className="bg-black text-white flex justify-between items-center px-5 md:px-10 xl:px-20 py-3">
        <Link href="/privacy" className="font-black text-sm">
          {bottom.left}
        </Link>
        <h3 className="text-xs">{bottom.right}</h3>
      </div>
    </>
  );
}
