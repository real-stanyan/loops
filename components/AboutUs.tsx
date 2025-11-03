import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div
          className={[
            "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
          ].join(" ")}
        >
          {/* Text */}
          <div className="space-y-6">
            <h2 className="font-black text-3xl sm:text-4xl tracking-tight uppercase">
              About <span className="text-[var(--decoration)]">Us</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-white/90 tracking-wide">
              <p>
                At{" "}
                <strong className="text-[var(--decoration)] font-black">
                  Loops Design Studio
                </strong>
                , we merge strategy, design, and technology to craft holistic
                brand experiences. From insight to execution, we partner with
                brands to define their identity, shape their presence, and
                communicate with clarity and purpose.
              </p>
              <p>
                From brand strategy to full-scale digital development, we create
                cohesive solutions that connect creativity with results —
                blending thoughtful design, clean code, and user-centric
                strategy to help brands stand out and grow with confidence.
              </p>
              <p>
                Our multidisciplinary team covers{" "}
                <strong className="text-[var(--decoration)] font-black">
                  visual design
                </strong>
                ,{" "}
                <strong className="text-[var(--decoration)] font-black">
                  web development
                </strong>
                ,{" "}
                <strong className="text-[var(--decoration)] font-black">
                  content creation
                </strong>
                ,{" "}
                <strong className="text-[var(--decoration)] font-black">
                  social media
                </strong>
                , and{" "}
                <strong className="text-[var(--decoration)] font-black">
                  digital marketing
                </strong>{" "}
                — delivering data-driven, performance-focused outcomes that
                elevate every touchpoint of a brand's journey.
              </p>
            </div>

            {/* Small highlights */}
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80">
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/5">
                Strategy-led
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Design-driven
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Technology-empowered
              </li>
              <li className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                Growth-focused
              </li>
            </ul>
          </div>

          {/* Image card */}
          <div
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
