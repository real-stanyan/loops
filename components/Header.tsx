"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import HeaderNavPC from "./HeaderNavPC";
import HeaderNavPE from "./HeaderNavPE";

export default function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onLocaleChange(next: string) {
    // 切到相同路径的另一语言
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex justify-center pt-5 xl:pt-10 px-4">
      <div
        className={[
          "w-full max-w-5xl h-16 rounded-full px-5 sm:px-6",
          "flex items-center justify-between",
          "backdrop-blur-2xl backdrop-saturate-150",
          "bg-black/45 supports-[backdrop-filter]:bg-black/55",
          "border border-white/15 shadow-[0_1px_0_0_rgba(255,255,255,0.12)]",
          scrolled ? "shadow-xl" : "shadow-lg",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-3 cursor-target">
          <div className="group relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="loops logo"
              fill
              priority
              sizes="(min-width: 1280px) 96px, 80px"
              className="object-contain p-0.5 select-none"
              draggable={false}
            />
          </div>
          <span className="font-semibold text-white/90">{t("title")}</span>
        </Link>

        <div className="flex items-center gap-2">
          <NativeSelect
            value={locale}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onLocaleChange(e.target.value)
            }
            aria-label="Language"
          >
            <NativeSelectOption value="en">EN</NativeSelectOption>
            <NativeSelectOption value="zh">ZH</NativeSelectOption>
          </NativeSelect>

          <HeaderNavPC />
          <div className="border border-white/20 rounded-md px-3 py-2 bg-input/30 lg:hidden">
            <HeaderNavPE
              position="right"
              colors={["#ff6b3580", "#ff6b35"]}
              menuButtonColor="#f5f5f7"
              openMenuButtonColor="#1d1d1f"
              accentColor="#ff6b35"
              changeMenuColorOnOpen
              lockScrollOnOpen
            />
          </div>
        </div>
      </div>
    </header>
  );
}
