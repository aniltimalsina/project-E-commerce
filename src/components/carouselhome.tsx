import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "../assets/carousel-1.jpg";
import Img2 from "../assets/carousel-2.jpg";
import Img3 from "../assets/carousel-3.jpg";
import Img4 from "../assets/carousel-4.jpg";

const CarouselHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings}>
        <div className="slick-slide">
          <img className="w-full h-96" src={Img1} alt="Slide 1" />
        </div>
        <div>
          <img className="w-full h-96" src={Img2} alt="Slide 2" />
        </div>
        <div>
          <img className="w-full h-96" src={Img3} alt="Slide 3" />
        </div>
        <div>
          <img className="w-full h-96" src={Img4} alt="Slide 4" />
        </div>
      </Slider>
    </>
  );
};

export default CarouselHome;
