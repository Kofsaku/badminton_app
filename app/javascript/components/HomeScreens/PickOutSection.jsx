import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  focusOnSelect: false,
  pauseOnHover: false,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
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

const PickOutSection = () => {
  const { t } = useTranslation();

  const tournaments = [
    {
      image: "images/result-1.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.pickOut.tournament.extraRoom')
    },
    {
      image: "images/result-2.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.pickOut.tournament.extraRoom')
    },
    {
      image: "images/result-3.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.pickOut.tournament.extraRoom')
    },
    {
      image: "images/result-1.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.pickOut.tournament.extraRoom')
    }
  ];

  return (
    <section className="py-5 my-3">
      <div className="container">
        <div className="d-block w-100 mb-5">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-8 col-12">
              <div className="d-block w-100 mb-lg-0 mb-md-0 mb-sm-0 mb-3">
                <p className="text-green1 mt-0 mb-1 text-15 fw-bold">
                  {t('home.pickOut.subtitle')}
                </p>
                <h3 className="text-green4 m-0 fw-bold text-40 mob-text-30">
                  {t('home.pickOut.title')}
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-block w-100 text-lg-end text-md-end text-start">
                <button className="bg-transparent border-color-green px-2 py-1 text-green4 fw-bold text-15 border-2 border-0 border-bottom">
                  {t('home.pickOut.seeAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block w-100">
          <Slider {...sliderSettings} className="custom-slider1 arrows-1">
            {tournaments.map((item, index) => (
              <div className="d-block px-3" key={index}>
                <div className="d-block w-100">
                  <img className="w-100" src={item.image} alt={item.title} />
                </div>
                <div className="d-block py-3">
                  <h3 className="text-green4 text-22 fw-bold m-0">{item.title}</h3>
                </div>
                <div className="d-block w-100 mb-3">
                  <h5 className="text-grey1 text-14 mt-0 mb-2">
                    {t('home.pickOut.tournament.prefecture')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{item.prefecture}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.pickOut.tournament.dates')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{item.date}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.pickOut.tournament.meetingPlace')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{item.place}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.pickOut.tournament.classification')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{item.classification}</span>
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-start w-100">
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    {t('home.pickOut.tournament.deadline')}: {item.deadline} {t('home.pickOut.tournament.daysLeft')}
                  </span>
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    {t('home.pickOut.tournament.available')}: {item.availability}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="d-block w-100 text-start pt-5">
          <Link to="/see-all" className="bg-green1 bg-hover-black text-white rounded-pill px-5 py-2 lh-lg border-0 text-16">
            {t('home.pickOut.seeAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PickOutSection;
