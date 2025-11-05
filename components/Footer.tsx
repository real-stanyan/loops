import React from "react";
import Image from "next/image";
import { MdInsights } from "react-icons/md";
import { LuTableOfContents } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { IoIosRocket } from "react-icons/io";
import { MdDesignServices, MdTrendingUp } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import Link from "next/link";

const Services = [
  {
    icon: MdInsights,
    name: "Brand Strategy & Market Insights",
    link: "/",
  },
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
  {
    icon: IoIosRocket,
    name: "Brand Growth & Consulting",
    link: "/",
  },
];

const SignatureService = [
  {
    icon: MdDesignServices,
    name: "Creative & Visual Design",
    link: "/",
  },
  {
    icon: MdTrendingUp,
    name: "Digital Marketing Strategy",
    link: "/",
  },
  {
    icon: IoPeopleOutline,
    name: "Social Media & Influencer Marketing",
    link: "/",
  },
];

const Others = [
  { name: "FAQ", link: "/" },
  { name: "Partnerships", link: "/" },
];

const Footer = () => {
  return (
    <>
      <div
        className={`
      bg-[#f5f5f7] text-[#1d1d1f] p-5 md:p-10 xl:p-20 flex justify-between items-start gap-10 lg:gap-20
      flex-col md:flex-row
        `}
      >
        <div className="flex flex-col justify-center items-center w-[40%] md:w-[20%] self-center">
          <Image
            src={"/logo_black.webp"}
            width={400}
            height={400}
            alt="logo"
            className="p-4"
          />
          <h3 className="uppercase font-black text-lg md:text-xl xl:text-2xl whitespace-nowrap">
            Loops Design Studio
          </h3>
        </div>
        <div className="flex flex-1 justify-evenly gap-4">
          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-black text-md md:text-xl xl:text-2xl uppercase">
              Services
            </h3>
            <div className="flex flex-col gap-2">
              {Services.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-2 cursor-pointer group"
                >
                  <item.icon
                    aria-hidden
                    className="text-2xl md:text-3xl text-[var(--decoration)]"
                  />
                  <span className="text-sm md:text-base group-hover:font-bold duration-200 ease-in-out transition-all">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Signature Service */}
          <div className="space-y-3">
            <h3 className="font-black text-md md:text-xl xl:text-2xl uppercase">
              Signature Service
            </h3>
            <div className="flex flex-col gap-2">
              {SignatureService.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-2 cursor-pointer group"
                >
                  <item.icon
                    aria-hidden
                    className="text-2xl md:text-3xl text-[var(--decoration)]"
                  />
                  <span className="text-sm md:text-base group-hover:font-bold duration-200 ease-in-out transition-all">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Others */}
          <div className="space-y-3 hidden md:block">
            <h3 className="font-black text-md md:text-xl xl:text-2xl uppercase">
              Others
            </h3>
            <div className="flex flex-col gap-2">
              {Others.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center gap-2 cursor-pointer group"
                >
                  <span className="text-sm md:text-base group-hover:font-bold duration-200 ease-in-out transition-all">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white flex justify-between items-center px-5 md:px-10 xl:px-20 py-3">
        <Link href={"/"} className="font-black text-sm">
          Privacy Policy
        </Link>
        <h3 className="text-xs">© Copyright Loops Design Studio 2025</h3>
      </div>
    </>
  );
};

export default Footer;
