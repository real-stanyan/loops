"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderNavPC from "./HeaderNavPC";
import HeaderNavPE from "./HeaderNavPE";

import { IoHomeSharp } from "react-icons/io5";
import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { FaQuestionCircle } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdDesignServices, MdTrendingUp } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

const navs = [
  { icon: IoHomeSharp, name: "Home", link: "/" },
  { icon: FaPeopleGroup, name: "Partnerships", link: "/partnerships" },
  { icon: FaQuestionCircle, name: "FAQs", link: "/faqs" },
  {
    groupName: "Service",
    items: [
      { icon: MdInsights, name: "Brand Strategy & Market Insights", link: "/" },
      {
        icon: LuTableOfContents,
        name: "Creative Direction & Content Production",
        link: "/",
      },
      {
        icon: IoShareSocial,
        name: "Marketing, Media & Communications",
        link: "/",
      },
      { icon: IoIosRocket, name: "Digital Marketing Strategy", link: "/" },
    ],
  },
  {
    groupName: "Signature Service",
    items: [
      { icon: MdDesignServices, name: "Creative & Visual Design", link: "/" },
      { icon: MdTrendingUp, name: "Digital Marketing Strategy", link: "/" },
      {
        icon: IoPeopleOutline,
        name: "Social Media & Influencer Marketing",
        link: "/",
      },
    ],
  },
];

import Link from "next/link";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex justify-center pt-5 xl:pt-10 px-4">
      <div
        className={[
          "w-full max-w-5xl h-16 rounded-full px-5 sm:px-6",
          "flex items-center justify-between",
          "backdrop-blur-2xl backdrop-saturate-150",
          "bg-black/45 supports-[backdrop-filter]:bg-black/55",
          "border border-white/15 shadow-[0_1px_0_0_rgba(255,255,255,0.12)]",
          scrolled ? "shadow-xl" : "shadow-lg",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-3 cursor-target">
          <div className="group relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="loops logo"
              fill
              priority
              sizes="(min-width: 1280px) 96px, 80px"
              className="object-contain p-0.5 select-none"
              draggable={false}
            />
          </div>

          <span className=" font-semibold text-white/90">
            LOOPS DESIGN STUDIO
          </span>
        </Link>
        <HeaderNavPC />
        <div className="absolute right-6 top-6">
          <HeaderNavPE
            navs={navs}
            position="right"
            colors={["#ff6b3580", "#ff6b35"]}
            menuButtonColor="#f5f5f7"
            openMenuButtonColor="#1d1d1f"
            accentColor="#ff6b35"
            changeMenuColorOnOpen
            lockScrollOnOpen
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
