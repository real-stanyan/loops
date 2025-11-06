"use client";

import { useRef } from "react";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const t = useTranslations("AboutUs");
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
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div
          className={[
            "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
          ].join(" ")}
        >
          {/* Text */}
          <div
            className="space-y-6"
            ref={(el) => {
              if (el) FadeInYs.current[0] = el as HTMLDivElement;
            }}
          >
            <h2 className="font-black text-3xl sm:text-4xl tracking-tight uppercase">
              {t("title")}{" "}
              <span className="text-[var(--decoration)]">{t("sub_title")}</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-white/90 tracking-wide">
              <p>{t.raw("content")[0]}</p>
              <p>{t.raw("content")[1]}</p>
              <p>{t.raw("content")[2]}</p>
            </div>

            {/* Small highlights */}
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/5">
                {t.raw("highlights")[0]}
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                {t.raw("highlights")[1]}
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                {t.raw("highlights")[2]}
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                {t.raw("highlights")[3]}
              </li>
            </ul>
          </div>

          {/* Image card */}
          <div
            ref={(el) => {
              if (el) FadeInYs.current[1] = el as HTMLDivElement;
            }}
            className={[
              "relative isolate overflow-hidden",
              "rounded-3xl p-[1px]",
              // gradient ring
              "bg-[conic-gradient(from_140deg_at_50%_50%,_var(--decoration),_transparent_25%,_transparent_75%,_var(--decoration))]",
            ].join(" ")}
          >
            <div className="rounded-3xl bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-black/30">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/aboutus/About_Us.webp"
                  alt="Our team crafting modern digital experiences"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* soft glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-40 bg-[radial-gradient(50%_50%_at_50%_0%,_var(--decoration),_transparent)]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
