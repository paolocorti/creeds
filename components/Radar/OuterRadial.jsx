import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLog, NumberLike, scaleLinear } from "@visx/scale";
import { curveBasisOpen } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft } from "@visx/axis";
import { GridRadial, GridAngle } from "@visx/grid";
import { animated, useSpring } from "react-spring";

// utils
function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d) => {
  return d && d.time;
};
const close = (d) => parseFloat(d.value);
const formatTicks = (val) => String(val);

const OuterRadial = ({ width, height, data, svgWidth }) => {
  // scales
  const xScale = scaleTime({
    range: [1.047, 7.33],
    domain: extent(data, date),
  });
  const yScale = scaleLinear({
    domain: [0, extent(data, close)[1]],
  });

  console.log(yScale.domain());

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;
  const padding = 20;

  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];

  const lineRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // set line length once it is known after initial render
  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  if (width < 10) return null;

  const circleRadius = width / 2;
  yScale.range([circleRadius * 0.85, circleRadius * 0.95]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  console.log(data);

  return (
    <Group top={0} left={0}>
      {/* <GridAngle
        scale={xScale}
        outerRadius={height / 2 - padding}
        stroke={"black"}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="5,2"
        numTicks={26}
      />
      <GridRadial
        scale={yScale}
        numTicks={5}
        stroke={"black"}
        strokeWidth={1}
        fill={"none"}
        fillOpacity={0.1}
        strokeOpacity={0.2}
      /> */}

      <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
        {({ path }) => {
          const d = path(data) || "";
          return (
            <>
              <animated.path
                d={d}
                ref={lineRef}
                strokeWidth={2}
                strokeOpacity={0.8}
                strokeLinecap="round"
                fill={"#232953"}
              />
            </>
          );
        }}
      </LineRadial>

      {/* <AxisLeft
        top={0}
        scale={yScale}
        numTicks={5}
        tickStroke="none"
        tickLabelProps={(val) => ({
          fontSize: 8,
          fill: "red",
          fillOpacity: 1,
          textAnchor: "middle",
          dx: "1em",
          dy: "-0.5em",
          stroke: "black",
          strokeWidth: 0.5,
          paintOrder: "stroke",
        })}
        tickFormat={formatTicks}
        hideAxisLine
      /> */}
    </Group>
  );
};

export default OuterRadial;
