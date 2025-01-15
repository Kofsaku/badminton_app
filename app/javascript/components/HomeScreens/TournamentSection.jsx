import React from 'react';
import Slider from 'react-slick';
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

const TournamentSection = () => {
  const { t } = useTranslation();

  const tournaments = [
    {
      id: 1,
      image: "images/result-1.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.tournament.details.extraRoom')
    },
    {
      id: 2,
      image: "images/result-2.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.tournament.details.extraRoom')
    },
    {
      id: 3,
      image: "images/result-3.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.tournament.details.extraRoom')
    },
    {
      id: 4,
      image: "images/result-1.png",
      title: "2024 Shimane Club Cup Badminton New Year's Izumo Tournament",
      prefecture: "Shimane",
      date: "Sunday, January 21, 2024",
      place: "Hirata Gymnasium",
      classification: "Team Competition (Open)",
      deadline: "10",
      availability: t('home.tournament.details.extraRoom')
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
                  {t('home.tournament.subtitle')}
                </p>
                <h3 className="text-green4 m-0 fw-bold text-40 mob-text-30">
                  {t('home.tournament.title')}
                </h3>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="d-block w-100 text-lg-end text-md-end text-start">
                <button className="bg-transparent border-color-green px-2 py-1 text-green4 fw-bold text-15 border-2 border-0 border-bottom">
                  {t('home.tournament.seeAll')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-block w-100">
          <Slider {...sliderSettings} className="custom-slider1 arrows-1">
            {tournaments.map((tournament) => (
              <div className="d-block px-3" key={tournament.id}>
                <div className="d-block w-100">
                  <img className="w-100" src={tournament.image} alt={tournament.title} />
                </div>
                <div className="d-block py-3">
                  <h3 className="text-green4 text-22 fw-bold m-0">{tournament.title}</h3>
                </div>
                <div className="d-block w-100 mb-3">
                  <h5 className="text-grey1 text-14 mt-0 mb-2">
                    {t('home.tournament.details.prefecture')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{tournament.prefecture}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.tournament.details.dates')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{tournament.date}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.tournament.details.meetingPlace')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{tournament.place}</span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    {t('home.tournament.details.classification')}
                    <span className="text-green4 d-inline-block ms-1 fw-bold">{tournament.classification}</span>
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-start w-100">
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    {t('home.tournament.details.deadline')}: {tournament.deadline} {t('home.tournament.details.daysLeft')}
                  </span>
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    {t('home.tournament.details.available')}: {tournament.availability}
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="d-block w-100 text-start pt-5">
          <a href="#" className="bg-green1 bg-hover-black text-white rounded-pill px-5 py-2 lh-lg border-0 text-16">
            {t('home.tournament.seeAll')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default TournamentSection;
