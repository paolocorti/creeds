import { useEffect, useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarVerticalLegend from "./Radar/RadarVeticalLegend";
import RadarYear from "./Radar/RadarYear";
import { colorByCategory, activitiesArray } from "./utils";
import Button from "./Button";
import Loader from "./Loader";
import HowToRead from "./HowToRead";
import { useWindowSize, getVizWidth } from "./utils";
import { isMobile } from "react-device-detect";
import React from "react";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";

let interval;
const intervalTime = 1000;

const Section1 = ({
  data,
  energyDemand,
  energyPrice,
  gasDemand,
  previousChapter,
  nextChapter,
  fullscreen = false,
}) => {
  console.log("Section1 render");

  const [selectedMonth, setSelectedMonth] = useState(1);
  const [playStarted, setPlayStarted] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allowEvents, setAllowEvents] = useState(false);
  const size = useWindowSize();
  const vizWidth = getVizWidth("single", size);
  const [open, setHowToReadOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const changeMonth = () => {
    if (selectedMonth < 13) {
      setSelectedMonth((month) => month + 1);
    }
  };

  const startPlay = () => {
    setPlayStarted(true);
    interval = setInterval(changeMonth, intervalTime);
  };

  useEffect(() => {
    if (playStarted) {
      if (selectedMonth === 13) {
        clearInterval(interval);
        interval = null;
        setSelectedMonth(1);
        setPlayStarted(false);
      }
    }
  }, [selectedMonth]);

  useEffect(() => {
    setTimeout(() => {
      setAllowEvents(true);
    }, 1500);
  }, []);

  return (
    <section
      name="section1"
      className="w-full min-h-screen flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn>
          <h2 className="subtitle">
            Activities, demand and price every 30 minutes
          </h2>
          <p>
            Naturally, different people do different things over the course of a
            day. And even the same people may do things differently from one day
            to the next. Ultimately though, we all get the same 24 hours in a
            day and, overall, we are still consistent enough so that when we
            look at the bigger picture some clear, identifiable patterns emerge.
          </p>
          <p>
            To get this bird’s eye view, we visualise everyday life as happening
            inside a 24 hour clock where, quite literally, we place what people
            do at the centre of our understanding of energy demand. At the heart
            of this approach to visualising energy demand and everyday life is
            the position that the timing of energy demand is determined by the
            way people’s activities are ordered in time.{" "}
          </p>
          <p>
            This type of visualisation shows the complexities and regular trends
            in everyday life through the simultaneous representation of the
            temporal rhythm of social practices and its shaping influence over
            households’ energy demand throughout the day.
          </p>
        </LeftColumn>
      )}
      <RightColumn
        fullscreen={fullscreen}
        style={{ pointerEvents: allowEvents ? "all" : "none" }}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full flex-col items-start mb-4">
            <p className="mb-1 text-left">
              The graphic shows the half-hourly evolution of three key elements
              over the course of a day.
            </p>
            <div className="text-xs font-light uppercase text-left mb-2">
              Select the month or the activities in the graphic or in the legend
              to explore the data. MOUSE OVER ON THE GRAPHIC TO READ THEM
            </div>
            {/* <div className="text-xs font-bold uppercase text-left">
              SHARE THE GRAPHIC
            </div> */}
            <div
              className="flex justify-start"
              onClick={() => setHowToReadOpen((open) => !open)}
            >
              <Button title="HOW TO READ THE GRAPHIC" callback={null} />
            </div>
          </div>
          {isMobile && (
            <div className="w-full mb-4">
              <ActivitiesMenu
                activitiesArray={activitiesArray}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          )}
          <div className="flex w-full justify-center flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 px-8 flex flex-col"
              style={{
                maxWidth: "85vh",
              }}
            >
              <div
                className="w-full flex justify-center"
                style={{
                  opacity: playStarted ? 0.4 : 1,
                }}
              >
                <div onClick={startPlay} className="text-md">
                  <div className="flex flex-col justify-center">
                    <img
                      src={"/play.svg"}
                      width={28}
                      className="cursor-pointer"
                    />
                    <div
                      className="uppercase font-light "
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      PLAY
                    </div>
                  </div>
                </div>
              </div>
              {!allowEvents && (
                <div className="w-full h-full flex justify-center items-center relative ">
                  <Loader style={{ width: "100px" }} />
                  <div className="text-xs absolute top-0 bottom-0 left-0 right-0 m-auto h-4">
                    LOADING
                  </div>
                </div>
              )}
              {allowEvents && (
                <RadarYear
                  globalData={data}
                  energyDemand={energyDemand}
                  gasDemand={gasDemand}
                  energyPrice={energyPrice}
                  selectedRegion={selectedRegion}
                  selectedMonth={String(selectedMonth)}
                  setSelectedMonth={setSelectedMonth}
                  width={vizWidth}
                  selectedCategory={selectedCategory}
                />
              )}
            </div>
            {!isMobile && (
              <div className="w-full md:w-1/3 px-8 ">
                <div className="flex flex-col" style={{ width: "280px" }}>
                  <div className="mt-4">
                    <RadarVerticalLegend
                      setSelectedCategory={setSelectedCategory}
                      selectedCategory={selectedCategory}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!fullscreen && (
          <div className="flex w-full justify-center relative items-center mt-2">
            <div
              className="absolute left-0 cursor-pointer"
              data-tip="Copy link to embed"
            >
              <CopyToClipboard
                text={"https://creds.vercel.app/activities?share=true"}
                onCopy={() => setCopied(true)}
              >
                {copied ? (
                  <img
                    src={"share-link-active.svg"}
                    className="cursor-pointer"
                    width={30}
                  />
                ) : (
                  <img
                    src={"share-link.svg"}
                    className="cursor-pointer"
                    width={30}
                  />
                )}
              </CopyToClipboard>
            </div>
            <div className="mr-2">
              <Button title="PREVIOUS CHAPTER ↑" callback={previousChapter} />
            </div>
            <div className="ml-2">
              <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
            </div>
          </div>
        )}
      </RightColumn>
      <HowToRead
        text={
          "The graphic shows the half-hourly evolution of three key elements over the course of a day.<br/><br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/>- The price of electricity, to reflect the impact of energy demand on our power generation systems (inner layer)<br/><br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
        }
        image={"/legend01.svg"}
        readOpen={open}
        setHowToReadOpen={setHowToReadOpen}
      />
    </section>
  );
};

export default React.memo(Section1);
