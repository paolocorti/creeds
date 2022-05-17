import { useState, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import SectionFooter from "./SectionFooter.jsx";
import Button from "./Button";
import React from "react";
import HowToRead from "./HowToRead";
import { isMobile, isSafari } from "react-device-detect";
import Loader from "./Loader";
import { ParentSize } from "@visx/responsive";

const Section2 = ({
  data,
  energyDemand,
  nextChapter,
  fullscreen = false,
  scrolling,
  shared = false,
}) => {
  console.log("Section2 render");

  if (data.length === 0) {
    return <></>;
  }

  const [open, setHowToReadOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [allowEvents, setAllowEvents] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [siteUrl, setSiteUrl] = useState(null);

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

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

          <SectionFooter
            nextChapter={nextChapter}
            shared={shared}
            homeCallback={() => (window.location.href = siteUrl)}
            shareUrl={`${siteUrl}/unpacking_peaks`}
            title={"Unpacking peaks"}
            link={`<div style="padding:65.25% 0 0 0;position:relative;"><iframe src="${siteUrl}/unpacking_peaks" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Unpacking peaks"></iframe></div>`}
          />
        </div>
        {mobile && (
          <HowToRead
            text={
              "In the UK, peaks in demand for electricity consistently occur in the early evening; we start observing significant increases by around 4pm, followed by a peak occurring roughly between 6pm and 7pm, and start observing significant decreases by 8pm.<br/><br/> The graphic shows the proportion of people engaging in each of the activities listed, at every 10 min. The shaded band highlights the portion of the day where the peaks in demand are usually observed."
            }
            image={"/legend-2.png"}
            readOpen={open}
            setHowToReadOpen={setHowToReadOpen}
          />
        )}
      </RightColumn>
      {!mobile && (
        <HowToRead
          text={
            "In the UK, peaks in demand for electricity consistently occur in the early evening; we start observing significant increases by around 4pm, followed by a peak occurring roughly between 6pm and 7pm, and start observing significant decreases by 8pm.<br/><br/> The graphic shows the proportion of people engaging in each of the activities listed, at every 10 min. The shaded band highlights the portion of the day where the peaks in demand are usually observed."
          }
          image={"/legend-2.png"}
          readOpen={open}
          setHowToReadOpen={setHowToReadOpen}
        />
      )}
    </section>
  );
};

export default React.memo(Section2);
