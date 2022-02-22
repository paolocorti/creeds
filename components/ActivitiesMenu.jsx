import { useStore } from "../store.js";
import { colorByCategory } from "./utils";

const ActivitiesMenu = ({
  activitiesArray,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="my-1">
      <div className="flex flex-wrap ">
        {activitiesArray.map((el) => {
          return (
            <div
              className="mx-2 cursor-pointer categoryButton"
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
              <span className="mr-4">{el.value}</span>
              {selectedCategory === el.key && (
                <span
                  className="ml-2 absolute right-2 top-2"
                  onClick={() => setSelectedCategory(null)}
                >
                  <img src={"/close.svg"} width={9} />
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
