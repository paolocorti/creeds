import { useState, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import SectionFooter from "./SectionFooter.jsx";
import Button from "./Button";
import { useWindowDimension, getVizWidth } from "./utils";
import React from "react";
import HowToRead from "./HowToRead";
import { siteUrl } from "../config";
import { isMobile, isSafari } from "react-device-detect";
import Loader from "./Loader";
import { ParentSize } from "@visx/responsive";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from "@react-hook/window-size/throttled";

const Section2 = ({
  data,
  energyDemand,
  nextChapter,
  fullscreen = false,
  scrolling,
}) => {
  console.log("Section2 render");

  if (data.length === 0) {
    return <></>;
  }

  const [open, setHowToReadOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  // const size = isMobile ? 600 : useWindowDimension();
  // //const width = useWindowWidth();
  // const vizWidth = getVizWidth("trend", size);
  const [allowEvents, setAllowEvents] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  return (
    <section
      name="section2"
      className="w-full flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn>
          <h2 className="subtitle">
            Unpacking <br /> peaks
          </h2>
          <p>
            We have established by now that the energy demand patterns observed
            throughout the day are a direct consequence of what people do. But
            if we are to provide further insights into any of the issues around
            the flexibility of demand for energy, we need to have a very
            detailed knowledge of what happens during the most problematic
            periods. That is, when peaks in demand occur.
            <br /> <br /> The impact of “smart” tariffs and controls largely
            depends on whether there is, in fact, scope for shifting the timing
            of what people do, and for changing the rhythm of demand during
            peaks.
            <br /> <br />
            Questions about these issues revolve around how activities generate
            patterns of demand at peak time, focusing on questions of why, where
            and when. Unpacking peaks is inextricably related to providing
            answers to these questions.
          </p>
        </LeftColumn>
      )}
      <RightColumn fullscreen={fullscreen}>
        <div
          className="w-full flex flex-col items-center "
          style={{
            pointerEvents: scrolling ? "none" : "all",
          }}
        >
          <div className="flex w-full flex-col items-start mb-8">
            {/* <p className="text-left mb-1 mt-0">
              The graphic shows the activities’ frequency every 10 minutes.
            </p> */}
            <div className="text-xs uppercase text-left mb-2">
              MOUSE OVER ON THE GRAPHIC TO READ THE DATA.
            </div>
            <div
              className="flex justify-start"
              onClick={() => setHowToReadOpen((open) => !open)}
            >
              <Button title="HOW TO READ THE GRAPHIC" callback={null} />
            </div>
          </div>
          {!allowEvents && (
            <div className="w-full h-96 flex justify-center items-center relative ">
              <Loader style={{ width: "100px" }} />
              <div className="text-xs absolute top-0 bottom-0 left-0 right-0 m-auto h-4">
                LOADING
              </div>
            </div>
          )}
          <ParentSize>
            {(parent) => (
              <TrendYear
                globalData={data}
                energyDemand={energyDemand}
                selectedRegion={selectedRegion}
                selectedMonth={selectedMonth}
                width={parent.width}
              />
            )}
          </ParentSize>

          {!fullscreen && (
            <SectionFooter
              nextChapter={nextChapter}
              link={`${siteUrl}/unpacking_peaks`}
            />
          )}
        </div>
        {mobile && (
          <HowToRead
            text={""}
            image={"/legend-2.png"}
            readOpen={open}
            setHowToReadOpen={setHowToReadOpen}
          />
        )}
      </RightColumn>
      {!mobile && (
        <HowToRead
          text={""}
          image={"/legend-2.png"}
          readOpen={open}
          setHowToReadOpen={setHowToReadOpen}
        />
      )}
    </section>
  );
};

export default React.memo(Section2);
