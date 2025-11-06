"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import { MdDesignServices, MdTrendingUp } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ---------- 图标映射：字符串 -> 组件 ---------- */
const ICONS = {
  MdDesignServices,
  MdTrendingUp,
  IoPeopleOutline,
} as const;

type RawListItem = { title: string; content: string };
type RawCard = {
  icon?: string;
  title: string;
  content: string; // 作为 intro
  list?: RawListItem[];
};

type CardProps = {
  Icon?: IconType;
  title: string;
  intro: string;
  points: string[];
};

const toIcon = (name?: string): IconType | undefined => {
  if (!name) return undefined;
  return (ICONS as Record<string, IconType>)[name];
};

/** 单块：标题/描述/要点列表，含进场与悬浮动效 */
const SectionItem = ({ Icon, title, intro, points }: CardProps) => {
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
          p-4 md:p-6 xl:p-8 grid grid-rows-[auto_auto_1fr] gap-4 group
        `}
      >
        <div className="flex items-start gap-3 xl:min-h-[48px]">
          {Icon && (
            <Icon className="text-4xl shrink-0 text-[var(--decoration)] group-hover:animate-bounce" />
          )}
          <h3 className="font-black text-lg md:text-xl leading-snug line-clamp-3">
            {title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-black/80 leading-relaxed line-clamp-2 xl:min-h-[48px]">
          {intro}
        </p>

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
  const t = useTranslations("SignatureServices");
  const raw = t.raw("card") as RawCard[];

  const items: CardProps[] = raw.map((it) => ({
    Icon: toIcon(it.icon),
    title: it.title,
    intro: it.content,
    points: (it.list ?? []).map((li) =>
      li.title ? `${li.title} — ${li.content}` : li.content
    ),
  }));

  return (
    <section className="bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-7xl px-6 xl:px-10 py-10 xl:py-16">
        <h2 className="mb-8 font-black text-3xl sm:text-4xl text-center uppercase">
          {t("title")}
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
