import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { degToRad, activities } from "../utils.js";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import RadarCircle from "./RadarCircle";
const isMobileWithTablet = false;

const colorScale = scaleOrdinal()
  .domain([1, 2, 3, 4, 5, 6])
  .range(["#F29B9B", "#A2B0A2", "#7F69EA", "#8CC2D1", "#EDC03B", "#BD321A"]);

const gradScale = scaleLinear().domain([0, 360]).range([90, 450]);

let width = 1000;

const posScale = scaleLinear()
  .domain([0, 17])
  .range([0, isMobileWithTablet ? (width - 100) / 2 : (width - 200) / 2]);

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
    .range([0, 144 / 3])
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
        <div className="my-24 ">
          <svg width={width} height={width}>
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              {data.length &&
                data
                  .filter((v, i) => {
                    console.log(v, i);
                    return i % 3 === 0;
                  })
                  .map((v, i) => {
                    const angle = degToRad(360 / (data.length / 3));
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
                          x2={posScale(20) * Math.cos(angle * i)}
                          y2={posScale(20) * Math.sin(angle * i)}
                          stroke="rgba(0,0,0,0.5)"
                          strokeWidth={0.1}
                        />

                        <circle
                          className="cursor-pointer"
                          cx={posScale(20) * Math.cos(angle * i)}
                          cy={posScale(20) * Math.sin(angle * i)}
                          r={15}
                          fill={
                            hover && hover === `i${i}`
                              ? "rgba(155, 210, 211,1)"
                              : "rgba(155, 210, 211,0.5)"
                          }
                          strokeWidth={hover && hover === `i${i}` ? 1 : 0.5}
                          data-tip={`${moment(timeScale.invert(i)).format(
                            "h:mm:ss a"
                          )}`}
                          data-type="dark"
                          onMouseEnter={() => {
                            setHover(`i${i}`);
                            ReactTooltip.rebuild();
                          }}
                          onMouseLeave={() => {
                            setHover(null);
                          }}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value1}
                          factor={1}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value2}
                          factor={2}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value3}
                          factor={3}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value4}
                          factor={4}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value5}
                          factor={5}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value6}
                          factor={6}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value7}
                          factor={7}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value8}
                          factor={8}
                        />
                        <RadarCircle
                          angle={angle}
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          index={i}
                          value={value9}
                          factor={9}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value10}
                          factor={10}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value11}
                          factor={11}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value12}
                          factor={12}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value13}
                          factor={13}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value14}
                          factor={14}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value15}
                          factor={15}
                        />
                        <RadarCircle
                          v={v}
                          hover={hover}
                          setHover={setHover}
                          angle={angle}
                          index={i}
                          value={value16}
                          factor={61}
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
