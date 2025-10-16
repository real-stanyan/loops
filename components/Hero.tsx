"use client";

import React from "react";
import Plasma from "@/components/Plasma";
import TextType from "@/components/TextType";
import { useBreakpoint } from "@/utils/BreakpointBadge";

const Hero = () => {
  const bp = useBreakpoint();
  const SCALE: Record<string, number> = {
    base: 1.0,
    sm: 0.5,
    md: 0.7,
    lg: 1,
    xl: 1.2,
  };

  console.log(bp);
  return (
    <section
      aria-label="Hero"
      className="relative w-full h-[100svh] overflow-hidden"
    >
      <Plasma
        color="#ff6b35"
        speed={0.6}
        direction="forward"
        scale={SCALE[bp] ?? 1.0}
        opacity={0.8}
        mouseInteractive
      />

      <TextType
        text={[
          "GRAPHIC/WEB DESIGN AND BUILDING",
          "CONTENT CREATION",
          "SOCIAL MEDIA MANAGEMENT",
          "DIGITAL MARKETING",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="|"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-[60] grid place-items-center text-center font-mono font-black text-4xl md:text-5xl xl:text-6xl"
      />
    </section>
  );
};

export default Hero;
