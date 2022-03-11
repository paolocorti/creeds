import { useEffect, useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import RadarVerticalLegend from "./Radar/RadarVeticalLegend";
import RadarYear from "./Radar/RadarYear";
import { ParentSize } from "@visx/responsive";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";

let interval;
const intervalTime = 1000;

const Section1 = ({
  data,
  energyDemand,
  energyPrice,
  gasDemand,
  nextChapter,
  expanded,
  setExpanded,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [playStarted, setPlayStarted] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const hoverCategory = useStore((state) => state.hoverCategory);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const size = useWindowSize();
  const vizWidth = getVizWidth("single", size);

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

  return (
    <section
      name="section1"
      className="w-full min-h-screen flex flex-col md:flex-row"
    >
      <LeftColumn
        sectionTitle={"/2.activities-vertical.svg"}
        expanded={expanded}
        setExpanded={setExpanded}
      >
        <h2 className="subtitle">
          Activities, demand and price every 30 minutes
        </h2>
        <p>
          We visualise everyday life as happening inside the 24 hour clock
          because we want to place what people do at the centre of our
          understanding of energy demand. At the heart of this approach is the
          position that the timing of energy demand is determined by the way
          people’s activities are ordered in time.
        </p>
        <p>
          This type of visualisation is a conscious effort to visualise
          underlying regular patterns relating to the fundamental temporal
          characteristics of social events. It shows the complexities and
          regular trends in everyday life through the simultaneous
          representation of the temporal rhythm of social practices and its
          shaping influence over households’ energy demand throughout the day.
        </p>
      </LeftColumn>
      <RightColumn expanded={expanded} setExpanded={setExpanded}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full">
            <p className="text-center mt-0">
              The graphic shows energy demand, activities’ frequency and energy
              price every 30 minutes. The circle’s area represents the
              activity’s frequency. Select the month or the activities in the
              graphic or in the legend to explore the data
            </p>
          </div>
          <div className="flex w-full justify-center flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 px-8 flex flex-col"
              style={{
                maxWidth: "85vh",
              }}
            >
              <div className="w-full flex justify-center">
                <button onClick={startPlay} className="text-md">
                  PLAY
                </button>
              </div>

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
            </div>
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
          </div>
        </div>
        <div className="mt-8">
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        </div>
      </RightColumn>
    </section>
  );
};

export default Section1;
