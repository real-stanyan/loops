// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) ?? routing.defaultLocale;
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  // 动态按需加载，避免把所有语言打进同一 bundle
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return { locale, messages };
});
