import React from "react";
import { isMobile } from "react-device-detect";
import LandingCircles from "./LandingCircles";
import LandingCirclesMobile from "./LandingCirclesMobile";

const Landing = ({ nextChapter }) => {
  console.log("Landing render", isMobile);

  return (
    <section className="w-full bg-green flex flex-col justify-center items-center h-screen border-b border-black relative overflow-hidden">
      {/* {isMobile ? <LandingCirclesMobile /> : <LandingCircles />} */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 m-auto h-96">
        <h1 className="px-8 md:px-36 text-center">
          Energy demand flexibility
          <br /> and the rhythms of <br />
          everyday life
        </h1>
        <div className="flex justify-center mt-16">
          <div
            className="border rounded-2xl z-40 px-4 py-1 cursor-pointer bg-green hover:bg-black hover:text-green"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              lineHeight: 1.5,
            }}
            onClick={nextChapter}
          >
            START ↓
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Landing);
