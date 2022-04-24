import { activitiesCode, colorByCategory } from "../utils.js";

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
    <g>
      <circle
        className="cursor-pointer"
        cx={0}
        cy={value}
        r={radius}
        fill={colorByCategory[category]}
        fillOpacity={0.8}
        onMouseEnter={() => {
          setHover(`i${index}:f${factor}`);
          setHoverCategory(factor);

          showTooltip({
            tooltipData: {
              time: time,
              v: activitiesCode[factor].value,
              factor: v ? (parseFloat(v) * 100).toFixed(1) : "",
              type: "circle",
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
    </g>
  );
};

export default RadarCircleYear;
