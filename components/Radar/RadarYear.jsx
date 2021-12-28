import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { degToRad, radToDeg, activitiesCode } from "../utils.js";
import moment from "moment";
import RadarCircleYear from "./RadarCircleYear";
import EnergyDemandRadial from "./EnergyDemandRadial";
import { useStore } from "../../store.js";
import EnergyPriceRadial from "./EnergyPriceRadial.jsx";
const isMobileWithTablet = false;

const sortBy = [
  "sl",
  "et",
  "pc",
  "hc",
  "ha",
  "tv",
  "it",
  "tw",
  "wr",
  "ab",
  "sh",
  "ot",
  "fp",
  "ln",
  "dw",
  "hu",
];

const customSort = ({ data, sortBy, sortField }) => {
  const sortByObject = sortBy.reduce((obj, item, index) => {
    return {
      ...obj,
      [item]: index,
    };
  }, {});
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
  );
};

const RadarYear = ({
  selectedRegion,
  selectedMonth,
  globalData,
  energyDemand,
  width,
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
    .domain([20, 0])
    .range([50, isMobileWithTablet ? (width - 100) / 2 : (width * 0.8) / 2]);

  const timeScale = scaleTime()
    .range([0, 144 / 3])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = energyDemand.filter((v) => v.timeline_weekday === "Mon");

  const sorted = customSort({
    data: data,
    sortBy,
    sortField: "actCategory",
  });


  return (
    <div className="radial-overview mt-8">
      <div className="radial-overview-subtitle viz-explanation"></div>
      <div className="radial-overview-toolbar">
        {
          hoverTime &&
          <div className="flex flex-col">
            <div>
              <b>
                {moment(timeScale.invert(hoverTime)).format(
                  "h:mm a"
                )}
              </b>
            </div>
            <div>
              Top activity: sleeping | Energy consumpion: | Energy price:
            </div>
          </div>
        }
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="my-24 ">
          <svg width={width} height={width}>
            <circle cx={width / 2} cy={width / 2} r={width / 2} fill={"#fff"} />
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              <EnergyPriceRadial
                data={energyData}
                width={width * 0.9}
                height={width * 0.9}
                svgWidth={width}
              />
            </g>
            <circle
              cx={width / 2}
              cy={width / 2}
              r={width * 0.4}
              fill={"#ecf6f4"}
            />
            <g transform={`translate(${width / 2}, ${width / 2})`}>
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
                            const index = activitiesCode[v.actCategory].index;
                            const value = posScale(index - 3);

                            return (
                              <g
                                transform={`translate(0,0) rotate(${(360 / 48) * j
                                  })`}
                                style={{
                                  opacity: hoverCategory
                                    ? hoverCategory === v.actCategory
                                      ? 1
                                      : 0.2
                                    :
                                    hoverTime ?
                                      hoverTime === j
                                        ? 1
                                        : 0.2 : 1
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
                                      transform={`translate(-4, ${(width / 2) * 0.9
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
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <path
                                        d="M3.98936 0.734443L0.165527 4.55835L3.98929 8.38219L7.81313 4.55828L3.98936 0.734443Z"
                                        fill={hoverTime === j ? '#000' : "#fff"}
                                        stroke={"#000"}
                                      />
                                    </g>

                                    {j % 2 === 0 && (
                                      <text
                                        dx={0}
                                        dy={(width / 2) * 0.965}
                                        textAnchor={"middle"}
                                        className="radial-hour-label"
                                        onMouseEnter={() => {
                                          useStore.setState({
                                            hoverTime: j,
                                          });
                                        }}
                                        onMouseLeave={() => {
                                          useStore.setState({ hoverTime: null });
                                        }}
                                      >
                                        {moment(timeScale.invert(j)).format(
                                          "ha"
                                        )}
                                      </text>
                                    )}
                                  </g>
                                )}
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
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              <EnergyDemandRadial
                data={energyData}
                width={width * 0.3}
                height={width * 0.3}
                svgWidth={width}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RadarYear;
