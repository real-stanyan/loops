"use client";

import { useRef } from "react";
import Link from "next/link";
import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import type { IconType } from "react-icons";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const CardItem = ({
  Icon,
  titleLines,
  desc,
  href,
}: {
  Icon: IconType;
  titleLines: [string, string] | [string];
  desc: string;
  href: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
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
    <div ref={ref}>
      <div
        className="
      relative flex flex-col gap-4 border-[#dedede] border-2 p-4 md:p-6 xl:p-8
      cursor-pointer overflow-hidden h-[200px] md:h-[250px] xl:h-[350px]
      justify-center xl:justify-start rounded
      transform-gpu will-change-transform transition-transform duration-300
      xl:hover:scale-105 hover:z-10 bg-white group
    "
      >
        <Icon
          className={`
          text-4xl mx-auto xl:mx-1 text-[var(--decoration)] 
          group-hover:animate-bounce
          `}
        />
        <h1 className="font-black text-lg xl:text-xl text-center xl:text-left">
          {titleLines[0]}
          {titleLines[1] && (
            <>
              <br />
              {titleLines[1]}
            </>
          )}
        </h1>
        <p className="font-normal text-sm hidden xl:inline">{desc}</p>
        <Link
          href={href}
          className="
        text-black/60 text-sm hover:text-[var(--decoration)] transition-colors
        duration-200 ease-in-out hidden xl:block xl:mt-auto uppercase
      "
        >
          read more
        </Link>
      </div>
    </div>
  );
};

const BusinessCard = () => {
  const items: Array<{
    Icon: IconType;
    titleLines: [string, string] | [string];
    desc: string;
    href: string;
  }> = [
    {
      Icon: MdInsights,
      titleLines: ["Brand Strategy &", "Market Insights"],
      desc: "We start with strategy — uncovering what makes your brand unique and how it connects with people. Our goal is to build brands with clarity, purpose, and long-term vision.",
      href: "/",
    },
    {
      Icon: LuTableOfContents,
      titleLines: ["Creative Direction &", "Content Production"],
      desc: "We bring strategy to life through creativity. From concept to execution, our creative work transforms ideas into experiences that move audiences.",
      href: "/",
    },
    {
      Icon: IoShareSocial,
      titleLines: ["Marketing, Media &", "Communications"],
      desc: "We amplify your brand through strategic communication and digital performance. Every message is guided by insight, every channel by purpose.",
      href: "/",
    },
    {
      Icon: IoIosRocket,
      titleLines: ["Brand Growth &", "Consulting"],
      desc: "We believe in lasting partnerships. Beyond campaigns, we help brands evolve — ensuring creative consistency, strategic direction, and scalable growth.",
      href: "/",
    },
  ];

  return (
    <div
      className={`
      grid grid-cols-2 xl:grid-cols-4 px-6 xl:px-10 py-8 xl:py-15 gap-6 md:gap-10 
      xl:gap-12 bg-[#f5f5f7] text-[#1d1d1f]
    `}
    >
      {items.map((it, i) => (
        <CardItem key={i} {...it} />
      ))}
    </div>
  );
};

export default BusinessCard;
