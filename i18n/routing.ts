// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  // 根路径只在需要时加前缀（/zh），/en 不强制
  localePrefix: { mode: "as-needed" },
});
