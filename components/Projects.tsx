import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CodeXml } from "lucide-react";
import CardSwap, { Card } from "@/components/CardSwap";

const Projects = () => {
  return (
    <section className="mx-auto w-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="relative overflow-hidden">
        {/* 关键：overflow-hidden */}
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          <Card>
            <Link href={"https://www.fujisushi.com.au/"} target="_blank">
              {/* title */}
              <div className="relative z-10 flex items-center gap-2 p-2 border-b-2 border-white/20 bg-black/60">
                <CodeXml size={20} />
                <h1>www.fujisushi.com.au</h1>
              </div>

              {/* image */}
              <div className="relative aspect-video overflow-hidden w-full h-full">
                <Image
                  src="/projects/fujisushi.webp"
                  alt="fujisushi"
                  fill
                  className="object-fill"
                />
              </div>
            </Link>
          </Card>
          <Card>
            <Link href={"https://www.grantedbeauty.com.au/"} target="_blank">
              {/* title */}
              <div className="relative z-10 flex items-center gap-2 p-2 border-b-2 border-white/20 bg-black/60">
                <CodeXml size={20} />
                <h1>www.grantedbeauty.com.au</h1>
              </div>

              {/* image */}
              <div className="relative aspect-video overflow-hidden w-full h-full">
                <Image
                  src="/projects/granted.webp"
                  alt="granted"
                  fill
                  className="object-fill"
                />
              </div>
            </Link>
          </Card>
        </CardSwap>
      </div>
    </section>
  );
};

export default Projects;
