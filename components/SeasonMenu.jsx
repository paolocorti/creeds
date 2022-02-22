const SeasonMenu = ({
  selectedCompareSeason,
  setSelectedCompareSeason,
  unsetSelectedCompareSeason,
}) => {
  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center">
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes("winter")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason("winter")}
        >
          Winter
          {selectedCompareSeason.includes("winter") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason("winter")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes("spring")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason("spring")}
        >
          Spring
          {selectedCompareSeason.includes("spring") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason("spring")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes("summer")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason("summer")}
        >
          Summer
          {selectedCompareSeason.includes("summer") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason("summer")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes("autumn")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason("autumn")}
        >
          Autumn
          {selectedCompareSeason.includes("autumn") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason("autumn")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonMenu;
