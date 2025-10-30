import React from "react";
import MagicBento from "./MagicBento";

const OurServices = () => {
  return (
    <div>
      <h3 className="uppercase text-center font-mono font-black text-3xl sm:text-4xl">
        Our Service
      </h3>
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="255, 107, 53"
      />
    </div>
  );
};

export default OurServices;
