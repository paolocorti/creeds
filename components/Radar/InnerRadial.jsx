import React, { useRef, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { scaleTime, scaleLinear } from "@visx/scale";
import moment from "moment";

function extent(data, value) {
  const values = data.map(value);
  return [Math.min(...values), Math.max(...values)];
}

const date = (d) => {
  return d && d.time;
};
const close = (d) => parseFloat(d.value);

const InnerRadial = ({ width, height, data, maximum }) => {
  if (data.length === 0) {
    return <></>;
  }

  const xScale = scaleTime()
    .range([1.5708, 7.85398])
    //.range([0, 6.28])
    .domain([new Date(`2021-01-01T00:00:00`), new Date(`2021-01-02T00:00:00`)]);

  const yScale = scaleLinear({
    domain: [0, maximum],
  });

  const padding = 20;

  if (width < 10) return null;

  yScale.range([0, height / 2 - padding]);

  const newData = [];

  data.forEach((d) => {
    newData.push(d);
    const newD = { ...d };
    var newDateObj = moment(newD.time).add(30, "m").toDate();
    newD.time = newDateObj;
    newData.push(newD);
  });

  return (
    <Group top={0} left={0}>
      <g>
        {newData.map((v, i) => {
          const thisAngle = xScale(date(v));
          const thisValue = yScale(close(v));
          return (
            <g transform="rotate(180 0 0)" key={`inner-${i}`}>
              <line
                x1={0}
                y1={0}
                x2={thisValue * Math.cos(thisAngle)}
                y2={thisValue * Math.sin(thisAngle)}
                stroke={"#000"}
                strokeWidth={1.2}
              ></line>
            </g>
          );
        })}
      </g>
    </Group>
  );
};

export default InnerRadial;
