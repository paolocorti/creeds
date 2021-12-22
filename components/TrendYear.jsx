import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { degToRad, radToDeg, activitiesCode } from "./utils.js";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import TrendCircleYear from "./TrendCircleYear";
import EnergyDemandTrend from "./EnergyDemandTrend";
import { useStore } from "../store.js";
const isMobileWithTablet = false;

const TrendYear = ({
  selectedRegion,
  selectedMonth,
  globalData,
  energyDemand,
  width,
}) => {
  const marginLeft = 100;
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

  const keys = Object.keys(selectedData);

  const posScale = scaleLinear().domain([20, 0]).range([50, 250]);

  const timeScale = scaleTime()
    .range([0, 144])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = energyDemand.filter((v) => v.timeline_weekday === "Mon");

  const translateFactorStart = 81;
  const translateFactorEnd = 101;

  return (
    <div className="radial-overview mt-8">
      <div className="radial-overview-subtitle viz-explanation"></div>
      <div className="radial-overview-toolbar"></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="my-24">
          <svg width={width} height={350}>
            <g transform={`translate(${marginLeft},50)`}>
              {data.length &&
                data
                  // .filter((v, i) => {
                  //   return i === 0;
                  // })
                  .map((v, i) => {
                    return (
                      <g
                        key={i}
                        style={{
                          transtion: "opacity 0.2s",
                          opacity: 1,
                        }}
                      >
                        {v.actValues
                          .filter((v, i) => {
                            return (
                              i > translateFactorStart && i < translateFactorEnd
                            );
                          })
                          .map((a, j) => {
                            const index = activitiesCode[v.actCategory].index;
                            const value = posScale(index - 4);

                            return (
                              <g>
                                {j === 0 && (
                                  <text
                                    dx={-30}
                                    dy={value}
                                    textAnchor={"middle"}
                                    fontSize={internalWidth * 0.012}
                                  >
                                    {v.actCategory}
                                  </text>
                                )}
                                <g
                                  transform={`translate(${
                                    j *
                                    (internalWidth /
                                      (translateFactorEnd -
                                        translateFactorStart +
                                        1))
                                  },0)`}
                                >
                                  {i === 0 && (
                                    <g>
                                      <line
                                        x1={0}
                                        y1={250}
                                        x2={0}
                                        y2={80}
                                        stroke="#49494a"
                                        strokeWidth={0.5}
                                        strokeDasharray={"0.5 3"}
                                      />

                                      <text
                                        dx={0}
                                        dy={260}
                                        textAnchor={"middle"}
                                        fontSize={internalWidth * 0.012}
                                      >
                                        {moment(
                                          timeScale.invert(
                                            j + translateFactorStart
                                          )
                                        ).format("kk:mm")}
                                      </text>
                                    </g>
                                  )}
                                  <TrendCircleYear
                                    v={a}
                                    index={j + translateFactorStart}
                                    value={value}
                                    factor={v.actCategory}
                                    category={v.actCategory}
                                    color={v.actType}
                                    width={internalWidth}
                                  />
                                </g>
                              </g>
                            );
                          })}
                      </g>
                    );
                  })}
            </g>
            <g transform={`translate(${marginLeft}, 50)`}>
              <EnergyDemandTrend
                data={energyData}
                width={internalWidth}
                height={200}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrendYear;
