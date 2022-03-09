import { useState } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import { ParentSize } from "@visx/responsive";
import Button from "./Button";

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
          Whilst the volume of energy demand relates to many factors (e.g.
          weather, type of appliances used, types of building), patterns
          throughout the day are a direct consequence of what people do.
          Detailed knowledge of when, and on what occasions several people
          engage in the same activities at the same time, of how activities’
          patterns vary, and of how they might be shaped is needed to inform any
          issue around the flexibility of demand for energy. The impact of
          &#39;smart&#39; tariffs and controls partly depends on whether there
          is, in fact, scope for shifting the timing of what people do, and for
          changing the rhythm of demand during peaks. Questions around these
          issues revolve around how activities generate patterns of demand at
          peak time, focusing on questions of why, where and when. Unpacking
          peaks is inextricably related to providing answers to these questions.
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
        <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
      </RightColumn>
    </section>
  );
};

export default Section2;
