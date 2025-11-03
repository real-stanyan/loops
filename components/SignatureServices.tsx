"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { MdDesignServices, MdTrendingUp } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** 单块：标题/描述/要点列表，含进场与悬浮动效 */
const SectionItem = ({
  Icon,
  title,
  intro,
  points,
}: {
  Icon: IconType;
  title: string;
  intro: string;
  points: string[];
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="h-full">
      <div
        className={`
      relative h-full rounded border-2 border-[#dedede] bg-white text-[#1d1d1f]
      transform-gpu transition-transform duration-300 hover:scale-[1.02] hover:z-10
      p-4 md:p-6 xl:p-8 grid grid-rows-[auto_auto_1fr] gap-4
      `}
      >
        {/* 行1：标题（含图标）— 固定高度，最多2行 */}
        <div className="flex items-start gap-3 xl:min-h-[48px]">
          <Icon className="text-4xl shrink-0 text-[var(--decoration)]" />
          <h3 className="font-black text-lg md:text-xl leading-snug line-clamp-2">
            {title}
          </h3>
        </div>

        {/* 行2：引言 — 固定高度，截断到2行 */}
        <p className="text-sm md:text-base text-black/80 leading-relaxed line-clamp-2 xl:min-h-[48px]">
          {intro}
        </p>

        {/* 行3：要点列表 — 占满剩余空间，列表起点自然与其它卡对齐 */}
        <ul className="space-y-2 text-sm md:text-base list-disc pl-5 overflow-hidden">
          {points.map((p, i) => (
            <li key={i} className="leading-relaxed">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SignatureServices = () => {
  const items: Array<{
    Icon: IconType;
    title: string;
    intro: string;
    points: string[];
  }> = [
    {
      Icon: MdDesignServices,
      title: "Creative & Visual Design",
      intro:
        "At Loops Design Studio, we believe strong visuals shape perception and emotion. We turn ideas into timeless design experiences.",
      points: [
        "Brand Visual Identity Design - cohesive brand systems with thoughtful logos, typography, and color harmony.",
        "Website Design & Development - elegant, user-focused sites that blend aesthetic and function.",
        "Packaging Design - details that elevate product story and shelf appeal.",
        "Product Photography - refined composition and lighting to inspire and convert.",
      ],
    },
    {
      Icon: MdTrendingUp,
      title: "Digital Marketing Strategy",
      intro:
        "We connect creativity with performance to help brands grow smarter, stronger, and faster online.",
      points: [
        "SEO Strategy - tailored plans to improve visibility and organic reach.",
        "Google & Meta Advertising - end-to-end campaign creation and optimization for measurable ROI.",
        "Conversion Rate Optimization (CRO) - data-driven testing to increase conversions and AOV.",
      ],
    },
    {
      Icon: IoPeopleOutline,
      title: "Social Media & Influencer Marketing",
      intro:
        "We tell stories that resonate and build authentic relationships through strategy, creativity, and collaboration.",
      points: [
        "Social Media Marketing - narratives that strengthen community and drive interaction.",
        "Influencer Marketing Service - partner with the right creators for results-driven collaborations.",
        "Content Creation - on-brand visuals and copy that inspire action.",
      ],
    },
  ];

  return (
    <section className="bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl px-6 xl:px-10 py-10 xl:py-16">
        <h2
          className={`
          mb-8  font-black text-3xl sm:text-4xl text-center uppercase
          `}
        >
          Signature Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
          {items.map((it, i) => (
            <SectionItem key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureServices;
