import React from "react";
import Image from "next/image";
import GlassIcons from "@/components/GlassIcons";

const page = () => {
  return (
    <div className="pt-30 md:pt-40 xl:pt-50 min-h-[100vh]">
      <h1 className="text-center uppercase text-4xl font-black">
        COLLABORATIONS & PARTNERSHIPS
      </h1>
      <GlassIcons
        items={[
          { imageSrc: "/logos/clarins.webp", label: "Clarins" },
          { imageSrc: "/logos/EL.webp", label: "EL" },
          {
            imageSrc: "/logos/Jurlique.webp",
            label: "Jurlique",
          },
          {
            imageSrc: "/logos/lancome.webp",
            label: "lancome",
          },
          { imageSrc: "/logos/loreal.webp", label: "loreal" },
          { imageSrc: "/logos/NYX.webp", label: "NYX" },
          { imageSrc: "/logos/ysl.webp", label: "YSL" },
        ]}
      />
    </div>
  );
};

export default page;
