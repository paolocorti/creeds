import ReactTooltip from "react-tooltip";
import { activitiesCode } from "./utils.js";
import { scalePow } from "d3-scale";
import { useStore } from "../store.js";

const colorByCategory = {
  sl: "#e58f9c",
  et: "#e58f9c",
  pc: "#e58f9c",
  hc: "#e58f9c",
  ha: "#9A1D18",
  tv: "#9A1D18",
  it: "#9A1D18",
  tw: "#00198f",
  wr: "#00198f",
  ab: "#888DBB",
  sh: "#888DBB",
  ot: "#888DBB",
  fp: "#7EA17E",
  ln: "#7EA17E",
  dw: "#7EA17E",
  hu: "#7EA17E",
};

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
