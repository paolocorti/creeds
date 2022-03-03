import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { curveLinear } from "@visx/curve";
import { animated } from "react-spring";

// utils
function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d) => {
  return d && d.time;
};
const close = (d) => parseFloat(d.value);

const OuterRadial = ({ width, height, data, line }) => {
  const xScale = scaleTime({
    range: [0, 6.28],
    domain: extent(data, date),
  });
  const yScale = scaleLinear({
    domain: [0, extent(data, close)[1]],
  });

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;
  const padding = 20;

  const lineRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);

  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  if (width < 10) return null;

  const circleRadius = width / 2;
  yScale.range([circleRadius * 0.85, circleRadius * 0.95]);

  return (
    <Group top={0} left={0}>
      <LineRadial angle={angle} radius={radius} curve={curveLinear}>
        {({ path }) => {
          const d = path(data) || "";
          return (
            <>
              <animated.path
                d={d}
                ref={lineRef}
                strokeWidth={1}
                strokeOpacity={0.8}
                strokeLinecap="round"
                fill={line ? "none" : "#fff"}
                stroke={line ? "#000" : "none"}
              />
            </>
          );
        }}
      </LineRadial>
    </Group>
  );
};

export default OuterRadial;
