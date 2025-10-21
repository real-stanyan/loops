"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Infinity } from "lucide-react";
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
          // darker glass
          "backdrop-blur-2xl backdrop-saturate-150",
          "bg-black/45 supports-[backdrop-filter]:bg-black/55",
          // border + subtle inner highlight
          "border border-white/15 shadow-[0_1px_0_0_rgba(255,255,255,0.12)]",
          scrolled ? "shadow-xl" : "shadow-lg",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="loops home"
            className="group relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden"
          >
            <Image
              src="/logo.webp"
              alt="loops logo"
              fill
              priority
              sizes="(min-width: 1280px) 96px, 80px"
              className="object-contain p-0.5 select-none"
              draggable={false}
            />
          </Link>

          <span className="font-mono font-semibold text-white/90">
            LOOPS DESIGN STUDIO
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a className="font-medium text-white/90 hover:text-white" href="#">
            Home
          </a>
          <a className="font-medium text-white/90 hover:text-white" href="#">
            Docs
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
