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
import { useWindowSize, getVizWidth } from "./utils";

const seasonLabel = ["Winter", "Spring", "Summer", "Autumn"];

const Section4 = ({
  data,
  energyDemand,
  gasDemand,
  expanded,
  setExpanded,
  nextChapter,
  fullscreen = false,
}) => {
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

  const size = useWindowSize();
  const vizWidth = getVizWidth("multiple", size);

  return (
    <section
      name="section4"
      className="w-full min-h-screen flex flex-col md:flex-row"
    >
      {!fullscreen && (
        <LeftColumn
          sectionTitle={"/5.seasons-vertical.svg"}
          expanded={expanded}
          setExpanded={setExpanded}
        >
          <h2 className="subtitle">Seasons of the year</h2>
          <p>
            Seasons are emerging as relevant to many aspects of research on
            flexibility and yet in energy research they tend to be dominated by
            discourses around averages of volumes (e.g. demand is higher when
            the weather is cold). Seasonal variations in energy demand have
            significant implications for system balancing between demand and
            supply and flexibility. Everyday life and energy demand follow
            seasonal patterns. What if demand itself could provide
            inter-seasonal flexibility? The seasonality of electricity and gas
            consumption offers an indication of how what constitutes demand
            changes depending on the season. In essence, the rhythms of demand
            are better understood if all types of temporal variation (from
            seconds to decades, perhaps even centuries) are taken into account.
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
                The graphic shows electricity demand (the extrernal white
                trend), gas demand (the extrernal black trend), activities’
                frequency and energy price every 30 minutes by season.
                <br /> The circle’s area represents the activity’s frequency.
                Select the seasons and the activities to explore the data
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
                  initialSlide={0}
                />
              </div>
              {selectedCompareSeason1 !== undefined && (
                <RadarYear
                  globalData={seasonData1 || []}
                  energyDemand={energyData1 || []}
                  gasDemand={gasData1 || []}
                  energyPrice={[]}
                  selectedRegion={"all"}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  selectedCategory={selectedCategory}
                  width={vizWidth}
                  showDemand={false}
                  innerLabel={seasonLabel[selectedCompareSeason1]}
                />
              )}
            </div>
            <div className="px-8">
              <div>
                <SeasonMenu
                  setSelected={setSelectedCompareSeason2}
                  selected={selectedCompareSeason2}
                  initialSlide={1}
                />
              </div>
              {selectedCompareSeason2 !== undefined && (
                <RadarYear
                  globalData={seasonData2 || []}
                  energyDemand={energyData2 || []}
                  gasDemand={gasData2 || []}
                  energyPrice={[]}
                  selectedRegion={"all"}
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  selectedCategory={selectedCategory}
                  width={vizWidth}
                  showDemand={false}
                  innerLabel={seasonLabel[selectedCompareSeason2]}
                />
              )}
            </div>
          </div>
        </div>
        {!fullscreen && (
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        )}{" "}
      </RightColumn>
    </section>
  );
};

export default Section4;
