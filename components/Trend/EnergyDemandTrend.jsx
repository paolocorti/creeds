import React, { useRef, useState, useEffect, useCallback } from "react";
import { Group } from "@visx/group";
import { AreaClosed } from "@visx/shape";
import { scaleTime, scaleLog, NumberLike, scaleLinear } from "@visx/scale";
import { curveLinear } from "@visx/curve";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
  useTooltip,
} from "@visx/tooltip";

// utils
function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const getDate = (d) => {
  return d && d.time;
};
const getValue = (d) => parseFloat(d.value);

const EnergyDemandTrend = ({ width, height, data }) => {
  if (!data) {
    return <></>;
  }

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const xScale = scaleTime({
    range: [0, width],
    domain: extent(data, getDate),
  });
  const yScale = scaleLinear({
    domain: [0, extent(data, getValue)[1]],
  });

  yScale.range([40, 0]);

  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(x);
      const index = bisectDate(stock, x0, 1);
      const d0 = stock[index - 1];
      const d1 = stock[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d =
          x0.valueOf() - getDate(d0).valueOf() >
          getDate(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(getValue(d)),
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
        y={(d) => yScale(getValue(d))}
        yScale={yScale}
        fill="#232953"
      />
      {/* {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 12}
            left={tooltipLeft + 12}
            style={tooltipStyles}
          >
            {`$${getValue(tooltipData)}`}
          </TooltipWithBounds>
          <TooltipWithBounds
            top={innerHeight + margin.top - 14}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              minWidth: 72,
              textAlign: "center",
              transform: "translateX(-50%)",
            }}
          >
            {formatDate(getDate(tooltipData))}
          </Tooltip>
        </div>
      )} */}
    </Group>
  );
};

export default EnergyDemandTrend;
