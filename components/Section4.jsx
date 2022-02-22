import { useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarYear from "./Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import { colorByCategory, activitiesArray } from "./utils";
import ActivitiesMenu from "./ActivitiesMenu.jsx";
import { groupBy } from "lodash";
import SeasonMenu from "./SeasonMenu.jsx";

const Section4 = ({ data, energyDemand }) => {
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedCompareSeason, setSelCompareSeason] = useState([
    "winter",
    "spring",
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const hoverCategory = useStore((state) => state.hoverCategory);

  const setSelectedCompareSeason = (val) => {
    if (selectedCompareSeason.length < 2) {
      setSelCompareSeason((state) => [...state, val]);
    }
  };

  const unsetSelectedCompareSeason = (val) => {
    setSelCompareSeason(selectedCompareSeason.filter((state) => state !== val));
  };

  const grouped = groupBy(data, "season");
  const grouped1 = Object.values(grouped).map((v) => groupBy(v, "region"));
  const grouped2 = grouped1.map((v) => {
    const values = Object.values(v);
    return values.map((arr) => {
      const filtered = arr.filter((a) => {
        return a.act_type === "main";
      });

      console.log(filtered);

      return groupBy(filtered, "act_category");
    });
  });

  console.log(grouped2);

  // const aggregated = grouped.map((v) => {
  //   console.log(v);
  // });

  return (
    <section className="w-full flex">
      <LeftColumn>
        <h2 className="text-4xl">Seasons of the year</h2>
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
            <div
              className="radial-overview-toolbar text-left"
              style={{ height: "auto" }}
            ></div>
          </div>
          <SeasonMenu
            setSelectedCompareSeason={setSelectedCompareSeason}
            unsetSelectedCompareSeason={unsetSelectedCompareSeason}
            selectedCompareSeason={selectedCompareSeason}
          />
          <ActivitiesMenu
            activitiesArray={activitiesArray}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="flex w-full">
            <div className="w-1/2 px-8">
              {selectedCompareSeason[0] && (
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={data}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={selectedCompareSeason[0]}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
                    />
                  )}
                </ParentSize>
              )}
            </div>
            <div className="w-1/2 px-8">
              {selectedCompareSeason[1] && (
                <ParentSize>
                  {(parent) => (
                    <RadarYear
                      globalData={data}
                      energyDemand={energyDemand}
                      energyPrice={[]}
                      selectedRegion={selectedCompareSeason[1]}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      width={parent.width}
                      showDemand={false}
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
