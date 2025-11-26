// app/page.tsx

import Hero from "@/components/Hero";
import ContactUs from "@/components/ContactUs";
import Homepage from "@/components/Homepage";

export default function Page() {
  return (
    <main>
      <Hero />

      <Homepage />

      <ContactUs />
    </main>
  );
}
