import { useState, useEffect } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import RegionMenu from "./RegionMenu.jsx";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import Button from "./Button";
import HowToRead from "./HowToRead";
import React from "react";
import SectionFooter from "./SectionFooter.jsx";
import { isMobile, isSafari } from "react-device-detect";
import { ParentSize } from "@visx/responsive";

const Section3 = ({
  data,
  energyDemand,
  gasDemand,
  nextChapter,
  previousChapter,
  fullscreen = false,
  shared = false,
}) => {
  console.log("Section3 render");

  if (data.length === 0) {
    return <></>;
  }

  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedCompareRegion1, setSelectedCompareRegion1] =
    useState("london");
  const [selectedCompareRegion2, setSelectedCompareRegion2] =
    useState("south_east");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setHowToReadOpen] = useState(false);
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
      name="section3"
      className="w-full md:min-h-screen flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn sectionTitle={"/4.spatial-vertical.svg"}>
          <h2 className="subtitle">
            Spatial
            <br /> variation
          </h2>

          <p>
            People living in the same country tend to share certain social
            conventions about the timing of certain events – think of lunchtime
            – and thus tend to share an overall everyday-life daily rhythm.
            <br /> <br />
            Even within the same country, however, there usually are some
            noticeable differences between what people do, when they do it, and
            for how long, when we compare one region to another. In addition,
            the amount of energy we demand from the grid also depends on other
            factors such as the weather and the type of buildings we inhabit,
            which are also likely to vary from region to region.
            <br /> <br />
            This has repercussions on the grid as the grid infrastructure tends
            to be unevenly distributed, and the impacts of our demand for energy
            depend on where and when such demand occurs.
          </p>
        </LeftColumn>
      )}
      <RightColumn fullscreen={fullscreen}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex w-full flex-col items-start mb-4">
            {/* <p className="mb-1 text-left mt-0">
                The graphic shows energy demand and activities’ frequency every
                30 minutes in UK’s region.
              </p> */}
            <div className="text-xs uppercase text-left mb-2 opacity-60">
              Select the month, THE REGIONS or the activities to explore the
              data. MOUSE OVER ON THE GRAPHICS TO READ THEM.
            </div>
            <div
              className="flex justify-start"
              onClick={() => setHowToReadOpen((open) => !open)}
            >
              <Button title="HOW TO READ THE GRAPHIC" callback={null} />
            </div>
            <div className="mt-4">
              <ActivitiesMenu
                activitiesArray={activitiesArray}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center grow">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="px-8 flex flex-col justify-start items-center">
                <RegionMenu
                  setSelected={setSelectedCompareRegion1}
                  initialSlide={0}
                />
                <div
                  className="w-full"
                  style={{
                    maxWidth: "55vh",
                  }}
                >
                  <ParentSize>
                    {(parent) => (
                      <RadarYear
                        globalData={data}
                        energyDemand={energyDemand}
                        gasDemand={gasDemand}
                        energyPrice={[]}
                        selectedRegion={selectedCompareRegion1}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        width={parent.width}
                        showDemand={false}
                        selectedCategory={selectedCategory}
                        type={"spatial_variation"}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
              <div className="px-8 flex flex-col justify-start items-center">
                <RegionMenu
                  setSelected={setSelectedCompareRegion2}
                  initialSlide={1}
                />
                <div
                  className="w-full"
                  style={{
                    maxWidth: "55vh",
                  }}
                >
                  <ParentSize>
                    {(parent) => (
                      <RadarYear
                        globalData={data}
                        energyDemand={energyDemand}
                        gasDemand={gasDemand}
                        energyPrice={[]}
                        selectedRegion={selectedCompareRegion2}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        width={parent.width}
                        showDemand={false}
                        selectedCategory={selectedCategory}
                        type={"spatial_variation"}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
            </div>
          </div>

          <SectionFooter
            nextChapter={nextChapter}
            shared={shared}
            homeCallback={() => (window.location.href = siteUrl)}
            shareUrl={`${siteUrl}/spatial_variation`}
            title={"Spatial variation"}
            link={`<div style="padding:65.25% 0 0 0;position:relative;"><iframe src="${siteUrl}/spatial_variation" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Spatial variation"></iframe></div>`}
          />
        </div>
        {mobile && (
          <HowToRead
            text={
              "The graphic shows the half-hourly evolution of key elements over the course of a day in UK’s regions.<br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
            }
            image={"/legend-3.png"}
            readOpen={open}
            setHowToReadOpen={setHowToReadOpen}
          />
        )}
      </RightColumn>
      {!mobile && (
        <HowToRead
          text={
            "The graphic shows the half-hourly evolution of key elements over the course of a day in UK’s regions.<br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
          }
          image={"/legend-3.png"}
          readOpen={open}
          setHowToReadOpen={setHowToReadOpen}
        />
      )}
    </section>
  );
};

export default Section3;
