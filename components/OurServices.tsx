import React from "react";

// import Services
import GraphicDesignCarousel from "./Services/GraphicDesignCarousel";
import ContentCreationCarousel from "./Services/ContentCreationCarousel";
import SocalMediaManagementCarousel from "./Services/SocalMediaManagementCarousel";
import DigitalMarketingCarousel from "./Services/DigitalMarketingCarousel";

const OurServices = () => {
  return (
    <div className="px-8">
      <div className="border-neutral-800 bg-neutral-900 rounded-3xl p-8">
        <h1 className="text-center font-mono font-black text-3xl">
          Our Services
        </h1>
        <div
          className={` 
            rounded-3xl mt-8 grid grid-cols-4
            `}
        >
          <div className="cursor-target flex justify-center">
            <GraphicDesignCarousel
              baseWidth={400}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
            />
          </div>
          <div className="cursor-target flex justify-center">
            <ContentCreationCarousel
              baseWidth={400}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
            />
          </div>
          <div className="cursor-target flex justify-center">
            <SocalMediaManagementCarousel
              baseWidth={400}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
            />
          </div>
          <div className="cursor-target flex justify-center">
            <DigitalMarketingCarousel
              baseWidth={400}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={false}
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
