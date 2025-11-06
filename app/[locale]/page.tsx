// app/page.tsx

import Hero from "@/components/Hero";
import BusinessCard from "@/components/BusinessCard";
import ContactUs from "@/components/ContactUs";
// import Projects from "@/components/Projects";
import SignatureServices from "@/components/SignatureServices";
import AboutUs from "@/components/AboutUs";
import Logos from "@/components/Logos";
import Projects from "@/components/Projects";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden">
      <Hero />

      <BusinessCard />

      <AboutUs />

      <SignatureServices />

      <Logos />

      <Projects />

      <ContactUs />
    </main>
  );
}
