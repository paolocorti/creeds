import { activities } from "../utils.js";
import { scalePow } from "d3-scale";

const RadarCircle = ({
  v,
  value,
  index,
  factor,
  angle,
  hover,
  setHover,
  category,
  color,
}) => {
  const radius = 3;
  const strokeColor = "black";
  const strokeWidth = 1;

  const radiusScale = scalePow().domain([0, 1]).range([1, 20]);

  console.log(v, value, index, factor);

  return (
    <g>
      <circle
        className="cursor-pointer"
        cx={value * Math.cos(angle * index)}
        cy={value * Math.sin(angle * index)}
        r={radiusScale(v)}
        fill={color === "main" ? "red" : "blue"}
        fillOpacity={0.5}
        data-tip={activities[factor]}
        onMouseEnter={() => {
          console.log(`i${index}:f${factor}`);
          setHover(`i${index}:f${factor}`);
        }}
        onMouseLeave={() => {
          setHover(null);
        }}
        stroke={hover === `i${index}:f${factor}` ? strokeColor : "none"}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default RadarCircle;
