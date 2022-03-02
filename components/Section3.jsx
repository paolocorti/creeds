import { useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import RegionMenu from "./RegionMenu.jsx";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";

const Section3 = ({ data, energyDemand }) => {
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion, setSelCompareRegion] = useState([
    "london",
    "south_east",
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const hoverCategory = useStore((state) => state.hoverCategory);

  const setSelectedCompareRegion = (val) => {
    if (selectedCompareRegion.length < 2) {
      setSelCompareRegion((state) => [...state, val]);
    }
  };

  const unsetSelectedCompareRegion = (val) => {
    setSelCompareRegion(selectedCompareRegion.filter((state) => state !== val));
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row">
      <LeftColumn>
        <h2 className="subtitle">Spatial variation</h2>
        <p>
          Energy demand varies depending on where people live and work within a
          country or region and this has implications for the grid. Meeting
          peaks in electricity demand in a specific area is expensive (because
          it increases balancing costs) and bad for the environment (as extra
          supply is needed to meet demand peaks). But people don’t just stay in
          the same place all the time. For many people, moving around from one
          location to another is an essential part of their everyday life – we
          go to work, we go to school, we go places… And when we move around, we
          consume energy in different spaces. This has repercussions on where
          and when electricity demand occurs.
        </p>
      </LeftColumn>
      <RightColumn>
        <div className="flex w-full flex-col">
          <div>
            <div className="" style={{ height: "auto" }}>
              <p className="text-center">
                Select the region or the categories. Mouse over on the graphic
                to explore the data. The blue external trend indicates the
                energy consumption by hour. Each circle is an activity, the
                colors indicate macro-categories, the size indicates the
                frequency.
              </p>
            </div>
          </div>
          <RegionMenu
            setSelectedCompareRegion={setSelectedCompareRegion}
            unsetSelectedCompareRegion={unsetSelectedCompareRegion}
            selectedCompareRegion={selectedCompareRegion}
          />
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
              {selectedCompareRegion[0] && (
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={data}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={selectedCompareRegion[0]}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
                      selectedCategory={selectedCategory}
                    />
                  )}
                </ParentSize>
              )}
            </div>
            <div className="px-12">
              {selectedCompareRegion[1] && (
                <ParentSize
                  style={{
                    maxWidth: "85vh",
                  }}
                >
                  {(parent) => (
                    <RadarYear
                      globalData={data}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={selectedCompareRegion[1]}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
                      selectedCategory={selectedCategory}
                    />
                  )}
                </ParentSize>
              )}
            </div>
          </div>
        </div>
      </RightColumn>
    </section>
  );
};

export default Section3;
