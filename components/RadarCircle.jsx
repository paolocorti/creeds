import ReactTooltip from "react-tooltip";
import { activities } from "./utils.js";

const RadarCircle = ({ v, value, index, factor, angle, hover, setHover }) => {
  const radius = 2;
  const strokeColor = "black";
  const strokeWidth = 1;
  return (
    <circle
      className="cursor-pointer"
      cx={value * Math.cos(angle * index)}
      cy={value * Math.sin(angle * index)}
      r={radius}
      fill={parseInt(v) === factor ? "#110e79" : "lightgray"}
      data-tip={activities[factor]}
      onMouseEnter={() => {
        console.log(`i${index}:f${factor}`);
        setHover(`i${index}:f${factor}`);
        ReactTooltip.rebuild();
      }}
      onMouseLeave={() => {
        setHover(null);
      }}
      stroke={hover === `i${index}:f${factor}` ? strokeColor : "none"}
      strokeWidth={strokeWidth}
    />
  );
};

export default RadarCircle;
