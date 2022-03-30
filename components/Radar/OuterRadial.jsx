import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { LineRadial } from "@visx/shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { curveLinear } from "@visx/curve";
import moment from "moment";
import ReactTooltip from "react-tooltip";

// utils
function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d) => {
  return d && d.time;
};
const close = (d) => parseFloat(d.value);

const OuterRadial = ({ width, height, data, line, maximum, type }) => {
  if (data.length === 0) {
    return <></>;
  }

  const xScale = scaleTime({
    range: [0, 6.28],
    domain: extent(data, date),
  });
  const yScale = scaleLinear({
    domain: [0, maximum],
  });

  const max = extent(data, close)[1];
  const maxData = data.filter((d) => d.value === max)[0];

  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;

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
          const angleV = xScale(maxData.time);
          const valueV = yScale(maxData.value);
          const time = moment(maxData.time).format("h:mm a");

          return (
            <>
              <path
                d={d}
                ref={lineRef}
                strokeWidth={1}
                strokeOpacity={0.8}
                strokeLinecap="round"
                fill={line ? "none" : "#fff"}
                stroke={line ? "#000" : "none"}
              />
              <circle
                fill={type === "gas" ? "#000" : "#fff"}
                stroke={type === "gas" ? "none" : "#000"}
                cx={valueV * Math.cos(angleV - Math.PI / 2)}
                cy={valueV * Math.sin(angleV - Math.PI / 2)}
                r={3}
                data-tip={`<b>${time}</b> <br/> ${parseFloat(
                  maxData.value
                ).toFixed(1)}`}
                data-html="true"
                onMouseEnter={() => {
                  console.log("here");
                  ReactTooltip.rebuild();
                }}
              />
            </>
          );
        }}
      </LineRadial>
    </Group>
  );
};

export default OuterRadial;
