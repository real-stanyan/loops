import React from "react";
import LogoLoop from "./LogoLoop";
import { getTranslations } from "next-intl/server";

const imageLogos = [
  {
    src: "/logos/clarins.webp",
    alt: "clarins",
    href: "https://www.clarins.com.au/",
  },
  {
    src: "/logos/EL.webp",
    alt: "esteelauder",
    href: "https://www.esteelauder.com.au/",
  },
  {
    src: "/logos/Jurlique.webp",
    alt: "Jurlique",
    href: "https://www.esteelauder.com.au/",
  },
  {
    src: "/logos/lancome.webp",
    alt: "lancome",
    href: "https://www.lancome.com.au/",
  },
  {
    src: "/logos/loreal.webp",
    alt: "loreal",
    href: "https://www.lorealparis.com.au/",
  },
  {
    src: "/logos/NYX.webp",
    alt: "NYX",
    href: "https://www.nyxcosmetics.com.au/",
  },
  {
    src: "/logos/ysl.webp",
    alt: "YSL",
    href: "https://www.ysl.com/en-au",
  },
  {
    src: "/logos/granted.webp",
    alt: "granted",
    href: "https://www.grantedbeauty.com.au/",
  },
  {
    src: "/logos/morimoon.webp",
    alt: "morimoon",
    href: "https://www.morimoon.com.au/",
  },
];

const Logos = async () => {
  const t = await getTranslations("Partnerships");
  return (
    <div className="h-[200px] relative overflow-hidden my-[100px]">
      <h3 className="uppercase text-center font-black text-xl md:text-2xl xl:text-3xl mb-6">
        {t("title")}
      </h3>
      <LogoLoop
        logos={imageLogos}
        speed={120}
        direction="left"
        logoHeight={120}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000"
        ariaLabel="partners"
      />
    </div>
  );
};

export default Logos;
