import React from "react";
import Image from "next/image";

export interface GlassIconsItem {
  imageSrc: string;
  imageAlt?: string;
  label: string;
  customClass?: string;
}
export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  return (
    <div
      className={`px-4 md:px-40 py-30 grid gap-10 sm:gap-12 grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 mx-auto py-12 space-y-20 ${className || ""}`}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          aria-label={item.label}
          className={`relative mx-auto bg-transparent outline-none w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 [perspective:32em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
            item.customClass || ""
          }`}
        >
          {/* 背板 */}
          <span
            className="absolute inset-0 rounded-2xl block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[12deg] group-hover:[transform:rotate(18deg)_translate3d(-0.75rem,-0.75rem,0.75rem)]"
            style={{
              background:
                "linear-gradient(180deg, hsla(0,0%,100%,0.35), hsla(0,0%,100%,0.15))",
              boxShadow: "0.75rem -0.75rem 1rem hsla(223, 10%, 10%, 0.12)",
            }}
          />

          {/* 玻璃层 + 图片 */}
          <span
            className="absolute inset-0 rounded-2xl bg-[hsla(0,0%,100%,0.12)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] group-hover:[transform:translateZ(2.25rem)]"
            style={{ boxShadow: "0 0 0 0.12rem hsla(0, 0%, 100%, 0.28) inset" }}
          >
            <span
              className="m-auto w-[80%] h-[80%] flex items-center justify-center"
              aria-hidden="true"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt || item.label}
                width={256}
                height={256}
                className="w-full h-full object-contain"
                sizes="(max-width:640px) 35vw, (max-width:1024px) 20vw, 12vw"
                priority={i < 4}
              />
            </span>
          </span>

          {/* 标签 */}
          <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-sm md:text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
