import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import {
  degToRad,
  radToDeg,
  activitiesCode,
  sortBy,
  customSort,
} from "../utils.js";
import moment from "moment";
import RadarCircleYear from "./RadarCircleYear";
import EnergyDemandRadial from "./EnergyDemandRadial";
import { useStore } from "../../store.js";
import EnergyPriceRadial from "./EnergyPriceRadial.jsx";
const isMobileWithTablet = false;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

const RadarYear = ({
  selectedRegion,
  selectedMonth,
  globalData,
  energyDemand,
  width,
  setSelectedMonth,
}) => {
  const hover = useStore((state) => state.hover);
  const hoverCategory = useStore((state) => state.hoverCategory);
  const hoverTime = useStore((state) => state.hoverTime);
  const selectedDataRegion = globalData.filter(
    (v) => v.region === selectedRegion
  );
  const selectedMonthData = selectedDataRegion.filter(
    (v) => v.month === selectedMonth
  );

  const selectedData = selectedMonthData;

  if (!selectedData) {
    return <></>;
  }

  const acts = selectedData.map((v) => {
    return Object.fromEntries(
      Object.entries(v).filter(([key]) => {
        return key.includes("t_");
      })
    );
  });

  const data = acts.map((v) => {
    const actType = v.act_type;
    const actCategory = v.act_category;
    delete v.act_type;
    delete v.act_category;

    return {
      actType: actType,
      actCategory: actCategory,
      actValues: Object.values(v),
    };
  });

  const keys = Object.keys(selectedData);

  const posScale = scaleLinear()
    .domain([14, 0])
    .range([
      width * 0.15,
      isMobileWithTablet ? (width - 100) / 2 : (width * 0.8) / 2,
    ]);

  const timeScale = scaleTime()
    .range([0, 144 / 3])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = energyDemand.filter((v) => v.timeline_weekday === "Mon");

  const sorted = customSort({
    data: data,
    sortBy,
    sortField: "actCategory",
  });

  console.log("selectedMonth", selectedMonth);

  return (
    <div className="radial-overview mt-8">
      <div className="radial-overview-subtitle viz-explanation"></div>
      <div className="radial-overview-toolbar">
        {hoverTime && (
          <div className="flex flex-col">
            <div>
              <b>{moment(timeScale.invert(hoverTime)).format("h:mm a")}</b>
            </div>
            <div>
              Top activity: sleeping | Energy consumpion: | Energy price:
            </div>
          </div>
        )}
        {!hoverTime && (
          <div className="flex flex-col">
            <div>
              Select the month or click on play. Mouse over on the graphic to
              explore the data
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="my-12 relative flex">
          <svg width={width * 1.2} height={width * 1.2}>
            <circle
              cx={width * 0.6}
              cy={width * 0.6}
              r={width / 2}
              fill={"#fff"}
              style={{ pointerEvents: "none" }}
            />
            <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
              <EnergyPriceRadial
                data={energyData}
                width={width * 0.9}
                height={width * 0.9}
                svgWidth={width}
              />
            </g>
            <circle
              cx={width * 0.6}
              cy={width * 0.6}
              r={width * 0.4}
              fill={"#ecf6f4"}
            />
            <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
              {sorted.length &&
                sorted
                  // .filter((v, i) => {
                  //   return i === 2;
                  // })
                  .map((v, i) => {
                    const degAngle = (360 / 144) * 3;
                    const angle = degToRad(degAngle);
                    const angle2 = degToRad(360 / 48);

                    return (
                      <g
                        key={i}
                        style={{
                          transtion: "opacity 0.2s",
                          opacity: 1,
                          transform: "rotate(-120deg)",
                        }}
                      >
                        {v.actValues
                          .filter((v, i) => {
                            return i % 3 === 0;
                          })
                          .map((a, j) => {
                            //const index = activitiesCode[v.actCategory].index;
                            const index = parseInt(i / 2);
                            const value = posScale(index + 2);
                            return (
                              <g
                                transform={`translate(0,0) rotate(${
                                  (360 / 48) * j
                                })`}
                                style={{
                                  opacity: hoverCategory
                                    ? hoverCategory === v.actCategory
                                      ? 1
                                      : 0.2
                                    : hoverTime
                                    ? hoverTime === j
                                      ? 1
                                      : 0.2
                                    : 1,
                                }}
                              >
                                {i === 0 && (
                                  <g>
                                    <line
                                      x1={0}
                                      y1={0}
                                      x2={0}
                                      y2={(width / 2) * 0.9}
                                      stroke="#49494a"
                                      strokeWidth={0.8}
                                      strokeDasharray={"0.5 3"}
                                    />
                                    <g
                                      transform={`translate(-4, ${
                                        (width / 2) * 0.9
                                      })`}
                                      onMouseEnter={() => {
                                        useStore.setState({
                                          hoverTime: j,
                                        });
                                      }}
                                      onMouseLeave={() => {
                                        useStore.setState({ hoverTime: null });
                                      }}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      <path
                                        d="M3.98936 0.734443L0.165527 4.55835L3.98929 8.38219L7.81313 4.55828L3.98936 0.734443Z"
                                        fill={hoverTime === j ? "#000" : "#fff"}
                                        stroke={"#000"}
                                      />
                                    </g>

                                    {j % 2 === 0 && (
                                      <text
                                        dx={0}
                                        dy={(width / 2) * 0.98}
                                        textAnchor={"middle"}
                                        className={
                                          j > 26 || j < 6
                                            ? "radial-hour-label-rot"
                                            : "radial-hour-label"
                                        }
                                        onMouseEnter={() => {
                                          useStore.setState({
                                            hoverTime: j,
                                          });
                                        }}
                                        onMouseLeave={() => {
                                          useStore.setState({
                                            hoverTime: null,
                                          });
                                        }}
                                        style={{
                                          fontSize:
                                            width * 0.02 < 14
                                              ? width * 0.02
                                              : 14,
                                        }}
                                      >
                                        {moment(timeScale.invert(j)).format(
                                          "ha"
                                        )}
                                      </text>
                                    )}
                                  </g>
                                )}
                                {v.actType === "main" && (
                                  <RadarCircleYear
                                    angle={angle}
                                    v={a}
                                    index={j}
                                    value={value}
                                    factor={v.actCategory}
                                    category={v.actCategory}
                                    color={v.actType}
                                    width={width}
                                  />
                                )}
                                {/* {j === 40 && (
                                  <text
                                    dx={12}
                                    dy={value + 4}
                                    textAnchor={"middle"}
                                    fontSize={width * 0.012}
                                    style={{
                                      textTransform: "uppercase",
                                      transform: "rotateZ(180deg)",
                                    }}
                                  >
                                    {v.actCategory}
                                  </text>
                                )} */}
                              </g>
                            );
                          })}
                      </g>
                    );
                  })}
            </g>
            <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
              <EnergyDemandRadial
                data={energyData}
                width={width * 0.3}
                height={width * 0.3}
                svgWidth={width}
              />
            </g>

            <path
              id="jan"
              onClick={() => setSelectedMonth("1")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "1" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, -14, 14)}
            />
            <path
              id="feb"
              onClick={() => setSelectedMonth("2")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "2" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 16, 44)}
            />
            <path
              id="mar"
              onClick={() => setSelectedMonth("3")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "3" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 46, 74)}
            />
            <path
              id="apr"
              onClick={() => setSelectedMonth("4")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "4" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 76, 104)}
            />
            <path
              id="may"
              onClick={() => setSelectedMonth("5")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "5" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 106, 134)}
            />
            <path
              id="jun"
              onClick={() => setSelectedMonth("6")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "6" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 136, 164)}
            />
            <path
              id="jul"
              onClick={() => setSelectedMonth("7")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "7" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 166, 194)}
            />
            <path
              id="aug"
              onClick={() => setSelectedMonth("8")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "8" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 196, 224)}
            />
            <path
              id="sep"
              onClick={() => setSelectedMonth("9")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "9" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 226, 254)}
            />
            <path
              id="oct"
              onClick={() => setSelectedMonth("10")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "10" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 256, 284)}
            />
            <path
              id="nov"
              onClick={() => setSelectedMonth("11")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "11" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 286, 314)}
            />
            <path
              id="dec"
              onClick={() => setSelectedMonth("12")}
              fill="none"
              style={{ pointerEvents: "none" }}
              stroke={selectedMonth === "12" ? "#000" : "#fff"}
              stroke-width="5"
              d={describeArc(width * 0.6, width * 0.6, width * 0.54, 316, 344)}
            />
            <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
              {[...Array(12).keys()].map((v) => {
                const angle = v * 30;
                return (
                  <text
                    x={width * 0.56 * Math.cos(degToRad(angle - 90))}
                    y={width * 0.56 * Math.sin(degToRad(angle - 90))}
                    dy={0}
                    textAnchor="middle"
                    fontSize={width * 0.02 < 14 ? width * 0.02 : 14}
                    fill="#000"
                    className={"radial-hour-label-months"}
                    style={{
                      transform: `rotate(${angle}deg)`,
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedMonth(String(v + 1))}
                  >
                    {months[v].toUpperCase()}
                  </text>
                );
              })}
            </g>
          </svg>

          {/* <svg width={width * 1.2} height={width * 1.2} style={{ position: 'absolute', zIndex: 0, }}>
            
          </svg> */}
        </div>
      </div>
    </div>
  );
};

export default RadarYear;
