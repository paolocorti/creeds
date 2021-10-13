import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { degToRad } from "./utils.js";
import ReactTooltip from "react-tooltip";

const isMobileWithTablet = false;

const colorScale = scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range(["#F29B9B", "#A2B0A2", "#7F69EA", "#8CC2D1", "#EDC03B", "#BD321A"]);

const gradScale = scaleLinear().domain([0, 360]).range([90, 450]);

let width = 700;
// if (typeof window !== "undefined") {
//   width = isMobileWithTablet
//     ? window.innerWidth * 0.9
//     : window.innerWidth * 0.28 < 400
//     ? window.innerWidth * 0.28
//     : 400;
// } else {
//   width = 500;
// }

const activities = {
  1: "absence",
  2: "generic home activity",
  3: "sleep",
  4: "food preparation",
  5: "laundry",
  6: "dishwashing",
  7: "travel to/from work",
  8: "TV-related",
  9: "IT-related",
  10: "eating",
  11: "personal care",
  12: "work",
  13: "household care",
  14: "household Upkeep",
  15: "shopping",
  16: "other Travel",
};

const posScale = scaleLinear()
  .domain([0, 17])
  .range([0, isMobileWithTablet ? (width - 60) / 2 : (width - 60) / 2]);

const Radar = ({ selected, globalData }) => {
  const selectedData = globalData[selected];

  if (!selectedData) {
    return <></>;
  }
  const acts = Object.fromEntries(
    Object.entries(selectedData).filter(([key]) => key.includes("act1"))
  );
  const data = Object.values(acts);
  const keys = Object.keys(selectedData);

  const timeScale = scaleTime()
    .range([0, 144])
    .domain([
      new Date(
        `${selectedData.DYEAR}-${selectedData.DMONTH}-${selectedData.DDAY}T04:00:00`
      ),
      new Date(
        `${selectedData.DYEAR}-${selectedData.DMONTH}-${
          Number(selectedData.DDAY) + 1
        }T04:00:00`
      ),
    ]);

  const [selectedCompare, setSelectedCompare] = useState(0);
  const [multiple, setMultiple] = useState(false);
  const [sort, setSort] = useState("ccvi");
  const [hover, setHover] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverCompare, setHoverCompare] = useState(null);
  const [hoverCompareIndex, setHoverCompareIndex] = useState(null);
  const [filter, setFilter] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedCountyCompare, setSelectedCountyCompare] = useState("");

  return (
    <div className="radial-overview mt-8">
      <div className="radial-overview-subtitle viz-explanation">
        Household number {selectedData.serial} <br />
        Person number {selectedData.pnum} <br />
        {selectedData.DDAY} - {selectedData.DMONTH} - {selectedData.DYEAR}
      </div>
      <div className="radial-overview-toolbar"></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div>
          <div
            className="date-selector-wrapper"
            style={{ display: "flex", width: "100%" }}
          ></div>
          <div
            className="counties-autocomplete"
            style={{
              justifyContent: "center",
              margin: 0,
              width: "100%",
              position: "relative",
            }}
          ></div>
          <div style={{ height: "30px", width: "100%", textAlign: "center" }}>
            {hover}
          </div>
          <svg width={width} height={width}>
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              {data.length &&
                data.map((v, i) => {
                  const radius = 2;
                  const angle = degToRad(360 / data.length);
                  const value1 = posScale(Number(2));
                  const value2 = posScale(Number(3));
                  const value3 = posScale(Number(4));
                  const value4 = posScale(Number(5));
                  const value5 = posScale(Number(6));
                  const value6 = posScale(Number(7));
                  const value7 = posScale(Number(8));
                  const value8 = posScale(Number(9));
                  const value9 = posScale(Number(10));
                  const value10 = posScale(Number(11));
                  const value11 = posScale(Number(12));
                  const value12 = posScale(Number(13));
                  const value13 = posScale(Number(14));
                  const value14 = posScale(Number(15));
                  const value15 = posScale(Number(16));
                  const value16 = posScale(Number(17));
                  const strokeColor = "black";
                  const strokeWidth = 0.1;

                  return (
                    <g
                      key={i}
                      style={{
                        transtion: "opacity 0.2s",
                        opacity: 1,
                        transform: "rotate(-90deg)",
                      }}
                    >
                      <line
                        x1={0}
                        y1={0}
                        x2={posScale(18) * Math.cos(angle * i)}
                        y2={posScale(18) * Math.sin(angle * i)}
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={strokeWidth}
                      />

                      <circle
                        className="cursor-pointer"
                        cx={posScale(18) * Math.cos(angle * i)}
                        cy={posScale(18) * Math.sin(angle * i)}
                        r={5}
                        stroke="rgba(0,0,0,0.5)"
                        strokeWidth={0.5}
                        fill={"white"}
                        data-tip={`${timeScale.invert(i)}`}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value1 * Math.cos(angle * i)}
                        cy={value1 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 1 ? "#110e79" : "lightgray"}
                        data-tip={activities[1]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value2 * Math.cos(angle * i)}
                        cy={value2 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 2 ? "#110e79" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[2]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value3 * Math.cos(angle * i)}
                        cy={value3 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 3 ? "#110e79" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[3]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value4 * Math.cos(angle * i)}
                        cy={value4 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 4 ? "#110e79" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[4]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value5 * Math.cos(angle * i)}
                        cy={value5 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 5 ? "#110e79" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[5]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value6 * Math.cos(angle * i)}
                        cy={value6 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 6 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[6]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value7 * Math.cos(angle * i)}
                        cy={value7 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 7 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[7]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value8 * Math.cos(angle * i)}
                        cy={value8 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 8 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[8]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value9 * Math.cos(angle * i)}
                        cy={value9 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 9 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[9]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value10 * Math.cos(angle * i)}
                        cy={value10 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 10 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[10]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value11 * Math.cos(angle * i)}
                        cy={value11 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 11 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[11]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value12 * Math.cos(angle * i)}
                        cy={value12 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 12 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[12]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value13 * Math.cos(angle * i)}
                        cy={value13 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 13 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[13]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value14 * Math.cos(angle * i)}
                        cy={value14 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 14 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[14]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value15 * Math.cos(angle * i)}
                        cy={value15 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 15 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[15]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                      <circle
                        className="cursor-pointer"
                        cx={value16 * Math.cos(angle * i)}
                        cy={value16 * Math.sin(angle * i)}
                        r={radius}
                        fill={parseInt(v) === 16 ? "#1313b7" : "lightgray"}
                        // stroke={strokeColor}
                        // strokeWidth={strokeWidth}
                        data-tip={activities[16]}
                        onMouseEnter={() => ReactTooltip.rebuild()}
                      />
                    </g>
                  );
                })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Radar;
