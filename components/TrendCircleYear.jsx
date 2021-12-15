import ReactTooltip from "react-tooltip";
import { activitiesCode } from "./utils.js";
import { scalePow } from "d3-scale";
import { useStore } from "../store.js";

const colorByCategory = {
  ab: "#9A1D18",
  ha: "#888DBB",
  sl: "#e58f9c",
  fp: "#e58f9c",
  ln: "#e58f9c",
  dw: "#e58f9c",
  tw: "#9A1D18",
  tv: "#9A1D18",
  it: "#9A1D18",
  et: "#888DBB",
  pc: "#888DBB",
  wr: "#888DBB",
  hc: "#7EA17E",
  hu: "#7EA17E",
  sh: "#7EA17E",
  ot: "#7EA17E",
};

const TrendCircleYear = ({
  v,
  value,
  index,
  factor,
  angle,
  category,
  color,
  width,
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
        fill={
          color === "main" ? colorByCategory[factor] : colorByCategory[factor]
        }
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
      {/* <text dx={0} dy={value} textAnchor={"middle"} fontSize={10}>
        {parseFloat(v).toFixed(2)}
      </text> */}
    </g>
  );
};

export default TrendCircleYear;
