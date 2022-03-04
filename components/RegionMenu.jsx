import Slider from "react-slick";

const RegionMenu = ({
  selectedCompareRegion,
  setSelectedCompareRegion,
  unsetSelectedCompareRegion,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => {
      setSelected(current);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path d="M1 1L7 7L1 13" stroke="black" />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path d="M7 13L1 7L7 1" stroke="black" />
        </svg>
      </div>
    );
  }

  return (
    <div className="my-0 px-4">
      <div className="flex flex-wrap justify-start">
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
