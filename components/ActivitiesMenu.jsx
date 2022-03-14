import { useStore } from "../store.js";
import { colorByCategory } from "./utils";

const ActivitiesMenu = ({
  activitiesArray,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="my-0 md:px-4">
      <div className="flex flex-wrap justify-start w-full">
        {activitiesArray.map((el, i) => {
          return (
            <div
              key={`menu-${i}`}
              className="md:mx-2 cursor-pointer categoryButton"
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === el.key ? null : el.key
                );
              }}
              style={{
                textDecoration: selectedCategory === el.key ? "underline" : "",
              }}
            >
              <span
                className="mr-1 colorDot"
                style={{
                  backgroundColor: colorByCategory[el.key],
                }}
              ></span>
              <span className="mr-0">{el.value}</span>
              {selectedCategory === el.key && (
                <span
                  className="ml-2"
                  onClick={() => setSelectedCategory(null)}
                >
                  <img src={"/close.svg"} width={7} />
                </span>
              )}
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
};

export default ActivitiesMenu;
