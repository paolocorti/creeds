import { useState, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import SectionFooter from "./SectionFooter.jsx";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";
import React from "react";
import Loader from "./Loader";
import { siteUrl } from "../config";

const Section2 = ({
  data,
  energyDemand,
  nextChapter,
  previousChapter,
  fullscreen = false,
  scrolling,
}) => {
  console.log("Section2 render");
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion, setSelCompareRegion] = useState([
    "london",
    "south_east",
  ]);
  const size = useWindowSize();
  const vizWidth = getVizWidth("trend", size);
  const [allowEvents, setAllowEvents] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAllowEvents(true);
    }, 1500);
  }, []);

  return (
    <section
      name="section2"
      className="w-full flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn>
          <h2 className="subtitle">Unpacking peaks</h2>
          <p>
            We have established by now that the energy demand patterns observed
            throughout the day are a direct consequence of what people do. But
            if we are to provide further insights into any of the issues around
            the flexibility of demand for energy, we need to have a very
            detailed knowledge of what happens during the most problematic
            periods. That is, when peaks in demand occur.
            <br /> The impact of “smart” tariffs and controls largely depends on
            whether there is, in fact, scope for shifting the timing of what
            people do, and for changing the rhythm of demand during peaks.
            <br />
            Questions about these issues revolve around how activities generate
            patterns of demand at peak time, focusing on questions of why, where
            and when.
            <br /> Unpacking peaks is inextricably related to providing answers
            to these questions.
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
          <div className="flex w-full flex-col items-start mb-4">
            <p className="text-left mb-1 mt-0">
              The graphic shows the activities’ frequency every 10 minutes.
            </p>
            <div className="text-xs font-light uppercase text-left mb-2">
              MOUSE OVER ON THE GRAPHIC TO READ THE DATA
            </div>
            {/* <div
              className="flex justify-start"
              onClick={() => setHowToReadOpen((open) => !open)}
            >
              <Button title="HOW TO READ THE GRAPHIC" callback={null} />
            </div> */}
          </div>
          {!allowEvents && (
            <div className="w-full h-96 flex justify-center items-center relative ">
              <Loader style={{ width: "100px" }} />
              <div className="text-xs absolute top-0 bottom-0 left-0 right-0 m-auto h-4">
                LOADING
              </div>
            </div>
          )}
          {allowEvents && (
            <TrendYear
              globalData={data}
              energyDemand={energyDemand}
              selectedRegion={selectedRegion}
              selectedMonth={selectedMonth}
              width={vizWidth}
            />
          )}

          {/* {!fullscreen && (
            <SectionFooter
              nextChapter={nextChapter}
              previousChapter={previousChapter}
              link={`${siteUrl}/unpacking_peaks?share=true`}
            />
          )} */}
        </div>
      </RightColumn>
    </section>
  );
};

export default React.memo(Section2);
