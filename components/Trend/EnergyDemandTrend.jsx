import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { AreaClosed } from "@visx/shape";
import { scaleTime, scaleLog, NumberLike, scaleLinear } from "@visx/scale";
import { curveBasisOpen } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft } from "@visx/axis";
import { GridRadial, GridAngle } from "@visx/grid";
import { animated, useSpring } from "react-spring";

export const blue = "#999";
export const background = "#fff";
const strokeColor = "#744cca";

// utils
function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

// accessors
const date = (d) => {
  return d && d.timeline_time
    ? new Date(`2021-01-01T${d.timeline_time}:00`).valueOf()
    : null;
};
const close = (d) =>
  d && d.kw_demand_autumn ? Number(d.kw_demand_autumn) : null;
const formatTicks = (val) => String(val);

const EnergyDemandTrend = ({ width, height, data, svgWidth }) => {
  // scales
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, date),
  });
  const yScale = scaleLinear({
    domain: extent(data, close),
  });

  // console.log(yScale.domain());

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;

  if (width < 10) return null;

  // Update scale output to match component dimensions
  yScale.range([height, 0]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  return (
    <Group left={-20} top={0}>
      {/* <AxisLeft
        top={-height / 2}
        scale={reverseYScale}
        numTicks={5}
        tickStroke="none"
        tickLabelProps={(val) => ({
          fontSize: 8,
          fill: blue,
          fillOpacity: 1,
          textAnchor: "middle",
          dx: "1em",
          dy: "-0.5em",
          stroke: strokeColor,
          strokeWidth: 0.5,
          paintOrder: "stroke",
          fontFamily: "Arial",
        })}
        tickFormat={formatTicks}
        hideAxisLine
      /> */}
      <AreaClosed
        curve={curveBasisOpen}
        data={data}
        x={(d) => xScale(date(d))}
        y={(d) => yScale(close(d))}
        yScale={yScale}
        strokeWidth={1}
        fill="#232953"
      />
    </Group>
  );
};

export default EnergyDemandTrend;
