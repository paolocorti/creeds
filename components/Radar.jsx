import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import { degToRad } from "./utils.js";

const isMobileWithTablet = false;

const colorScale = scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range(["#F29B9B", "#A2B0A2", "#7F69EA", "#8CC2D1", "#EDC03B", "#BD321A"]);

const gradScale = scaleLinear().domain([0, 360]).range([90, 450]);

let width = 900;
// if (typeof window !== "undefined") {
//   width = isMobileWithTablet
//     ? window.innerWidth * 0.9
//     : window.innerWidth * 0.28 < 400
//     ? window.innerWidth * 0.28
//     : 400;
// } else {
//   width = 500;
// }

const posScale = scaleLinear()
  .domain([0, 17])
  .range([0, isMobileWithTablet ? (width - 60) / 2 : (width - 60) / 2]);

const Radar = () => {
  const [data, setData] = useState({});
  const [keys, setKeys] = useState({});
  const [selected, setSelected] = useState(0);
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

  useEffect(() => {
    csv("/data/data.csv").then((values) => {
      const acts = Object.fromEntries(
        Object.entries(values[selected]).filter(([key]) => key.includes("act1"))
      );
      console.log("acts", Object.values(acts));
      setData(Object.values(acts));
    });
  }, []);

  const previousState = () => {
    setSelected(selected === 0 ? data.length - 1 : selected - 1);
    setSelectedCounty("");
  };

  const nextState = () => {
    setSelected(selected < data.length - 1 ? selected + 1 : 0);
    setSelectedCounty("");
  };

  const previousCompareState = () => {
    setSelectedCompare(
      selectedCompare === 0 ? data.length - 1 : selectedCompare - 1
    );
    setSelectedCountyCompare("");
  };

  const nextCompareState = () => {
    setSelectedCompare(
      selectedCompare < data.length - 1 ? selectedCompare + 1 : 0
    );
    setSelectedCountyCompare("");
  };

  const resetSelectedCounty = () => {
    setSelectedCounty("");
  };

  const resetSelectedCountyCompare = () => {
    setSelectedCountyCompare("");
  };

  return (
    <div className="radial-overview">
      <div className="radial-overview-subtitle viz-explanation">VIZ 01</div>
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
          >
            <div className="date-previous" onClick={previousState}></div>
            <div style={{ width: "200px", textAlign: "center" }}>
              {keys[selected]}
            </div>
            <div className="date-next" onClick={nextState}></div>
          </div>
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
                  const strokeWidth = 0.2;

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
                        x2={posScale(17) * Math.cos(angle * i)}
                        y2={posScale(17) * Math.sin(angle * i)}
                        stroke="rgba(0,0,0, 1)"
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value1 * Math.cos(angle * i)}
                        cy={value1 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 1 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value2 * Math.cos(angle * i)}
                        cy={value2 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 2 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value3 * Math.cos(angle * i)}
                        cy={value3 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 3 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value4 * Math.cos(angle * i)}
                        cy={value4 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 4 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value5 * Math.cos(angle * i)}
                        cy={value5 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 5 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value6 * Math.cos(angle * i)}
                        cy={value6 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 6 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value7 * Math.cos(angle * i)}
                        cy={value7 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 7 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value8 * Math.cos(angle * i)}
                        cy={value8 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 8 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value9 * Math.cos(angle * i)}
                        cy={value9 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 9 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value10 * Math.cos(angle * i)}
                        cy={value10 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 10 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value11 * Math.cos(angle * i)}
                        cy={value11 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 11 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value12 * Math.cos(angle * i)}
                        cy={value12 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 12 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value13 * Math.cos(angle * i)}
                        cy={value13 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 13 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value14 * Math.cos(angle * i)}
                        cy={value14 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 14 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value15 * Math.cos(angle * i)}
                        cy={value15 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 15 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                      />
                      <circle
                        cx={value16 * Math.cos(angle * i)}
                        cy={value16 * Math.sin(angle * i)}
                        r={2}
                        fill={parseInt(v) === 16 ? "black" : "none"}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
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
