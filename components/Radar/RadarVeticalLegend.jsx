import { useStore } from "../../store.js";
import { activitiesArray, colorByCategory } from "../utils";

{
  /*fill={selectedCategory === "tv" ? "black" : "white"}
          onClick={() => {
            useStore.setState({
              selectedCategory: selectedCategory === "tv" ? null : "tv",
            });
          }} */
}

const RadarVerticalLegend = () => {
  const selectedCategory = useStore((state) => state.selectedCategory);
  return (
    <div className="flex flex-col">
      {activitiesArray.map((v) => {
        return (
          <div className="flex items-center my-1">
            <div
              className="mr-2"
              style={{
                backgroundColor: colorByCategory[v.key],
                width: "12px",
                height: "12px",
                borderRadius: "12px",
              }}
            ></div>
            <div
              className="text-left uppercase"
              style={{
                fontSize: "12px",
              }}
            >
              {v.value}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RadarVerticalLegend;
