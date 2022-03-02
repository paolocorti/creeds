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

const RadarVerticalLegend = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className="flex flex-col">
      <p>Legend</p>
      <div className="flex flex-col relative">
        <div
          style={{
            position: "absolute",
            height: "415px",
            backgroundColor: "#9C9E9C",
            width: "1px",
            left: "5px",
            top: "52px",
            zIndex: 0,
          }}
        ></div>
        <div className="flex items-center my-1">
          <div
            className="text-left"
            style={{
              fontSize: "12px",
            }}
          >
            time
          </div>
        </div>
        <div
          className="flex items-center my-1 relative"
          style={{
            height: "15px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "-3px",
            }}
          >
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 14L15 7.5L8 1L1 7.5L8 14Z" stroke="#9C9E9C" />
            </svg>{" "}
          </div>
        </div>

        <div className="flex items-center my-1 pl-2">
          <div
            className="mr-2"
            style={{
              backgroundColor: "white",
              width: "18px",
              height: "12px",
            }}
          ></div>
          <div
            className="text-left "
            style={{
              fontSize: "12px",
            }}
          >
            energy demand
          </div>
        </div>
        <div className="flex items-center my-1 pl-2">
          <div
            className="text-left pl-1"
            style={{
              fontSize: "12px",
            }}
          >
            activities (click to select them)
          </div>
        </div>
        {activitiesArray.map((v) => {
          return (
            <div
              className="flex items-center my-1 cursor-pointer z-10"
              onClick={() => {
                setSelectedCategory(selectedCategory === v.key ? null : v.key);
              }}
            >
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
                  textDecoration:
                    selectedCategory === v.key ? "underline" : "none",
                }}
              >
                {v.value}
              </div>
            </div>
          );
        })}
        <div className="flex items-center my-1">
          <div
            style={{
              height: "20px",
              backgroundColor: "#000",
              width: "2px",
              marginLeft: "5px",
            }}
          ></div>
          <div
            className="text-left pl-4"
            style={{
              fontSize: "12px",
            }}
          >
            energy price
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarVerticalLegend;
