import { useState, useMemo, useEffect } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { activitiesArray } from "./utils";
import { getEnergyData, getGasData, getData } from "./data";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import { groupBy, flatten } from "lodash";
import SeasonMenu from "./SeasonMenu.jsx";
import Button from "./Button";
import HowToRead from "./HowToRead";
import React from "react";
import SectionFooter from "./SectionFooter.jsx";
import { isMobile, isSafari } from "react-device-detect";
import { ParentSize } from "@visx/responsive";

const seasonLabel = ["Winter", "Spring", "Summer", "Autumn"];

const Section4 = ({
  data,
  energyDemand,
  gasDemand,
  expanded,
  setExpanded,
  nextChapter,
  previousChapter,
  fullscreen = false,
  shared = false,
}) => {
  console.log("Section4 render");

  if (data.length === 0) {
    return <></>;
  }

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCompareSeason1, setSelectedCompareSeason1] = useState(0);
  const [selectedCompareSeason2, setSelectedCompareSeason2] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const grouped = groupBy(data, "season");
  const grouped1 = Object.values(grouped).map((v) => groupBy(v, "region"));
  const grouped2 = useMemo(() => {
    return getData(grouped1);
  }, [data]);

  const groupedEnergy = groupBy(energyDemand, "season");
  const groupedEnergy1 = Object.values(groupedEnergy).map((v) =>
    groupBy(v, "region")
  );
  const groupedEnergy2 = useMemo(() => {
    return getEnergyData(groupedEnergy1);
  }, [energyDemand]);

  const groupedGas = groupBy(gasDemand, "season");
  const groupedGas1 = Object.values(groupedGas).map((v) =>
    groupBy(v, "region")
  );
  const groupedGas2 = useMemo(() => {
    return getGasData(groupedGas1);
  }, [gasDemand]);

  const seasonData1 =
    selectedCompareSeason1 !== undefined
      ? flatten(grouped2[selectedCompareSeason1])
      : [];
  const seasonData2 =
    selectedCompareSeason2 !== undefined
      ? flatten(grouped2[selectedCompareSeason2])
      : [];

  const energyData1 =
    selectedCompareSeason1 !== undefined
      ? flatten(groupedEnergy2[selectedCompareSeason1])
      : [];
  const energyData2 =
    selectedCompareSeason2 !== undefined
      ? flatten(groupedEnergy2[selectedCompareSeason2])
      : [];

  const gasData1 =
    selectedCompareSeason1 !== undefined
      ? flatten(groupedGas2[selectedCompareSeason1])
      : [];
  const gasData2 =
    selectedCompareSeason2 !== undefined
      ? flatten(groupedGas2[selectedCompareSeason2])
      : [];

  const [open, setHowToReadOpen] = useState(false);

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  const [siteUrl, setSiteUrl] = useState(null);

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  return (
    <section
      name="section4"
      className="w-full md:min-h-screen flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn
          sectionTitle={"/5.seasons-vertical.svg"}
          expanded={expanded}
          setExpanded={setExpanded}
        >
          <h2 className="subtitle">
            Seasons <br />
            of the year
          </h2>

          <p>
            Everyday life and energy demand follow seasonal patterns. These
            seasonal variations in energy demand have significant implications
            for the balancing of demand and supply in our energy systems.
            <br />
            <br />
            Up until recently, the discourse in energy research has revolved
            around average figures of total volumes of energy demand (e.g. total
            demand is higher when the weather is hot/cold). However, the
            importance of seasonal variations is increasingly recognised, and
            seasons are emerging as relevant factors to many aspects of research
            into the flexibility potential of demand.
            <br />
            <br />
            When it comes to shifting demand to a different time, this shift
            could be needed to occur within the same day, but it could also be
            needed over the course of a month or even a year. Thus, it is
            necessary to understand the temporal variation of demand at all
            these different timescales.
          </p>
        </LeftColumn>
      )}
      <RightColumn
        expanded={expanded}
        setExpanded={setExpanded}
        fullscreen={fullscreen}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex w-full flex-col items-start mb-4">
            <div className="flex w-full flex-col items-start mb-4">
              {/* <p className="mb-1 text-left mt-0">
                The graphic shows energy demand and activities’ frequency every
                30 minutes by season.
              </p> */}
              <div className="text-xs uppercase text-left mb-2 opacity-60">
                Select THE season or the activities to explore the data. MOUSE
                OVER ON THE GRAPHICS TO READ THEM.
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
          </div>
          <div className="flex flex-col justify-center items-center grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="px-8 flex flex-col justify-start items-center">
                <div>
                  <SeasonMenu
                    setSelected={setSelectedCompareSeason1}
                    selected={selectedCompareSeason1}
                    initialSlide={0}
                  />
                </div>
                <div
                  className="w-full"
                  style={{
                    maxWidth: "55vh",
                  }}
                >
                  <ParentSize>
                    {(parent) => (
                      <RadarYear
                        globalData={seasonData1 || []}
                        energyDemand={energyData1 || []}
                        gasDemand={gasData1 || []}
                        energyPrice={[]}
                        selectedRegion={"all"}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedCategory={selectedCategory}
                        width={parent.width}
                        showDemand={false}
                        innerLabel={seasonLabel[selectedCompareSeason1]}
                        type={"season"}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
              <div className="px-8 flex flex-col justify-start items-center">
                <div>
                  <SeasonMenu
                    setSelected={setSelectedCompareSeason2}
                    selected={selectedCompareSeason2}
                    initialSlide={1}
                  />
                </div>
                <div
                  className="w-full"
                  style={{
                    maxWidth: "55vh",
                  }}
                >
                  <ParentSize>
                    {(parent) => (
                      <RadarYear
                        globalData={seasonData2 || []}
                        energyDemand={energyData2 || []}
                        gasDemand={gasData2 || []}
                        energyPrice={[]}
                        selectedRegion={"all"}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedCategory={selectedCategory}
                        width={parent.width}
                        showDemand={false}
                        innerLabel={seasonLabel[selectedCompareSeason2]}
                        type={"season"}
                      />
                    )}
                  </ParentSize>
                </div>
              </div>
            </div>
          </div>
          <SectionFooter
            nextChapter={nextChapter}
            shareUrl={`${siteUrl}/seasons`}
            shared={shared}
            homeCallback={() => window.open(siteUrl, "_blank")}
            title={"Season of the year"}
            link={`<div style="padding:65.25% 0 0 0;position:relative;"><iframe src="${siteUrl}/seasons" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Season of the year"></iframe></div>`}
          />
        </div>
        {mobile && (
          <HowToRead
            text={
              "The graphic shows the half-hourly evolution of key elements over the course of a day by season.<br/><br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/><br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
            }
            image={"/legend-mobile-4.png"}
            readOpen={open}
            setHowToReadOpen={setHowToReadOpen}
          />
        )}
      </RightColumn>
      {!mobile && (
        <HowToRead
          text={
            "The graphic shows the half-hourly evolution of key elements over the course of a day by season.<br/><br/>Every 30 minutes, we can observe:<br/>- The amount of people doing certain activities to understand the origin of our demand for energy (mid layer)<br/>- The typical levels of demand for gas and electricity to reflect the varying intensity of energy consumption (outer layer)<br/><br/>In the case of the activity data, the size of the bubbles is proportional to the amount of people doing the activity in question – the bigger the bubble, the more people are doing said activity at that particular time of day."
          }
          image={"/legend-4.png"}
          readOpen={open}
          setHowToReadOpen={setHowToReadOpen}
        />
      )}
    </section>
  );
};

export default React.memo(Section4);
