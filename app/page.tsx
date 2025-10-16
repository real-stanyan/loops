// app/page.tsx

import Header from "@/components/Header";
import GradualBlur from "@/components/GradualBlur";
import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import ContactUs from "@/components/ContactUs";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <Header />
      <div>
        {/* HERO */}
        <Hero />

        {/* BusinessCard */}
        <BusinessCard />

        {/* projects */}
        <Projects />

        {/* <ContactUs /> */}
      </div>

      {/* 全局底部渐隐 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[80]">
        <GradualBlur
          target="parent"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
        />
      </div>
    </main>
  );
}
