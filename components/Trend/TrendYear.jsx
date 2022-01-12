import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import {
  degToRad,
  radToDeg,
  activitiesCode,
  sortBy,
  customSort,
} from "../utils.js";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import TrendCircleYear from "./TrendCircleYear";
import EnergyDemandTrend from "./EnergyDemandTrend";
import { useStore } from "../../store.js";
import TrendCategory from "./TrendCategory.jsx";
const isMobileWithTablet = false;

const TrendYear = ({
  selectedRegion,
  selectedMonth,
  globalData,
  energyDemand,
  width,
}) => {
  const marginLeft = 140;
  const marginRight = 20;
  const internalWidth = width - marginLeft - marginRight;
  const hover = useStore((state) => state.hover);
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

  console.log("selectedData", selectedData);

  const keys = Object.keys(selectedData);

  const posScale = scaleLinear()
    .domain([20, 0])
    .range([50, width / 3]);

  const timeScale = scaleTime()
    .range([0, 144])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = energyDemand.filter((v) => v.timeline_weekday === "Mon");

  // const translateFactorStart = 40;
  // const translateFactorEnd = 100;

  const translateFactorStart = 48;
  const translateFactorEnd = 101;
  const height = 1020;

  const sorted = customSort({
    data: data,
    sortBy,
    sortField: "actCategory",
  });

  return (
    <div className="radial-overview mt-8">
      <div className="radial-overview-subtitle viz-explanation"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="">
          <div className="radial-overview-toolbar">
            The blue external trend indicates the energy consumption by hour.
            Each circle is an activity, the colors indicate macro-
          </div>
          <svg width={width} height={height}>
            <g transform={`translate(${marginLeft}, 100)`}>
              {sorted.length &&
                sorted
                  // .filter((v, i) => {
                  //   return i % 2 === 0;
                  // })
                  .map((v, i) => {
                    const rowIndex = parseInt(i / 2);
                    const value = rowIndex * 60;

                    return (
                      <g key={i} transform={`translate(0, ${value})`}>
                        {/* <line
                          x1={0}
                          y1={0 + 20}
                          x2={internalWidth}
                          y2={20}
                          stroke="#49494a"
                          strokeWidth={0.5}
                          strokeDasharray={"0.5 3"}
                        />
                        <line
                          x1={0}
                          y1={0 + 40}
                          x2={internalWidth}
                          y2={40}
                          stroke="#49494a"
                          strokeWidth={0.5}
                          strokeDasharray={"0.5 3"}
                        /> */}
                        <g transform={`translate(0, 20)`}>
                          {v.actType === "main" && (
                            <TrendCategory
                              data={v.actValues}
                              width={internalWidth}
                              height={100}
                              index={translateFactorStart}
                              factor={v.actCategory}
                              category={v.actCategory}
                              color={v.actType}
                              start={translateFactorStart}
                              end={translateFactorEnd}
                            />
                          )}
                        </g>
                        {/* <g transform={`translate(0, 40)`}>
                          {v.actType === "secondary" && (
                            <TrendCategory
                              data={v.actValues}
                              width={internalWidth}
                              height={100}
                              index={translateFactorStart}
                              factor={v.actCategory}
                              category={v.actCategory}
                              color={v.actType}
                            />
                          )}
                        </g> */}

                        {v.actValues
                          .filter((v, i) => {
                            return (
                              i > translateFactorStart && i < translateFactorEnd
                            );
                          })
                          .map((a, j) => {
                            const index = activitiesCode[v.actCategory].index;

                            return (
                              <g>
                                {j === 0 && i % 2 === 0 && (
                                  <text
                                    dx={-20}
                                    dy={50}
                                    textAnchor={"end"}
                                    fontSize={internalWidth * 0.02}
                                    className="radial-hour-label"
                                    fontWeight="bold"
                                  >
                                    {activitiesCode[v.actCategory].value}
                                  </text>
                                )}
                                {/* {j === 0 && i % 2 === 0 && (
                                  <text
                                    dx={-30}
                                    dy={4 + 30}
                                    textAnchor={"end"}
                                    fontSize={internalWidth * 0.012}
                                    className="radial-hour-label"
                                  >
                                    primary
                                  </text>
                                )} */}
                                {/* {j === 0 && i % 2 === 0 && (
                                  <text
                                    dx={-30}
                                    dy={4 + 60}
                                    textAnchor={"end"}
                                    fontSize={internalWidth * 0.012}
                                    className="radial-hour-label"
                                  >
                                    secondary
                                  </text>
                                )} */}

                                <g
                                  transform={`translate(${
                                    j *
                                    (internalWidth /
                                      (translateFactorEnd -
                                        translateFactorStart -
                                        1))
                                  },0)`}
                                >
                                  {i === 0 && j % 6 == 0 && (
                                    <g>
                                      <line
                                        x1={0}
                                        y1={height - 200}
                                        x2={0}
                                        y2={0}
                                        stroke="#49494a"
                                        strokeWidth={0.5}
                                        strokeDasharray={"0.5 3"}
                                      />
                                      <text
                                        dx={0}
                                        dy={height - 160}
                                        textAnchor={"middle"}
                                        fontSize={internalWidth * 0.01}
                                        className="radial-hour-label"
                                      >
                                        {moment(
                                          timeScale.invert(
                                            j + translateFactorStart
                                          )
                                        ).format("hh:mm a")}
                                      </text>
                                    </g>
                                  )}
                                  {/* {v.actType === "main" && (
                                    <TrendCircleYear
                                      v={a}
                                      index={j + translateFactorStart}
                                      value={20}
                                      factor={v.actCategory}
                                      category={v.actCategory}
                                      color={v.actType}
                                      width={internalWidth}
                                    />
                                  )} */}

                                  {/* {v.actType === "secondary" && (
                                    <TrendCircleYear
                                      v={a}
                                      index={j + translateFactorStart}
                                      value={40}
                                      factor={v.actCategory}
                                      category={v.actCategory}
                                      color={v.actType}
                                      width={internalWidth}
                                    />
                                  )} */}
                                </g>
                              </g>
                            );
                          })}
                      </g>
                    );
                  })}
            </g>
            <g transform={`translate(${marginLeft}, 0)`}>
              <EnergyDemandTrend
                data={energyData}
                width={internalWidth}
                height={100}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrendYear;
