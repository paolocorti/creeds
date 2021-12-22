import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLog, NumberLike, scaleLinear } from "@visx/scale";
import { curveBasisOpen } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { AxisLeft } from "@visx/axis";
import { GridRadial, GridAngle } from "@visx/grid";
import { animated, useSpring } from "react-spring";

const green = "#e5fd3d";
export const blue = "#999";
const darkgreen = "#dff84d";
export const background = "#fff";
const darkbackground = "#232953";
const strokeColor = "#744cca";
const springConfig = {
  tension: 20,
};

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

const EnergyDemandRadial = ({ width, height, data }) => {
  // scales
  const xScale = scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(data, date),
  });
  const yScale = scaleLinear({
    domain: extent(data, close),
  });

  // console.log(yScale.domain());

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;
  const padding = 20;

  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];

  const lineRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const spring = useSpring({
    frame: shouldAnimate ? 0 : 1,
    config: springConfig,
    onRest: () => setShouldAnimate(false),
  });

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
      {/* <GridAngle
            scale={xScale}
            outerRadius={height / 2 - padding}
            stroke={green}
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="5,2"
            numTicks={20}
          /> */}
      {/* <GridRadial
        scale={yScale}
        numTicks={5}
        stroke={blue}
        strokeWidth={1}
        fill={blue}
        fillOpacity={0}
        strokeOpacity={0.5}
      /> */}
      <AxisLeft
        top={-height / 2 + padding}
        scale={reverseYScale}
        numTicks={5}
        tickStroke="none"
        tickLabelProps={(val) => ({
          fontSize: 0,
          fill: blue,
          fillOpacity: 1,
          textAnchor: "middle",
          dx: "1em",
          dy: "-0.5em",
          stroke: strokeColor,
          strokeWidth: 0.5,
          paintOrder: "stroke",
        })}
        tickFormat={formatTicks}
        hideAxisLine
      />
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
                fill={darkbackground}
                stroke={darkbackground}
              />
              {shouldAnimate && (
                <animated.path
                  d={d}
                  strokeWidth={2}
                  strokeOpacity={0.8}
                  strokeLinecap="round"
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeDashoffset={spring.frame.interpolate(
                    (v) => v * lineLength
                  )}
                  strokeDasharray={lineLength}
                />
              )}
            </>
          );
        }}
      </LineRadial>

      {/* {[firstPoint, lastPoint].map((d, i) => {
        const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
        const cy = -(yScale(close(d)) ?? 0);
        return (
          <circle
            key={`line-cap-${i}`}
            cx={cx}
            cy={cy}
            fill={darkgreen}
            r={3}
          />
        );
      })} */}
    </Group>
  );
};

export default EnergyDemandRadial;
