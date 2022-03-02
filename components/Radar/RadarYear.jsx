import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import {
  degToRad,
  radToDeg,
  regionLabels,
  sortBy,
  customSort,
} from "../utils.js";
import moment from "moment";
import RadarCircleYear from "./RadarCircleYear";
import InnerRadial from "./InnerRadial";
import { useStore } from "../../store.js";
import OuterRadial from "./OuterRadial.jsx";
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
  energyPrice,
  width,
  setSelectedMonth,
  showPrice = true,
  showDemand = true,
  selectedCategory,
  innerLabel,
}) => {
  const hover = useStore((state) => state.hover);
  const hoverCategory = useStore((state) => state.hoverCategory);
  const hoverTime = useStore((state) => state.hoverTime);
  const selectedDataRegion = globalData.filter(
    (v) => v.region === selectedRegion
  );

  let selectedMonthData;
  if (selectedMonth) {
    selectedMonthData = selectedDataRegion.filter(
      (v) => v.month === selectedMonth
    );
  } else {
    selectedMonthData = selectedDataRegion;
  }

  const selectedEnergyDataRegion = energyDemand.filter(
    (v) => v.region === selectedRegion
  );
  const selectedEnergyMonthData = selectedEnergyDataRegion.filter(
    (v) => v.month === selectedMonth
  );

  const selectedEnergyPriceMonthData = energyPrice.filter(
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

  const timeScale2 = scaleTime()
    .range([0, 24])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = selectedEnergyMonthData.map((v) => {
    const filtered = Object.entries(v).filter(([key]) => {
      return key !== "month" && key !== "region" && key !== "season";
    });

    return filtered.map((v) => {
      return {
        time: timeScale.invert(parseInt(v[0])),
        value: parseFloat(v[1]),
      };
    });
  });

  const energyPriceData = selectedEnergyPriceMonthData.map((v) => {
    const filtered = Object.entries(v).filter(([key]) => {
      return key !== "month" && key !== "region" && key !== "season";
    });

    return filtered.map((v) => {
      return {
        time: timeScale2.invert(parseInt(v[0])),
        value: parseFloat(v[1]),
      };
    });
  });

  const sorted = customSort({
    data: data,
    sortBy,
    sortField: "actCategory",
  });

  return (
    <div className="radial-overview">
      {/* <div className="radial-overview-subtitle viz-explanation"></div>
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
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="my-4 relative flex">
          <svg width={width * 1.2} height={width * 1.2}>
            <circle
              cx={width * 0.6}
              cy={width * 0.6}
              r={width / 2}
              fill={"#ffd6cc"}
              style={{ pointerEvents: "none" }}
            />
            <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
              {showPrice && (
                <OuterRadial
                  data={energyData.length ? energyData[0] : []}
                  width={width * 0.95}
                  height={width * 0.95}
                  svgWidth={width}
                />
              )}
            </g>
            <circle
              cx={width * 0.6}
              cy={width * 0.6}
              r={width * 0.39}
              fill={"#ffd6cc"}
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
                                  opacity:
                                    hoverCategory || selectedCategory
                                      ? hoverCategory === v.actCategory ||
                                        selectedCategory === v.actCategory
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
                                      strokeWidth={0.5}
                                      strokeOpacity={0.5}
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
                                        fill={hoverTime === j ? "#000" : "none"}
                                        stroke="#000"
                                        strokeWidth={0.5}
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
                                    time={moment(timeScale.invert(j)).format(
                                      "h:mma"
                                    )}
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

            {showDemand ? (
              <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
                <InnerRadial
                  data={energyPriceData.length ? energyPriceData[0] : []}
                  width={width * 0.3}
                  height={width * 0.3}
                  svgWidth={width}
                />
              </g>
            ) : (
              <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
                <circle fill="#ffd6cc" cx={0} cy={0} r={width * 0.1} />
                <text
                  x={0}
                  y={4}
                  textAnchor="middle"
                  fontSize={10}
                  style={{ textTransform: "uppercase" }}
                >
                  {innerLabel || regionLabels[selectedRegion]}
                </text>
              </g>
            )}
            {selectedMonth && (
              <g>
                <path
                  id="jan"
                  onClick={() => (selectedMonth ? setSelectedMonth("1") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "1" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "1" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    -14,
                    14
                  )}
                />

                <path
                  id="feb"
                  onClick={() => (selectedMonth ? setSelectedMonth("2") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "2" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "2" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    16,
                    44
                  )}
                />
                <path
                  id="mar"
                  onClick={() => (selectedMonth ? setSelectedMonth("3") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "3" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "3" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    46,
                    74
                  )}
                />
                <path
                  id="apr"
                  onClick={() => (selectedMonth ? setSelectedMonth("4") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "4" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "4" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    76,
                    104
                  )}
                />
                <path
                  id="may"
                  onClick={() => (selectedMonth ? setSelectedMonth("5") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "5" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "5" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    106,
                    134
                  )}
                />
                <path
                  id="jun"
                  onClick={() => (selectedMonth ? setSelectedMonth("6") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "6" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "6" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    136,
                    164
                  )}
                />
                <path
                  id="jul"
                  onClick={() => (selectedMonth ? setSelectedMonth("7") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "7" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "7" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    166,
                    194
                  )}
                />
                <path
                  id="aug"
                  onClick={() => (selectedMonth ? setSelectedMonth("8") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "8" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "8" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    196,
                    224
                  )}
                />
                <path
                  id="sep"
                  onClick={() => (selectedMonth ? setSelectedMonth("9") : null)}
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "9" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "9" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    226,
                    254
                  )}
                />
                <path
                  id="oct"
                  onClick={() =>
                    selectedMonth ? setSelectedMonth("10") : null
                  }
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "10" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "10" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    256,
                    284
                  )}
                />
                <path
                  id="nov"
                  onClick={() =>
                    selectedMonth ? setSelectedMonth("11") : null
                  }
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "11" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "11" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    286,
                    314
                  )}
                />
                <path
                  id="dec"
                  onClick={() =>
                    selectedMonth ? setSelectedMonth("12") : null
                  }
                  fill="none"
                  style={{
                    pointerEvents: "none",
                    opacity: selectedMonth ? 1 : 0.4,
                  }}
                  stroke={selectedMonth === "12" ? "#000" : "#000"}
                  strokeWidth={selectedMonth === "12" ? 2 : 0.4}
                  d={describeArc(
                    width * 0.6,
                    width * 0.6,
                    width * 0.505,
                    316,
                    344
                  )}
                />
              </g>
            )}

            {selectedMonth && (
              <g transform={`translate(${width * 0.6}, ${width * 0.6})`}>
                {[...Array(12).keys()].map((v) => {
                  const angle = v * 30;
                  return (
                    <text
                      x={width * 0.521 * Math.cos(degToRad(angle - 90))}
                      y={width * 0.521 * Math.sin(degToRad(angle - 90))}
                      dy={0}
                      textAnchor="middle"
                      fontSize={width * 0.02 < 14 ? width * 0.02 : 14}
                      fill="#000"
                      className={"radial-hour-label-months"}
                      style={{
                        transform: `rotate(${angle}deg)`,
                        cursor: "pointer",
                        opacity: selectedMonth ? 1 : 0.4,
                      }}
                      onClick={() =>
                        selectedMonth ? setSelectedMonth(String(v + 1)) : null
                      }
                    >
                      {months[v].toUpperCase()}
                    </text>
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RadarYear;
