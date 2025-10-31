// app/page.tsx

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import ContactUs from "@/components/ContactUs";
// import Projects from "@/components/Projects";
import SignatureServices from "@/components/SignatureServices";
import AboutUs from "@/components/AboutUs";
import Logos from "@/components/Logos";

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <Header />
      <div>
        {/* HERO */}
        <Hero />

        {/* BusinessCard */}
        <BusinessCard />

        <AboutUs />

        <SignatureServices />

        <Logos />

        {/* projects */}
        {/* <Projects /> */}

        <ContactUs />
      </div>
    </main>
  );
}
