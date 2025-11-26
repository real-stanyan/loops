"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import Link from "next/link";

import { useLocale } from "next-intl";

import { useRouter, usePathname } from "@/i18n/navigation";

import { useTranslations } from "next-intl";

interface NavItem {
  title: string;

  href: string;
}

export default function Header() {
  const t = useTranslations("Header");

  const locale = useLocale();

  const router = useRouter();

  const pathname = usePathname();

  function onLocaleChange(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`
      absolute flex gap-4 h-[80px] items-center px-4 w-full z-50 font-roboto font-bold text-md 
      md:text-lg bg-[#f5f5f7] text-[#1d1d1f]
    `}
    >
      <div className="w-[90%] flex items-center justify-between mx-auto">
        {t.raw("navs").map((nav: NavItem, index: number) => (
          <Link href={nav.href} key={index}>
            {nav.title}
          </Link>
        ))}
      </div>

      <NativeSelect
        value={locale}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onLocaleChange(e.target.value)
        }
        aria-label="Language"
        className="p-0"
      >
        <NativeSelectOption value="en">EN</NativeSelectOption>

        <NativeSelectOption value="zh">ZH</NativeSelectOption>
      </NativeSelect>
    </header>
  );
}
