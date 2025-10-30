"use client";

import React, { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import { useBreakpoint } from "@/utils/BreakpointBadge";
import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";

const DEFAULT_SIZE = 30; // SSR-safe

const SIZE: Record<string, number> = {
  base: 30,
  sm: 20,
  md: 30,
  lg: 30,
  xl: 40,
};

const BusinessCard = () => {
  const bp = useBreakpoint();

  // 保证首屏(SSR/水合)一致，挂载后再更新
  const [iconSize, setIconSize] = useState<number>(DEFAULT_SIZE);
  useEffect(() => {
    setIconSize(SIZE[bp] ?? DEFAULT_SIZE);
  }, [bp]);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 px-4 xl:px-8 gap-4 -translate-y-10">
      {/* Brand Strategy & Market Insights */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4 cursor-target"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <MdInsights size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-xl">
          Brand Strategy & Market Insights
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          We start with strategy — uncovering what makes your brand unique and
          how it connects with people. Our goal is to build brands with clarity,
          purpose, and long-term vision.
        </p>
      </SpotlightCard>

      {/* Creative Direction & Content Production */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4 cursor-target"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <LuTableOfContents size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-xl">
          Creative Direction & Content Production
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          We bring strategy to life through creativity. From concept to
          execution, our creative work transforms ideas into experiences that
          move audiences.
        </p>
      </SpotlightCard>

      {/* Marketing, Media & Communications */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4 cursor-target"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <IoShareSocial size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-xl">
          Marketing, Media & Communications
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          We amplify your brand through strategic communication and digital
          performance. Every message is guided by insight, every channel by
          purpose.
        </p>
      </SpotlightCard>

      {/* Brand Growth & Consulting */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4 cursor-target"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <IoIosRocket size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-xl">
          Brand Growth & Consulting
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          We believe in lasting partnerships. Beyond campaigns, we help brands
          evolve — ensuring creative consistency, strategic direction, and
          scalable growth.
        </p>
      </SpotlightCard>
    </div>
  );
};

export default BusinessCard;
