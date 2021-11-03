import ReactTooltip from "react-tooltip";
import { activitiesCode } from "./utils.js";
import { scalePow } from "d3-scale";
import { useStore } from "../store.js";

const RadarCircleYear = ({
  v,
  value,
  index,
  factor,
  angle,
  category,
  color,
}) => {
  const strokeColor = "black";
  const strokeWidth = 1;
  const radiusScale = scalePow().domain([0, 1]).range([1, 20]);
  const hover = useStore((state) => state.hover);

  return (
    <g>
      <circle
        className="cursor-pointer"
        cx={value * Math.cos(angle * index)}
        cy={value * Math.sin(angle * index)}
        r={radiusScale(v)}
        fill={color === "main" ? "red" : "blue"}
        fillOpacity={0.5}
        data-tip={activitiesCode[factor].value}
        onMouseEnter={() => {
          useStore.setState({ hover: `i${index}:f${factor}` });
          ReactTooltip.rebuild();
        }}
        onMouseLeave={() => {
          useStore.setState({ hover: null });
        }}
        stroke={hover === `i${index}:f${factor}` ? strokeColor : "none"}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default RadarCircleYear;
