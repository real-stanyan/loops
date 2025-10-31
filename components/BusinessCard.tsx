"use client";

import { useRef } from "react";

// import icons
import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";

// import gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BusinessCard = () => {
  const FadeInYs = useRef<(HTMLDivElement | null)[]>([]);

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
    <div
      className={`
      grid grid-cols-2 xl:grid-cols-4 px-6 xl:px-10 py-8 xl:py-15 gap-6 
      md:gap-10 xl:gap-12 bg-white text-[rgb(29,29,31)]
    `}
    >
      {/* Brand Strategy & Market Insights */}
      <div
        className={`
        flex flex-col gap-4 border-[#dedede] border-2 p-4 md:p-6 xl:p-8 cursor-pointer 
        overflow-hidden h-[200px] md:h-[250px] xl:h-[350px] justify-center
        `}
        ref={(el) => {
          if (el) FadeInYs.current[0] = el as HTMLDivElement;
        }}
      >
        <MdInsights className="text-4xl mx-auto xl:mx-1" color="#1d1d1f" />
        <h1 className="font-black text-lg xl:text-xl text-center xl:text-left">
          Brand Strategy & <br /> Market Insights
        </h1>

        <p className="font-normal text-sm hidden xl:inline">
          We start with strategy — uncovering what makes your brand unique and
          how it connects with people. Our goal is to build brands with clarity,
          purpose, and long-term vision.
        </p>
      </div>

      {/* Creative Direction & Content Production */}
      <div
        className={`
        flex flex-col gap-4 border-[#dedede] border-2 p-4 md:p-6 xl:p-8 cursor-pointer 
        overflow-hidden h-[200px] md:h-[250px] xl:h-[350px] justify-center
        `}
        ref={(el) => {
          if (el) FadeInYs.current[1] = el as HTMLDivElement;
        }}
      >
        <LuTableOfContents
          className="text-4xl mx-auto xl:mx-1"
          color="#1d1d1f"
        />
        <h1 className=" font-black text-lg xl:text-xl text-center xl:text-left">
          Creative Direction & <br />
          Content Production
        </h1>

        <p className="font-normal text-sm hidden xl:inline">
          We bring strategy to life through creativity. From concept to
          execution, our creative work transforms ideas into experiences that
          move audiences.
        </p>
      </div>

      {/* Marketing, Media & Communications */}
      <div
        className={`
      flex flex-col gap-4 border-[#dedede] border-2 p-4 md:p-6 xl:p-8 cursor-pointer 
      overflow-hidden h-[200px] md:h-[250px] xl:h-[350px] justify-center
        `}
        ref={(el) => {
          if (el) FadeInYs.current[2] = el as HTMLDivElement;
        }}
      >
        <IoShareSocial className="text-4xl mx-auto xl:mx-1" color="#1d1d1f" />
        <h1 className=" font-black text-lg xl:text-xl text-center xl:text-left">
          Marketing, Media & <br />
          Communications
        </h1>
        <p className="font-normal text-sm hidden xl:inline">
          We amplify your brand through strategic communication and digital
          performance. Every message is guided by insight, every channel by
          purpose.
        </p>
      </div>

      {/* Brand Growth & Consulting */}
      <div
        className={`
      flex flex-col gap-4 border-[#dedede] border-2 p-4 md:p-6 xl:p-8 cursor-pointer 
      overflow-hidden h-[200px] md:h-[250px] xl:h-[350px] justify-center
        `}
        ref={(el) => {
          if (el) FadeInYs.current[3] = el as HTMLDivElement;
        }}
      >
        <IoIosRocket className="text-4xl mx-auto xl:mx-1" color="#1d1d1f" />
        <h1 className=" font-black text-lg xl:text-xl text-center xl:text-left">
          Brand Growth &<br /> Consulting
        </h1>
        <p className="font-normal text-sm hidden xl:inline">
          We believe in lasting partnerships. Beyond campaigns, we help brands
          evolve — ensuring creative consistency, strategic direction, and
          scalable growth.
        </p>
      </div>
    </div>
  );
};

export default BusinessCard;
