// app/page.tsx

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import ContactUs from "@/components/ContactUs";
// import Projects from "@/components/Projects";
import OurServices from "@/components/OurServices";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <Header />
      <div>
        {/* HERO */}
        <Hero />

        {/* BusinessCard */}
        <BusinessCard />

        {/* <AboutUs /> */}

        <OurServices />

        {/* projects */}
        {/* <Projects /> */}

        <ContactUs />
      </div>
    </main>
  );
}
