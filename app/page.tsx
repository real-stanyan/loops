import Plasma from "@/components/Plasma";
import TextType from "@/components/TextType";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Header />

      <Plasma
        color="#ff6b35"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={0.8}
        mouseInteractive={true}
      />

      <TextType
        text={[
          "GRAPHIC/WEB DESIGN AND BUILDING",
          "CONTENT CREATION",
          "SOCIAL MEDIA MANAGEMENT",
          "DIGITAL MARKETING",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        className={`
          fixed top-[50vh] inset-0 z-[60] grid place-items-center text-center
           pointer-events-none text-4xl md:text-5xl xl:text-6xl font-mono font-black
          `}
      />
    </div>
  );
}
