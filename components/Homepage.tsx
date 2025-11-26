"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ImageSwiper from "./ImageSwiper";
import Logos from "./Logos";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
  const t = useTranslations("Homepage");
  const LeftWindows = useRef<(HTMLDivElement | null)[]>([]);
  const RightWindows = useRef<(HTMLDivElement | null)[]>([]);
  const FadeInYs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    LeftWindows.current.forEach((LeftWindow) => {
      if (LeftWindow) {
        gsap.fromTo(
          LeftWindow,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: LeftWindow,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    RightWindows.current.forEach((RightWindow) => {
      if (RightWindow) {
        gsap.fromTo(
          RightWindow,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: RightWindow,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
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
    <div className="bg-[#f5f5f7] text-[#1d1d1f] w-full overflow-x-hidden">
      {/* --- Section 1: Branding art direction --- */}
      {/* 优化：手机端 flex-col (上下)，高度 h-auto 让内容自然撑开。
         桌面端 flex-row (左右)，高度 h-svh 占满一屏。
      */}
      <div className="flex flex-col w-full min-h-[80svh] md:h-svh">
        {/* Banners Area */}
        <div className="flex w-full h-[50svh] md:h-[75%] overflow-hidden shrink-0">
          {/* Left Red Block */}
          <div
            ref={(el) => {
              if (el) LeftWindows.current[0] = el as HTMLDivElement;
            }}
            className="flex justify-center items-center flex-1 bg-[#cc2b2b] relative"
          >
            <Image
              src={"/homepage/homepage_banner_1.webp"}
              width={200}
              height={800}
              alt="Banner 1"
              // 手机端加大宽度比例，桌面端保持细腻
              className="w-[30vw] md:w-[15vw] h-auto object-contain drop-shadow-lg"
            />
          </div>
          {/* Right Background Block */}
          <div
            ref={(el) => {
              if (el) RightWindows.current[0] = el as HTMLDivElement;
            }}
            className="flex-1 flex justify-center items-center relative overflow-hidden"
          >
            {/* 建议：用 Image 组件做背景以获得更好的优化，这里保持你的写法但增加 relative 定位 */}
            <div className="absolute inset-0 bg-[url('/homepage/homepage_banner_3.webp')] bg-cover bg-center grayscale opacity-90" />
            <Image
              src={"/homepage/homepage_banner_2.webp"}
              width={200}
              height={800}
              alt="Banner 2"
              className="relative z-10 w-[30vw] md:w-[15vw] h-auto object-contain border-4 border-white shadow-xl"
            />
          </div>
        </div>

        {/* Text Area */}
        <div
          ref={(el) => {
            if (el) FadeInYs.current[0] = el as HTMLDivElement;
          }}
          className="flex flex-col justify-center md:justify-around flex-1 font-roboto px-6 py-10 md:py-0 md:px-0 z-10"
        >
          <div className="font-bold tracking-tighter -mt-30 md:-mt-15">
            {/* 响应式字体和行高 */}
            <h3 className="text-5xl md:text-9xl leading-none md:ml-20">
              {t.raw("branding_art_direction").title_line_1}
            </h3>
            {/* 手机端稍微缩进，桌面端大缩进 */}
            <h3 className="text-5xl md:text-9xl leading-none ml-8 md:ml-64 mt-2 md:mt-0">
              {t.raw("branding_art_direction").title_line_2}
            </h3>
          </div>
          {/* 描述文字 */}
          <div className="mt-8 md:mt-0 md:ml-80 text-sm md:text-base text-gray-600 font-medium">
            <p>{t.raw("branding_art_direction").content_line_1}</p>
            <p>{t.raw("branding_art_direction").content_line_2}</p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Packaging Design --- */}
      <div className="mt-10 w-full">
        <Image
          ref={(el) => {
            if (el) FadeInYs.current[1] = el as HTMLDivElement;
          }}
          src={"/homepage/homepage_banner_4.webp"}
          width={5000}
          height={3000}
          alt="Packaging Banner"
          className="w-full h-auto object-cover max-h-[60vh] md:max-h-full"
        />

        {/* Content Container */}
        <div className="px-5 md:mx-20 -mt-10 md:-mt-15 relative z-10">
          {/* Title Group */}
          <div
            ref={(el) => {
              if (el) FadeInYs.current[2] = el as HTMLDivElement;
            }}
            className="flex flex-col items-start md:items-end text-left md:text-right font-bold tracking-tighter"
          >
            {/* 手机端 text-6xl, 桌面端 text-9xl */}
            <h3 className="text-6xl md:text-9xl leading-[0.85]">
              {t.raw("packaging_design").title_line_1}
            </h3>
            <h3 className="text-5xl md:text-8xl leading-[0.85] text-[#333]">
              {t.raw("packaging_design").title_line_2}
            </h3>
          </div>

          {/* Description & Labels */}
          <div
            ref={(el) => {
              if (el) FadeInYs.current[3] = el as HTMLDivElement;
            }}
            className="mt-8 md:mt-5"
          >
            <h3 className="w-full md:w-[50%] text-sm md:text-md font-normal leading-relaxed text-gray-700">
              {t.raw("packaging_design").content}
            </h3>
            <h3 className="text-[#CC2B2B] w-full md:w-[60%] text-lg md:text-xl mt-3 md:mt-5 font-medium">
              {t.raw("packaging_design").labels}
            </h3>
          </div>

          {/* Swiper Component */}
          <div
            ref={(el) => {
              if (el) FadeInYs.current[4] = el as HTMLDivElement;
            }}
            className="mt-8"
          >
            <ImageSwiper />
          </div>
        </div>
      </div>

      {/* --- Section 3: Digital Experience & Influencer --- */}
      <div className="mt-20 flex flex-col gap-0 md:block">
        {/* Block A: Digital Experience */}
        <div
          ref={(el) => {
            if (el) RightWindows.current[1] = el as HTMLDivElement;
          }}
          className="flex flex-col-reverse md:flex-row w-full "
        >
          {/* Text Side */}
          <div className="lg:min-w-1/2 flex flex-col gap-6 md:gap-8 flex-1 justify-end px-6 py-10 md:px-20 md:pb-30 relative z-10 bg-[#f5f5f7]">
            <div>
              <p className="text-sm md:text-md font-medium">
                {t.raw("digital_experience").content}
              </p>
              <p className="text-[#CC2B2B] text-lg md:text-xl mt-2 font-bold">
                {t.raw("digital_experience").labels}
              </p>
            </div>

            <div className="font-black tracking-tighter leading-[0.9]">
              <h3 className="text-5xl md:text-9xl">
                {t.raw("digital_experience").title_line_1}
              </h3>
              {/* 手机端不需要巨大的左边距，改用 text-right 或者小边距 */}
              <h3 className="text-5xl md:text-9xl ml-10 md:ml-[20vw]">
                {t.raw("digital_experience").title_line_2}
              </h3>
            </div>
          </div>
          {/* Image Side */}
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:min-h-[80vh] lg:min-w-1/2">
            <Image
              src={"/homepage/digital_experience_1.webp"}
              width={3000}
              height={3000}
              alt="Digital Experience"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Block B: Influencer Marketing */}
        <div
          ref={(el) => {
            if (el) LeftWindows.current[1] = el as HTMLDivElement;
          }}
          className="flex flex-col md:flex-row w-full"
        >
          {/* Image Side (Mobile: Top, Desktop: Left) */}
          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:min-h-[80vh] lg:min-w-1/2">
            <Image
              src={"/homepage/digital_experience_2.webp"}
              width={3000}
              height={3000}
              alt="Influencer Marketing"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Text Side */}
          <div
            className={`
          lg:min-w-1/2 flex flex-col gap-6 md:gap-8 flex-1 justify-end px-6 py-10 md:px-25 relative z-10 bg-[#f5f5f7]
          md:-bottom-30
            `}
          >
            <div>
              <p className="text-sm md:text-md font-medium">
                {t.raw("influencer_marketing").content}
              </p>
              <p className="text-[#CC2B2B] text-lg md:text-xl mt-2 font-bold">
                {t.raw("influencer_marketing").labels}
              </p>
            </div>

            <div className="font-black tracking-tighter leading-[0.9]">
              <h3 className="text-5xl md:text-9xl">
                {t.raw("influencer_marketing").title_line_1}
              </h3>
              {/* 负 margin 在手机上非常危险，手机端取消负 margin */}
              <h3 className="text-5xl md:text-9xl md:-ml-[10vw] lg:-ml-[15vw] text-right md:text-left">
                {t.raw("influencer_marketing").title_line_2}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 4: Grid Images --- */}
      {/* 手机端 2列，桌面端 4列 */}
      <div
        ref={(el) => {
          if (el) FadeInYs.current[4] = el as HTMLDivElement;
        }}
        className="grid grid-cols-2 md:grid-cols-4 mt-20 md:mt-40 gap-1 md:gap-0 "
      >
        {[1, 2, 3, 1].map((num, i) => (
          <div key={i} className="relative aspect-square">
            <Image
              src={`/homepage/grid_image_${num}.webp`}
              width={1000}
              height={1000}
              alt={`Grid ${i}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <Logos />
    </div>
  );
};

export default Homepage;
