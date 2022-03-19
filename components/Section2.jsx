import { useState, useEffect } from "react";
import { useStore } from "../store.js";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import TrendYear from "./Trend/TrendYear";
import { ParentSize } from "@visx/responsive";
import Button from "./Button";
import { useWindowSize, getVizWidth } from "./utils";

const Section2 = ({
  data,
  energyDemand,
  nextChapter,
  expanded,
  setExpanded,
  fullscreen = false,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCompareRegion, setSelCompareRegion] = useState([
    "london",
    "south_east",
  ]);
  const size = useWindowSize();
  const vizWidth = getVizWidth("trend", size);

  return (
    <section
      name="section2"
      className="w-full flex flex-col md:flex-row relative"
    >
      {!fullscreen && (
        <LeftColumn
          sectionTitle={"/3.unpacking-vertical.svg"}
          expanded={expanded}
          setExpanded={setExpanded}
        >
          <h2 className="subtitle">Unpacking peaks</h2>
          <p>
            We have established by now that the energy demand patterns observed
            throughout the day are a direct consequence of what people do. But
            if we are to provide further insights into any of the issues around
            the flexibility of demand for energy, we need to have a very
            detailed knowledge of what happens during the most problematic
            periods. That is, when peaks in demand occur.
            <br /> The impact of “smart” tariffs and controls largely depends on
            whether there is, in fact, scope for shifting the timing of what
            people do, and for changing the rhythm of demand during peaks.
            <br />
            Questions about these issues revolve around how activities generate
            patterns of demand at peak time, focusing on questions of why, where
            and when.
            <br /> Unpacking peaks is inextricably related to providing answers
            to these questions.
          </p>
        </LeftColumn>
      )}
      <RightColumn
        expanded={expanded}
        setExpanded={setExpanded}
        fullscreen={fullscreen}
      >
        <div className="w-full flex justify-center">
          <TrendYear
            globalData={data}
            energyDemand={energyDemand}
            selectedRegion={selectedRegion}
            selectedMonth={selectedMonth}
            width={vizWidth}
          />
        </div>
        {!fullscreen && (
          <Button title="NEXT CHAPTER ↓" callback={nextChapter} />
        )}
      </RightColumn>
    </section>
  );
};

export default Section2;
