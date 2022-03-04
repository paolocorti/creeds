import { useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import { ParentSize } from "@visx/responsive";

const Section2 = ({ data, energyDemand, nextChapter }) => {
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion, setSelCompareRegion] = useState([
    "london",
    "south_east",
  ]);
  const hoverCategory = useStore((state) => state.hoverCategory);
  const selectedCategory = useStore((state) => state.selectedCategory);

  const setSelectedCompareRegion = (val) => {
    if (selectedCompareRegion.length < 2) {
      setSelCompareRegion((state) => [...state, val]);
    }
  };

  const unsetSelectedCompareRegion = (val) => {
    setSelCompareRegion(selectedCompareRegion.filter((state) => state !== val));
  };

  return (
    <section name="section2" className="w-full flex flex-col md:flex-row">
      <LeftColumn>
        <h2 className="subtitle">Unpacking peaks</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </LeftColumn>
      <RightColumn>
        <div className="w-full">
          <ParentSize>
            {(parent) => (
              <TrendYear
                globalData={data}
                energyDemand={energyDemand}
                selectedRegion={selectedRegion}
                selectedMonth={selectedMonth}
                width={parent.width}
              />
            )}
          </ParentSize>
        </div>
        <div className="flex justify-center">
          <div
            className="border rounded-2xl z-40 px-4 py-2 cursor-pointer hover:bg-black hover:text-pink"
            style={{
              fontSize: "11px",
            }}
            onClick={nextChapter}
          >
            NEXT CHAPTER ↓
          </div>
        </div>
      </RightColumn>
    </section>
  );
};

export default Section2;
