import React, { useRef, useState, useEffect, useCallback } from "react";
import { Group } from "@visx/group";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { scaleTime, scaleLinear, scalePower } from "@visx/scale";
import { curveLinear } from "@visx/curve";
import { activitiesCode, colorByCategory } from "../utils.js";
import { bisector } from "d3-array";

import { timeFormat } from "d3-time-format";
import { localPoint } from "@visx/event";

const bisectDate = bisector((d) => d.time).left;

function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const getDate = (d) => {
  return d && d.time;
};
const getValue = (d) => parseFloat(d.value);

const TrendCategory = ({
  width,
  height,
  data,
  factor,
  tooltipData,
  showTooltip,
  hideTooltip,
  marginLeft,
  marginTop,
  tooltipLeft,
}) => {
  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, getDate),
  });
  const yScale = scaleLinear({
    domain: [0, 0.5],
    clamp: false,
  });

  yScale.range([40, 0]);

  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const shifted = x - marginLeft;
      const x0 = xScale.invert(shifted);
      const index = bisectDate(data, x0, 1);

      const d0 = data[index - 1];
      const d1 = data[index];

      let d = d0;
      if (d1 && getDate(d1)) {
        d =
          x0.valueOf() - getDate(d0).valueOf() >
          getDate(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }

      d.factor = factor;

      showTooltip({
        tooltipData: d,
        tooltipLeft: shifted,
        tooltipTop: yScale(getValue(d)) + marginTop,
      });
    },
    [showTooltip, yScale, xScale]
  );

  return (
    <Group left={0} top={0}>
      <AreaClosed
        curve={curveLinear}
        data={data}
        x={(d) => {
          return xScale(getDate(d));
        }}
        y={(d) => {
          return yScale(getValue(d));
        }}
        yScale={yScale}
        fill={colorByCategory[factor]}
      />

      <Bar
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        rx={14}
        onTouchStart={handleTooltip}
        onTouchMove={handleTooltip}
        onMouseMove={handleTooltip}
        onMouseLeave={() => hideTooltip()}
      />
      {tooltipData && tooltipData.factor === factor && (
        <g>
          <Line
            from={{ x: tooltipLeft, y: 0 }}
            to={{ x: tooltipLeft, y: height - 20 }}
            stroke={"black"}
            strokeWidth={0.5}
            pointerEvents="none"
            strokeDasharray="2,2"
          />
        </g>
      )}
    </Group>
  );
};

export default TrendCategory;
