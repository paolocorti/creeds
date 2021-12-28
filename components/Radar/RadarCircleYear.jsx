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
  setHovered,
}) => {
  const strokeColor = "black";
  const strokeWidth = 1;
  //const radiusScale = scalePow().domain([0, 1]).range([1, 20]);
  const radius = Math.sqrt(Number(v) / Math.PI) * (width * 0.05);
  const hover = useStore((state) => state.hover);

  return (
    <g>
      <circle
        className="cursor-pointer"
        cx={0}
        cy={value}
        r={radius}
        fill={colorByCategory[category]}
        fillOpacity={0.8}
        data-tip={activitiesCode[factor].value}
        onMouseEnter={() => {
          useStore.setState({
            hover: `i${index}:f${factor}`,
            hoverCategory: factor,
          });
          ReactTooltip.rebuild();
        }}
        onMouseLeave={() => {
          useStore.setState({ hover: null, hoverCategory: null });
        }}
        stroke={hover === `i${index}:f${factor}` ? strokeColor : "none"}
        strokeWidth={strokeWidth}
      />
      {/* <text dx={0} dy={value} textAnchor={"middle"} fontSize={10}>
        {parseFloat(v).toFixed(2)}
      </text> */}
    </g>
  );
};

export default RadarCircleYear;
