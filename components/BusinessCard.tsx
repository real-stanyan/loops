"use client";

import React, { useEffect, useState } from "react";
import SpotlightCard from "@/components/SpotlightCard";
import { useBreakpoint } from "@/utils/BreakpointBadge";
import {
  CodeXml,
  TextAlignStart,
  CircleFadingPlus,
  Rocket,
} from "lucide-react";

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
      {/* GRAPHIC/WEB DESIGN AND BUILDING */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <CodeXml size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-2xl tracking-wide">
          GRAPHIC/WEB DESIGN AND BUILDING
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          Comprehensive graphic and web design service — from visual identity to
          fully built websites, combining creative aesthetics with functional,
          responsive, and user-focused development to strengthen your brand
          presence online.
        </p>
      </SpotlightCard>

      {/* CONTENT CREATION */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <TextAlignStart size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-2xl tracking-wide">
          CONTENT CREATION
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          Creating engaging, brand-aligned content across visual, written, and
          digital formats — from product photography and social posts to
          copywriting and multimedia storytelling — designed to capture
          attention and communicate your message effectively.
        </p>
      </SpotlightCard>

      {/* SOCIAL MEDIA MANAGEMENT */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <CircleFadingPlus size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-2xl tracking-wide">
          SOCIAL MEDIA MANAGEMENT
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          Managing and growing your social presence through strategy, content
          scheduling, audience engagement, and analytics — ensuring consistent
          brand voice, higher reach, and measurable results across all major
          platforms.
        </p>
      </SpotlightCard>

      {/* DIGITAL MARKETING */}
      <SpotlightCard
        className="custom-spotlight-card flex flex-col gap-4"
        spotlightColor="rgba(255, 107, 53, 0.2)"
      >
        <Rocket size={iconSize} />
        <h1 className="font-mono font-black text-lg xl:text-2xl tracking-wide">
          DIGITAL MARKETING
        </h1>
        <p className="font-light text-gray-400 text-sm hidden xl:inline">
          Driving measurable growth through data-driven digital campaigns —
          combining SEO, paid advertising, email marketing, and analytics to
          increase visibility, attract the right audience, and convert
          engagement into lasting customer relationships.
        </p>
      </SpotlightCard>
    </div>
  );
};

export default BusinessCard;
