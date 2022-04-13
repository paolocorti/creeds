import { useState, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import Loader from "./Loader";
import HowToRead from "./HowToRead";
import SectionFooter from "./SectionFooter.jsx";
import { siteUrl } from "../config";

const Section5 = ({
  data,
  energyDemand,
  gasDemand,
  fullscreen = false,
  previousChapter,
}) => {
  console.log("Section5 render");

  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion1, setSelectedCompareRegion1] =
    useState("london");
  const [selectedCompareRegion2, setSelectedCompareRegion2] = useState("wales");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const size = useWindowSize();
  const vizWidth = getVizWidth("multiple", size);
  const [allowEvents, setAllowEvents] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setHowToReadOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAllowEvents(true);
    }, 1500);
  }, []);

  return (
    <section
      name="section5"
      className="w-full min-h-screen flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn sectionTitle={"/5.seeasons-vertical.svg"}>
          <h2 className="subtitle">
            Urban vs
            <br /> Rural
          </h2>
          <p>
            Whenever we talk about the rhythm of everyday life, it’s inevitable
            to talk about the differences in the pace at which everyday life
            seems to unfold in different settings.
            <br />
            <br />
            We tend to think of cities as busy, always-rushing places, and small
            villages in the countryside as sleepy, easy-going places. And
            perhaps these widespread perceptions are rooted in some truth, as we
            can actually see some differences between the patterns of activity
            of predominantly rural locations and predominantly urban locations.
            <br />
            <br />
            As with all the other factors that play a role when it comes to
            studying the flexibility of our demand for energy, paying attention
            to this kind of distinctions is also key to making an accurate
            assessment of the extent to which we can expect people to be
            flexible in what they do, and when they do it.
          </p>
        </LeftColumn>
      )}
      <RightColumn fullscreen={fullscreen}>
        <div className="flex w-full flex-col">
          <div>
            <div className="flex w-full flex-col items-start mb-4">
              <p className="mb-1 text-left mt-0">
                The graphic shows energy demand and activities’ frequency every
                30 minutes for urban and rural regions.
              </p>
              <div className="text-xs font-light uppercase text-left mb-2 opacity-60">
                Select THE season or the activities to explore the data. MOUSE
                OVER ON THE GRAPHICS TO READ THEM
              </div>
              <div
                className="flex justify-start"
                onClick={() => setHowToReadOpen((open) => !open)}
              >
                <Button title="HOW TO READ THE GRAPHIC" callback={null} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ActivitiesMenu
              activitiesArray={activitiesArray}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <div
              className="px-12 flex flex-col justify-start"
              style={{
                maxWidth: "85vh",
              }}
            >
              {!allowEvents && (
                <div className="w-full h-64 flex justify-center items-center relative ">
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
                  energyPrice={[]}
                  selectedRegion={selectedCompareRegion1}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  width={vizWidth}
                  showDemand={false}
                  selectedCategory={selectedCategory}
                  innerLabel={"URBAN"}
                  type={"urban_rural"}
                />
              )}
            </div>
            <div
              className="px-12 flex flex-col justify-start"
              style={{
                maxWidth: "85vh",
              }}
            >
              {/* <div>
                <RegionMenu
                  setSelected={setSelectedCompareRegion2}
                  initialSlide={1}
                />
              </div> */}
              {!allowEvents && (
                <div className="w-full h-64 flex justify-center items-center relative ">
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
                  energyPrice={[]}
                  selectedRegion={selectedCompareRegion2}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  width={vizWidth}
                  showDemand={false}
                  selectedCategory={selectedCategory}
                  innerLabel={"RURAL"}
                  type={"urban_rural"}
                />
              )}
            </div>
          </div>
        </div>
        {!fullscreen && (
          <SectionFooter
            previousChapter={previousChapter}
            link={`${siteUrl}/urban_rural?share=true`}
          />
        )}
      </RightColumn>
      <HowToRead
        text={
          "The graphic shows the half-hourly evolution of key elements over the course of a day by season.<br/><br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/><br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
        }
        image={"/legend05.png"}
        readOpen={open}
        setHowToReadOpen={setHowToReadOpen}
      />
    </section>
  );
};

export default React.memo(Section5);
