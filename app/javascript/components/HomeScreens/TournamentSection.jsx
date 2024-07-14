import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TournamentSection = () => {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="py-5 my-3">
      <div className="container">
        <div className="d-block w-100 mb-5">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-8 col-12">
              <div className="d-block w-100 mb-lg-0 mb-md-0 mb-sm-0 mb-3">
                <p className="text-green1 mt-0 mb-1 text-15 fw-bold">
                  Tournaments that allow web entry
                </p>
                <h3 className="text-green4 m-0 fw-bold text-40 mob-text-30">Tournament</h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-block w-100 text-lg-end text-md-end text-start">
                <button className="bg-transparent border-color-green px-2 py-1 text-green4 fw-bold text-15 border-2 border-0 border-bottom">
                  See All
                </button>
              </div>
            </div>
          </div>
        </div>

    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
        <div>
          <h3>7</h3>
        </div>
        <div>
          <h3>8</h3>
        </div>
      </Slider>
    </div>
        <div className="d-block w-100 text-start pt-5">
          <a href="#" className="bg-green1 bg-hover-black text-white rounded-pill px-5 py-2 lh-lg border-0 text-16">See all</a>
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
