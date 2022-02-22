const RegionMenu = ({
  selectedCompareRegion,
  setSelectedCompareRegion,
  unsetSelectedCompareRegion,
}) => {
  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center">
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("london")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("london")}
        >
          London
          {selectedCompareRegion.includes("london") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("london")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("south_east")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("south_east")}
        >
          South East
          {selectedCompareRegion.includes("south_east") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("south_east")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("east_england")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("east_england")}
        >
          East England
          {selectedCompareRegion.includes("east_england") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("east_england")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("east_midlands")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("east_midlands")}
        >
          East Midlands
          {selectedCompareRegion.includes("east_midlands") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("east_midlands")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("west_midlands")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("west_midlands")}
        >
          West Midlands
          {selectedCompareRegion.includes("west_midlands") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("west_midlands")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("yorkshire_humber")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("yorkshire_humber")}
        >
          Yorkshire Humber
          {selectedCompareRegion.includes("yorkshire_humber") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("yorkshire_humber")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("north_east")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("north_east")}
        >
          North East
          {selectedCompareRegion.includes("north_east") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("north_east")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("north_west")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("north_west")}
        >
          North West
          {selectedCompareRegion.includes("north_west") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("north_west")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("wales")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("wales")}
        >
          Wales
          {selectedCompareRegion.includes("wales") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("wales")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("scotland")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("scotland")}
        >
          Scotland{" "}
          {selectedCompareRegion.includes("scotland") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("scotland")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
        <div
          className="mx-2 cursor-pointer regionButton"
          style={{
            textDecoration: selectedCompareRegion.includes("northern_ireland")
              ? "underline"
              : "none",
          }}
          onClick={() => setSelectedCompareRegion("northern_ireland")}
        >
          Northern Ireland
          {selectedCompareRegion.includes("northern_ireland") && (
            <span
              className="ml-2"
              onClick={() => unsetSelectedCompareRegion("northern_ireland")}
            >
              <img src={"/close.svg"} width={9} />
            </span>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default RegionMenu;
