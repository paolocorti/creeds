import Slider from "react-slick";
import { regions } from "./utils";

const RegionMenu = ({ setSelected }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => {
      console.log(regions[current]);
      setSelected(regions[current]);
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
    <div className="my-0 px-4 w-48 m-auto">
      <Slider {...settings}>
        <div className="mx-2 cursor-pointer regionButton">London</div>
        <div className="mx-2 cursor-pointer regionButton">South East</div>
        <div className="mx-2 cursor-pointer regionButton">East England</div>
        <div className="mx-2 cursor-pointer regionButton">East Midlands</div>
        <div className="mx-2 cursor-pointer regionButton">West Midlands</div>
        <div className="mx-2 cursor-pointer regionButton">Yorkshire Humber</div>
        <div className="mx-2 cursor-pointer regionButton">North East</div>
        <div className="mx-2 cursor-pointer regionButton">North West</div>
        <div className="mx-2 cursor-pointer regionButton">Wales</div>
        <div className="mx-2 cursor-pointer regionButton">Scotland </div>
        <div className="mx-2 cursor-pointer regionButton">Northern Ireland</div>
      </Slider>
    </div>
  );
};

export default RegionMenu;
