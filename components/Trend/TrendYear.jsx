import React, { useState, useEffect, useMemo } from "react";
import { scaleOrdinal, scaleLinear, scaleTime } from "d3-scale";
import { activitiesCode, sortBy, customSort } from "../utils.js";
import moment from "moment";
import TrendCategory from "./TrendCategory.jsx";
import { TooltipWithBounds, defaultStyles, useTooltip } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import { isMobile } from "react-device-detect";

Object.fromEntries =
  Object.fromEntries ||
  function (arr) {
    return arr.reduce(function (acc, curr) {
      acc[curr[0]] = curr[1];
      return acc;
    }, {});
  };

const formatDate = timeFormat("%-I:%M %p");

const tooltipStyles = {
  ...defaultStyles,
  backgroundColor: "rgba(0,0,0,.9)",
  border: "0px solid white",
  color: "white",
  borderRadius: "12px",
  padding: "10px",
  fontSize: "12px",
  lineHeight: "15px",
  textAlign: "left",
};

const getDate = (d) => {
  return d && d.time;
};
const getValue = (d) => parseFloat(d.value);

const isMobileWithTablet = false;

const TrendYear = ({ selectedRegion, selectedMonth, globalData, width }) => {
  const [mobile, setMobile] = useState(false);
  console.log("TrendYear render");
  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  const marginLeft = mobile ? 15 : 20;
  const marginRight = mobile ? 15 : 180;
  const internalWidth = width - marginLeft - marginRight;
  const selectedDataRegion = useMemo(() => {
    return globalData.filter((v) => v.region === selectedRegion);
  }, [selectedRegion]);

  const selectedMonthData = useMemo(() => {
    return selectedDataRegion.filter((v) => v.month === selectedMonth);
  }, [selectedMonth]);

  const selectedData = selectedMonthData;

  if (!selectedData) {
    return <></>;
  }

  const acts = useMemo(() => {
    return selectedData.map((v) => {
      return Object.fromEntries(
        Object.entries(v).filter(([key]) => {
          return key.includes("t_");
        })
      );
    });
  }, [selectedData]);

  const timeScale = scaleTime()
    .range([0, 144])
    .domain([new Date(`2021-01-01T04:00:00`), new Date(`2021-01-02T04:00:00`)]);

  const timeScale2 = scaleTime()
    .range([0, 48])
    .domain([new Date(`2021-01-01T00:00:00`), new Date(`2021-01-02T00:00:00`)]);

  const xScale = scaleTime()
    .range([0, internalWidth])
    .domain([new Date(`2021-01-01T15:00:00`), new Date(`2021-01-01T22:00:00`)]);

  const data = useMemo(() => {
    return acts.map((v) => {
      const actType = v.act_type;
      const actCategory = v.act_category;
      delete v.act_type;
      delete v.act_category;

      const values = Object.entries(v).map((o) => {
        return {
          time: timeScale.invert(parseInt(o[0].replace("t_", "")) - 1),
          value: parseFloat(o[1]),
        };
      });

      return {
        actType: actType,
        actCategory: actCategory,
        actValues: values,
      };
    });
  }, [acts]);

  const translateFactorStart = 66;
  const translateFactorEnd = 109;
  const height = 800;

  const sorted = useMemo(() => {
    return customSort({
      data: data,
      sortBy,
      sortField: "actCategory",
    });
  }, [data]);

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  return (
    <div className="radial-overview mt-0">
      <div className="radial-overview-subtitle viz-explanation"></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: isMobileWithTablet ? "column" : "row",
        }}
      >
        <div className="relative flex flex-col items-center">
          <svg width={width} height={height}>
            <g transform={`translate(${marginLeft}, 10)`}>
              <rect
                fill="#fff"
                width={
                  xScale(new Date(`2021-01-01T20:00:00`)) -
                  xScale(new Date(`2021-01-01T16:00:00`))
                }
                height={height - 100}
                x={xScale(new Date(`2021-01-01T16:00:00`))}
                y={10}
                fillOpacity={0.4}
              ></rect>
              {sorted.length &&
                sorted.map((v, i) => {
                  const rowIndex = parseInt(i / 2);
                  const value = rowIndex * 50;

                  const dataFiltered = v.actValues.filter((v, i) => {
                    return (
                      v.time >= timeScale.invert(translateFactorStart) &&
                      v.time <= timeScale.invert(translateFactorEnd)
                    );
                  });
                  return (
                    <g key={i} transform={`translate(0, ${value})`}>
                      <g transform={`translate(0, 20)`}>
                        {v.actType === "main" && (
                          <TrendCategory
                            data={dataFiltered}
                            width={internalWidth}
                            height={60}
                            index={translateFactorStart}
                            factor={v.actCategory}
                            category={v.actCategory}
                            color={v.actType}
                            start={translateFactorStart}
                            end={translateFactorEnd}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            tooltipData={tooltipData}
                            marginLeft={marginLeft}
                            marginTop={value}
                            tooltipLeft={tooltipLeft}
                            tooltipTop={tooltipTop}
                            isMobile={isMobile}
                          />
                        )}
                      </g>
                      {v.actValues
                        .filter((v, i) => {
                          return (
                            i > translateFactorStart && i <= translateFactorEnd
                          );
                        })
                        .map((a, j) => {
                          const index = activitiesCode[v.actCategory].index;

                          return (
                            <g key={`group-${j}`}>
                              {j === 0 && i % 2 === 0 && (
                                <text
                                  dx={
                                    isMobile ? marginLeft : internalWidth + 10
                                  }
                                  dy={isMobile ? 40 : 60}
                                  textAnchor={"start"}
                                  fontSize={internalWidth * 0.02}
                                  className="radial-hour-label"
                                  fontWeight="bold"
                                >
                                  {activitiesCode[v.actCategory].value}
                                </text>
                              )}
                              <g
                                transform={`translate(${
                                  j *
                                  (internalWidth /
                                    (translateFactorEnd -
                                      translateFactorStart -
                                      1))
                                },0)`}
                              >
                                {i === 0 && j % 2 == 0 && (
                                  <g>
                                    <line
                                      x1={0}
                                      y1={height - 88}
                                      x2={0}
                                      y2={5}
                                      stroke="#49494a"
                                      strokeWidth={j % 6 == 0 ? 0.3 : 0.8}
                                      strokeDasharray={
                                        j % 6 == 0 ? "0 0" : "0.5 3"
                                      }
                                    />
                                  </g>
                                )}
                              </g>

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
                                    <text
                                      dx={0}
                                      dy={0}
                                      textAnchor={"middle"}
                                      fontSize={internalWidth * 0.008}
                                      className="radial-hour-label"
                                    >
                                      {moment(
                                        timeScale.invert(
                                          j + translateFactorStart
                                        )
                                      ).format("hh a")}
                                    </text>
                                  </g>
                                )}
                              </g>
                            </g>
                          );
                        })}
                    </g>
                  );
                })}
            </g>
          </svg>
          {tooltipData && (
            <div>
              <TooltipWithBounds
                key={Math.random()}
                top={tooltipTop + 30}
                left={tooltipLeft + 10}
                style={tooltipStyles}
              >
                <b>{formatDate(getDate(tooltipData))}</b>
                <br />
                <span className="uppercase">{`${
                  activitiesCode[tooltipData.category].value
                }: `}</span>
                {`${getValue(tooltipData).toFixed(2)}%`}
              </TooltipWithBounds>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendYear;
