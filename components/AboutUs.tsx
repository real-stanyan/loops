import React from "react";

const AboutUs = () => {
  return (
    <div className="flex p-40 gap-8">
      <div className="flex flex-1 flex-col gap-4">
        <h2 className="font-mono font-black text-4xl">
          About <span className="text-[var(--decoration)]">Us</span>
        </h2>
        <div className="space-y-2 font-semibold text-lg">
          <p>
            We are a creative design and development studio focused on crafting
            modern, high-performing digital experiences.
          </p>
          <p>
            From brand identity to full-scale websites, we merge aesthetics with
            technology — blending thoughtful design, clean code, and user-first
            strategy to help brands stand out and grow online.
          </p>
          <p>
            Our multidisciplinary team covers every step —{" "}
            <span className="text-[var(--decoration)]">visual design</span>,{" "}
            <span className="text-[var(--decoration)]">web development</span>,{" "}
            <span className="text-[var(--decoration)]">content creation</span>,{" "}
            <span className="text-[var(--decoration)]">social media</span>, and{" "}
            <span className="text-[var(--decoration)]">digital marketing</span>{" "}
            — delivering cohesive, data-driven solutions that connect creativity
            with results.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div className="border flex justify-center items-center w-full h-full text-3xl">
          找图
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
