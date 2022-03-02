import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLog, NumberLike, scaleLinear } from "@visx/scale";
import { curveBasisOpen, curveLinear } from "@visx/curve";
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

const InnerRadial = ({ width, height, data, svgWidth }) => {
  // const xScale = scaleTime({
  //   range: [0, Math.PI * 2],
  //   domain: extent(data, date),
  // });

  if (data.length === 0) {
    return <></>;
  }

  const xScale = scaleTime()
    .range([0, 6.28])
    .domain([new Date(`2021-01-01T00:00:00`), new Date(`2021-01-02T00:00:00`)]);

  const yScale = scaleLinear({
    //domain: extent(data, close),
    domain: [0, extent(data, close)[1]],
  });

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => {
    return yScale(close(d)) ?? 0;
  };
  const padding = 20;
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

  // Update scale output to match component dimensions
  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());

  return (
    <Group top={0} left={0}>
      {/* <circle cx={0} cy={0} r={(width * 0.7) / 2} fill={"#ffd6cc"} /> */}
      {/* <GridAngle
        scale={xScale}
        outerRadius={height / 2 - padding}
        stroke={"black"}
        strokeWidth={1}
        strokeOpacity={0.3}
        strokeDasharray="5,2"
        numTicks={20}
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

      {/* <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
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
                fill={"#fff"}
              />
            </>
          );
        }}
      </LineRadial> */}

      <g transform="rotate(0 0 0)">
        {data.map((v) => {
          const thisAngle = xScale(date(v));
          const thisValue = yScale(close(v));
          return (
            <g>
              {/* <circle
                className="cursor-pointer"
                cx={thisValue * Math.cos(thisAngle)}
                cy={thisValue * Math.sin(thisAngle)}
                r={2}
                fill={"red"}
              /> */}
              {/* <text
                x={thisValue * Math.cos(thisAngle)}
                y={thisValue * Math.sin(thisAngle)}
                fontSize="8"
                fill="red"
              >
                {v.value.toFixed(1)}
              </text> */}
              <line
                x1={0}
                y1={0}
                x2={thisValue * Math.cos(thisAngle)}
                y2={thisValue * Math.sin(thisAngle)}
                stroke={"#000"}
                strokeWidth={2}
              ></line>
            </g>
          );
        })}
      </g>

      {/* <AxisLeft
        top={-height / 2 + padding}
        scale={reverseYScale}
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

export default InnerRadial;
