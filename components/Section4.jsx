import { useState, useMemo } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import { colorByCategory, activitiesArray } from "./utils";
import { getEnergyData, getGasData, getData } from "./data";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import { groupBy, flatten } from "lodash";
import SeasonMenu from "./SeasonMenu.jsx";
import Button from "./Button";

const seasonLabel = ["Winter", "Spring", "Summer", "Autumn"];

const Section4 = ({ data, energyDemand, gasDemand }) => {
  console.log("Section4 Render");

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
  const seasonData2 = selectedCompareSeason2
    ? flatten(grouped2[selectedCompareSeason2])
    : [];

  const energyData1 =
    selectedCompareSeason1 !== undefined
      ? flatten(groupedEnergy2[selectedCompareSeason1])
      : [];
  const energyData2 = selectedCompareSeason2
    ? flatten(groupedEnergy2[selectedCompareSeason2])
    : [];

  const gasData1 =
    selectedCompareSeason1 !== undefined
      ? flatten(groupedGas2[selectedCompareSeason1])
      : [];
  const gasData2 = selectedCompareSeason2
    ? flatten(groupedGas2[selectedCompareSeason2])
    : [];

  return (
    <section
      name="section4"
      className="w-full min-h-screen flex flex-col md:flex-row"
    >
      <LeftColumn>
        <h2 className="subtitle">Seasons of the year</h2>
        <p>
          Seasons are emerging as relevant to many aspects of research on
          flexibility and yet in energy research they tend to be dominated by
          discourses around averages of volumes (e.g. demand is higher when the
          weather is cold). Seasonal variations in energy demand have
          significant implications for system balancing between demand and
          supply and flexibility. Everyday life and energy demand follow
          seasonal patterns. What if demand itself could provide inter-seasonal
          flexibility? The seasonality of electricity and gas consumption offers
          an indication of how what constitutes demand changes depending on the
          season. In essence, the rhythms of demand are better understood if all
          types of temporal variation (from seconds to decades, perhaps even
          centuries) are taken into account.
        </p>
      </LeftColumn>
      <RightColumn>
        <div className="flex w-full flex-col">
          <div>
            <div className="" style={{ height: "auto" }}>
              <p className="text-center mt-0">
                The graphic shows electricity demand (the extrernal white
                trend), gas demand (the extrernal black trend), activities’
                frequency and energy price every 30 minutes by season. The
                circle’s area represents the activity’s frequency. Select the
                seasons and the activities to explore the data
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="px-8">
              <div>
                <SeasonMenu
                  setSelected={setSelectedCompareSeason1}
                  selected={selectedCompareSeason1}
                />
              </div>
              {selectedCompareSeason1 !== undefined && (
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
                      width={parent.width}
                      showDemand={false}
                      innerLabel={seasonLabel[selectedCompareSeason1]}
                    />
                  )}
                </ParentSize>
              )}
            </div>
            <div className="px-8">
              <div>
                <SeasonMenu
                  setSelected={setSelectedCompareSeason2}
                  selected={selectedCompareSeason2}
                />
              </div>
              {selectedCompareSeason2 && (
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
                      width={parent.width}
                      showDemand={false}
                      innerLabel={seasonLabel[selectedCompareSeason2]}
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

export default Section4;
