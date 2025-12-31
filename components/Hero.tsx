"use client";

import React from "react";
import Plasma from "@/components/Plasma";
import { useBreakpoint } from "@/utils/BreakpointBadge";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const t = useTranslations("Hero");
  const bp = useBreakpoint();
  const FadeInYs = useRef<(HTMLDivElement | null)[]>([]);
  // 断点对应的 Plasma 缩放比例
  const SCALE: Record<string, number> = {
    base: 0.4, // 移动端稍微缩小一点，避免过于抢眼
    sm: 0.5,
    md: 0.7,
    lg: 1,
    xl: 1.2,
  };

  useGSAP(() => {
    FadeInYs.current.forEach((FadeInY) => {
      if (FadeInY) {
        gsap.fromTo(
          FadeInY,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: FadeInY,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section
      aria-label="Hero"
      className="relative w-full h-[100svh] overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]"
      ref={(el) => {
        if (el) FadeInYs.current[0] = el as HTMLDivElement;
      }}
    >
      {/* Logo: 移动端稍微小一点，位置靠下靠左 */}
      <Image
        src={"/hero/logo.webp"}
        width={400}
        height={400}
        alt="logo"
        className="absolute z-50 object-contain 
          w-[40px] h-[40px] bottom-8 left-6 
          md:w-[50px] md:h-[50px] md:bottom-[15%] md:left-[5%]"
      />

      {/* 文字容器: 移动端全宽+Padding，桌面端绝对定位到右侧 */}
      <div
        className="absolute z-50 flex flex-col justify-between font-roboto
        w-full px-6 top-[20%] left-0 h-[60%]
        md:w-[45%] md:left-[50%] md:px-0
        lg:w-[35%] lg:left-[55%] lg:top-[25%]"
      >
        {/* 标题: 响应式字体大小和行高 */}
        <div
          className="flex flex-col font-black 
          text-8xl leading-[0.9]
          lg:text-9xl" // 假设 leading-25 是自定义配置，这里用 standard leading 替代以保证安全
        >
          <h3>{t("hero_texts_line_1")}</h3>
          <h3>{t("hero_texts_line_2")}</h3>
          <h3>{t("hero_texts_line_3")}</h3>
        </div>

        {/* 描述文字: 移动端适当调整大小 */}
        <div className="font-normal text-base sm:text-lg md:max-w-md">
          {t("description")}
        </div>
      </div>

      {/* <Plasma
        color="#ff6b35"
        speed={0.6}
        direction="forward"
        scale={SCALE[bp] ?? 1.0}
        opacity={0.8}
        mouseInteractive={false}
      /> */}
    </section>
  );
};

export default Hero;
