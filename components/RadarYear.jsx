import React, { useState, useEffect } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { degToRad, activitiesCode } from "./utils.js";
import ReactTooltip from "react-tooltip";
import moment from "moment";
import RadarCircleYear from "./RadarCircleYear";
import RadialRadar from "./RadialRadar";
import { useStore } from "../store.js";
const isMobileWithTablet = false;

let width = 1000;

const posScale = scaleLinear()
  .domain([0, 20])
  .range([50, isMobileWithTablet ? (width - 100) / 2 : (width - 200) / 2]);

const RadarYear = ({
  selectedRegion,
  selectedMonth,
  globalData,
  energyDemand,
}) => {
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

  const timeScale = scaleTime()
    .range([0, 144 / 3])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const energyData = energyDemand.filter((v) => v.timeline_weekday === "Mon");

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
        <div className="my-24 ">
          <svg width={width} height={width}>
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              {data.length &&
                data
                  // .filter((v, i) => {
                  //   return i === 0;
                  // })
                  .map((v, i) => {
                    const angle = degToRad((360 / 144) * 3);
                    const angle2 = degToRad(360 / 48);
                    console.log(i);

                    return (
                      <g
                        key={i}
                        style={{
                          transtion: "opacity 0.2s",
                          opacity: 1,
                          transform: "rotate(-30deg)",
                        }}
                      >
                        {v.actValues
                          .filter((v, i) => {
                            return i % 3 === 0;
                          })
                          .map((a, j) => {
                            const index = activitiesCode[v.actCategory].index;
                            const value = posScale(index);

                            return (
                              <g>
                                {i === 0 && (
                                  <g>
                                    <line
                                      x1={0}
                                      y1={0}
                                      x2={posScale(22) * Math.cos(angle2 * j)}
                                      y2={posScale(22) * Math.sin(angle2 * j)}
                                      stroke="rgba(0,0,0,0.5)"
                                      strokeWidth={0.2}
                                    />
                                    <circle
                                      className="cursor-pointer"
                                      cx={posScale(22) * Math.cos(angle2 * j)}
                                      cy={posScale(22) * Math.sin(angle2 * j)}
                                      r={15}
                                      fill={
                                        hover && hover === `i${i}`
                                          ? "rgba(155, 210, 211,1)"
                                          : "rgba(155, 210, 211,0.5)"
                                      }
                                      strokeWidth={
                                        hover && hover === `i${i}` ? 1 : 0.5
                                      }
                                      data-tip={`${moment(
                                        timeScale.invert(j)
                                      ).format("h:mm:ss a")}`}
                                      data-type="dark"
                                      onMouseEnter={() => {
                                        ReactTooltip.rebuild();
                                      }}
                                      // onMouseLeave={() => {
                                      //   useStore.setState({ hover: null });
                                      // }}
                                    />
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
                                />
                              </g>
                            );
                          })}
                      </g>
                    );
                  })}
            </g>
            <g transform={`translate(${width / 2}, ${width / 2})`}>
              <RadialRadar data={energyData} width={300} height={300} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RadarYear;
