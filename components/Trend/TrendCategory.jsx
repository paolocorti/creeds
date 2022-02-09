import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { AreaClosed } from "@visx/shape";
import { scaleTime, scaleLinear, scalePower } from "@visx/scale";
import { curveBasisOpen } from "@visx/curve";
import { activitiesCode, colorByCategory } from "../utils.js";

export const blue = "#999";
export const background = "#fff";
const strokeColor = "#744cca";

function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d) => {
  return d && d.timeline_time
    ? new Date(`2021-01-01T${d.timeline_time}:00`).valueOf()
    : null;
};

const TrendCategory = ({
  width,
  height,
  data,
  svgWidth,
  factor,
  category,
  start,
  end,
}) => {
  // scales
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, date),
  });

  const yScale = scaleLinear({
    domain: [0, 0.15],
  });

  const timeScale = scaleLinear({
    domain: [start, end],
    range: [0, width],
    clamp: true,
  });

  if (width < 10) return null;

  yScale.range([30, 0]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  return (
    <Group left={0} top={0}>
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
        x={(d, i) => {
          return timeScale(i);
        }}
        y={(d) => yScale(parseFloat(d))}
        yScale={yScale}
        fill={colorByCategory[factor]}
      />
    </Group>
  );
};

export default TrendCategory;
