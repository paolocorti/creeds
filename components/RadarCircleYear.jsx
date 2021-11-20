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
  //const radiusScale = scalePow().domain([0, 1]).range([1, 20]);
  const radius = Math.sqrt(Number(v) / Math.PI) * 40;
  const hover = useStore((state) => state.hover);

  return (
    <g>
      <circle
        className="cursor-pointer"
        cx={0}
        cy={value}
        r={radius}
        fill={color === "main" ? "#EF96A7" : "#9A1D18"}
        fillOpacity={0.8}
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
