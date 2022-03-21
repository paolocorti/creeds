import { useState } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";

const Section5 = ({
  data,
  energyDemand,
  gasDemand,
  expanded,
  setExpanded,
  fullscreen = false,
  nextChapter,
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

  return (
    <section
      name="section5"
      className="w-full min-h-screen flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn sectionTitle={"/5.seeasons-vertical.svg"}>
          <h2 className="subtitle">Urban vs Rural</h2>
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
              <p className="mb-1 text-left">
                The graphic shows energy demand and activities’ frequency every
                30 minutes for urban and rural regions.
              </p>
              <div className="text-xs font-light uppercase text-left mb-2">
                Select THE season or the activities to explore the data. MOUSE
                OVER ON THE GRAPHICS TO READ THEM
              </div>
              <CopyToClipboard text="">
                <div className="text-xs font-bold uppercase text-left">
                  SHARE THE GRAPHIC
                </div>
              </CopyToClipboard>
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
              className="px-12"
              style={{
                maxWidth: "85vh",
              }}
            >
              {/* <div>
                <RegionMenu
                  setSelected={setSelectedCompareRegion1}
                  initialSlide={0}
                />
              </div> */}
              {selectedCompareRegion1 !== undefined && (
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
            <div className="px-12">
              {/* <div>
                <RegionMenu
                  setSelected={setSelectedCompareRegion2}
                  initialSlide={1}
                />
              </div> */}
              {selectedCompareRegion2 !== undefined && (
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
          <Button title="BACK TO START ↑" callback={nextChapter} />
        )}{" "}
      </RightColumn>
    </section>
  );
};

export default React.memo(Section5);
