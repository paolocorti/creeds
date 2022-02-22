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
            textDecoration: selectedCompareSeason.includes(0)
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason(0)}
        >
          Winter
          {selectedCompareSeason.includes(0) && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason(0)}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes(1)
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason(1)}
        >
          Spring
          {selectedCompareSeason.includes(1) && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason(1)}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes(2)
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason(2)}
        >
          Summer
          {selectedCompareSeason.includes(2) && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason(2)}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareSeason.includes(3)
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareSeason(3)}
        >
          Autumn
          {selectedCompareSeason.includes(3) && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareSeason(3)}
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
