// src/middleware.ts  （Next ≤15 用 middleware，Next 16 用 proxy.ts，内容相同）
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
