import Slider from "react-slick";

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

const SeasonMenu = ({ selectedCompareSeason, setSelected, initialSlide }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    afterChange: (current) => {
      console.log(current);
      setSelected(current);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="my-0 w-24 mx-auto">
      <Slider {...settings}>
        <div className="mx-2 cursor-pointer seasonButton">Winter</div>
        <div className="mx-2 cursor-pointer seasonButton">Spring</div>
        <div className="mx-2 cursor-pointer seasonButton">Summer</div>
        <div className="mx-2 cursor-pointer seasonButton">Autumn</div>
      </Slider>
    </div>
  );
};

export default SeasonMenu;
