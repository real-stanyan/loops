"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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
      md:text-lg text-[#f5f5f7] bg-[#1d1d1f]
    `}
    >
      {/* 1. 在组件内部定义 Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* 2. 外层容器：flex-1 占满中间空间，overflow-hidden 隐藏超出部分 */}
      <div className="flex-1 overflow-hidden">
        {/* 3. h1 标签：应用动画 */}
        <h1
          className="whitespace-nowrap text-center font-normal text-base sm:text-lg md:max-w-md"
          style={{
            // 15s 是滚动时间，linear 是匀速，infinite 是无限循环
            animation: "marquee 15s linear infinite",
          }}
        >
          {t("title")}
        </h1>
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
