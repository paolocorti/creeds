import ReactTooltip from "react-tooltip";
import { activitiesCode, colorByCategory } from "../utils.js";
import { useStore } from "../../store.js";

const RadarCircleYear = ({
  v,
  value,
  index,
  factor,
  angle,
  category,
  color,
  width,
  hover,
  setHover,
  setHoverCategory,
  time,
  showTooltip,
  hideTooltip,
  tooltipLeft,
  tooltipTop,
}) => {
  const strokeColor = "black";
  const strokeWidth = 1;
  const radius = Math.sqrt(Number(v) / Math.PI) * (width * 0.05);

  return (
    <circle
      className="cursor-pointer circleAnimation"
      cx={0}
      cy={value}
      r={radius}
      fill={colorByCategory[category]}
      fillOpacity={0.8}
      // data-tip={`<b>${time}</b> <br/> ${activitiesCode[factor].value}: ${
      //   v ? (parseFloat(v) * 100).toFixed(1) : ""
      // }% <br/>`}
      // data-html="true"
      onMouseEnter={() => {
        setHover(`i${index}:f${factor}`);
        setHoverCategory(factor);
        //ReactTooltip.rebuild();

        showTooltip({
          tooltipData: {
            time: time,
            v: activitiesCode[factor].value,
            factor: v ? (parseFloat(v) * 100).toFixed(1) : "",
          },
          tooltipLeft: tooltipLeft,
          tooltipTop: tooltipTop,
        });
      }}
      onMouseLeave={() => {
        setHover(null);
        setHoverCategory(null);
        hideTooltip();
      }}
      stroke={hover === `i${index}:f${factor}` ? strokeColor : "none"}
      strokeWidth={strokeWidth}
    />
  );
};

export default RadarCircleYear;
