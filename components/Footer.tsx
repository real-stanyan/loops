import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

// 定义类型
type RawLeaf = {
  name?: string;
  title?: string;
  href: string;
  // icon?: string; // 新设计不再需要 icon
};
type RawGroup = { name: string; items: RawLeaf[] };
type RawBottom = {
  // left: string; // 新设计底部左侧是 Logo，不再是文字链接
  right: string;
};

export default async function Footer() {
  const t = await getTranslations("Footer");

  // ✅ 读取数据
  // 注意：虽然新设计没有直接用到 title，但为了不破坏原有结构先保留读取
  // const title = t("title");
  const navs = (t.raw("navs") as RawGroup[]) ?? [];
  const bottom = (t.raw("bottom") as RawBottom) ?? { right: "" };

  if (!navs.length) {
    return null;
  }

  const [services, signature, others] = navs;

  // ✅ 重新设计后的渲染分组函数 (无图标，极简风格)
  const renderGroup = (group?: RawGroup) => {
    if (!group) return null;
    return (
      <div className="flex flex-col gap-6 min-w-[140px]">
        {/* 标题 */}
        <h4 className="text-xl md:text-2xl font-normal text-white">
          {group.name}
        </h4>
        {/* 链接列表 */}
        <div className="flex flex-col gap-3">
          {group.items.map((item, idx) => {
            const label = item.name ?? item.title ?? "";
            return (
              <Link
                key={idx}
                href={item.href}
                className="text-base text-gray-300 hover:text-white transition-colors duration-200 text-left"
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-black text-white px-6 py-12 md:px-16 md:py-20 xl:px-28 xl:py-24 flex flex-col justify-between min-h-[50vh] relative font-sans">
      {/* 上半部分：主要内容区域 */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24 mb-16 lg:mb-0">
        {/* 左侧：巨大的品牌排版 */}
        <div className="w-full lg:w-auto">
          <h1 className="font-black text-[5rem] sm:text-[6rem] md:text-[7rem] xl:text-[8.5rem] leading-[0.85] tracking-tighter uppercase">
            <span className="block">{t("title_line_1")}</span>
            <span className="block">{t("title_line_2")}</span>
            <span className="block">{t("title_line_3")}</span>
          </h1>
        </div>

        {/* 右侧：导航链接区域 */}
        {/* 使用 grid 在移动端对齐，在桌面端 flex 布局 */}
        <div className="w-full lg:flex-1 grid grid-cols-2 md:flex md:justify-between lg:justify-end gap-x-8 gap-y-12 lg:gap-16 xl:gap-24 pt-4 lg:pt-8">
          {renderGroup(services)}
          {renderGroup(signature)}
          {renderGroup(others)}
        </div>
      </div>

      {/* 下半部分：底部 Logo 和 版权信息 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-auto pt-8">
        {/* 左下角：红色 Logo */}
        <div className="mb-2">
          <Image
            src={"/hero/logo.webp"}
            width={500}
            height={500}
            alt="logo"
            className="w-10 md:w-12 h-auto pt-2"
          />
        </div>

        {/* 右下角：版权信息 */}
        <p className="text-sm md:text-base text-gray-400 text-right">
          {bottom.right || "© Copyright Loops Design Studio 2025"}
        </p>
      </div>
    </footer>
  );
}
