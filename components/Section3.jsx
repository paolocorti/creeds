import { useState, useEffect } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import RegionMenu from "./RegionMenu.jsx";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";

const Section3 = ({
  data,
  energyDemand,
  gasDemand,
  nextChapter,
  expanded,
  setExpanded,
  fullscreen = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion1, setSelectedCompareRegion1] =
    useState("london");
  const [selectedCompareRegion2, setSelectedCompareRegion2] =
    useState("south_east");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const size = useWindowSize();
  const vizWidth = getVizWidth("multiple", size);

  return (
    <section
      name="section3"
      className="w-full min-h-screen flex flex-col md:flex-row"
    >
      {!fullscreen && (
        <LeftColumn
          sectionTitle={"/4.spatial-vertical.svg"}
          expanded={expanded}
          setExpanded={setExpanded}
        >
          <h2 className="subtitle">Spatial variation</h2>
          <p>
            Energy demand varies depending on where people live and work within
            a country or region and this has implications for the grid. Meeting
            peaks in electricity demand in a specific area is expensive (because
            it increases balancing costs) and bad for the environment (as extra
            supply is needed to meet demand peaks). But people don’t just stay
            in the same place all the time. For many people, moving around from
            one location to another is an essential part of their everyday life
            – we go to work, we go to school, we go places… And when we move
            around, we consume energy in different spaces. This has
            repercussions on where and when electricity demand occurs.
          </p>
        </LeftColumn>
      )}
      <RightColumn
        expanded={expanded}
        setExpanded={setExpanded}
        fullscreen={fullscreen}
      >
        <div className="flex w-full flex-col">
          <div>
            <div className="" style={{ height: "auto" }}>
              <p className="text-center mt-0">
                The graphic shows energy demand, activities’ frequency and
                energy price every 30 minutes in UK’s region.
                <br /> The circle’s area represents the activity’s frequency.
                Select the regions, the monts and the activities to explore the
                data
              </p>
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
              <div>
                <RegionMenu
                  setSelected={setSelectedCompareRegion1}
                  initialSlide={0}
                />
              </div>
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
                />
              )}
            </div>
            <div className="px-12">
              <div>
                <RegionMenu
                  setSelected={setSelectedCompareRegion2}
                  initialSlide={1}
                />
              </div>
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
                />
              )}
            </div>
          </div>
        </div>
        {!fullscreen && (
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        )}
      </RightColumn>
    </section>
  );
};

export default Section3;
