import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

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
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SearchSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    classification: "all",
    status: "all",
    region: "all",
    venue: "all",
    match_format: "all",
    participation_type: "all",
  });
  const [searchResults, setSearchResults] = useState([]);

  const {
    name,
    classification,
    status,
    region,
    venue,
    match_format: matchFormat,
    participation_type: participationType,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        "/api/v1/tournaments/q",
        formData
      );
      setSearchResults(response.data);

      console.log(response.data);
    } catch (e) {}
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-block w-100 mb-5">
          <h3 className="text-green3 fw-bold text-32 mob-text-28 m-0">
            SEARCH
          </h3>
        </div>
        <div className="d-block w-100 mb-5">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Name of Tournament / Event
                </h5>
                <input
                  type="text"
                  name="name"
                  className="field-style4"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Classification
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      classification === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="radio"
                      name="classification"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      classification === "tournament" &&
                      "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">tournament</span>
                    <input
                      type="radio"
                      name="classification"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="tournament"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      classification === "event" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">event</span>
                    <input
                      type="radio"
                      name="classification"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="event"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Dates</h5>
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input type="date" className="field-style4 w-100" />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <span className="d-block text-center text-16 text-block">
                      ~
                    </span>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input type="date" className="field-style4 w-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Status
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      status === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="radio"
                      name="status"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      status === "tournament" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">tournament</span>
                    <input
                      type="radio"
                      name="status"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="tournament"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      status === "event" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">event</span>
                    <input
                      type="radio"
                      name="status"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="event"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Region
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      region === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      region === "Hokkaido" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Hokkaido</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Hokkaido"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 mb-2 me-2 px-2 py-2 position-relative ${
                      region === "northeast" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">northeast</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="northeast"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 mb-2 me-2 px-2 py-2 position-relative ${
                      region === "Kanto" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Kanto</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Kanto"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Hokuriku" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Hokuriku</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Hokuriku"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Koshinetsu" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Koshinetsu</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Koshinetsu"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Tokai" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Tokai</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Tokai"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "China" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">China</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="China"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Shikoku" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Shikoku</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Shikoku"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Kinki" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Kinki</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Kinki"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 me-2 mb-2 px-2 py-2 position-relative ${
                      region === "Kyushu" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">Kyushu</span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="Kyushu"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">Venue</h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      venue === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="radio"
                      name="venue"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      venue === "main" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">main venue</span>
                    <input
                      type="radio"
                      name="venue"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="main"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      venue === "remote" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">remote venue</span>
                    <input
                      type="radio"
                      name="venue"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="remote"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Match Format
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      matchFormat === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="radio"
                      name="match_format"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      matchFormat === "team" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">team</span>
                    <input
                      type="radio"
                      name="match_format"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="team"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      matchFormat === "single" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">single</span>
                    <input
                      type="radio"
                      name="match_format"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="single"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  Participation Type
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      participationType === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">all</span>
                    <input
                      type="checkbox"
                      name="participation_type"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                      participationType === "domestic" &&
                      "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">domestic</span>
                    <input
                      type="checkbox"
                      name="participation_type"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="domestic"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      participationType === "international" &&
                      "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">
                      international
                    </span>
                    <input
                      type="checkbox"
                      name="participation_type"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="international"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
              <button
                type="button"
                className="btn btn-primary btn-lg text-16 text-white bg-green3 d-inline-flex align-items-center justify-content-center"
              >
                Search
              </button>
            </div> */}

            <div className="d-block w-100">
              <button
                className="bg-green1 bg-hover-black text-white rounded-pill px-4 py-2 lh-lg border-0 text-16"
                onClick={handleSubmit}
              >
                <i className="fa fa-search text-16 me-2"> </i>
                Search for tournaments with these conditions
              </button>
            </div>
          </div>
        </div>
        <div className="d-block w-100">
          <Slider {...sliderSettings} className="custom-slider1 arrows-1">
            {searchResults.map((tournament) => (
              <div className="d-block px-3" key={tournament.id}>
                <div className="d-block w-100">
                  <img
                    className="w-100"
                    src="images/result-1.png"
                    alt="Result 1"
                  />
                </div>
                <div className="d-block py-3">
                  <h3 className="text-green4 text-22 fw-bold m-0">
                    <Link to={`/tournament-details/${tournament.id}`}>
                      {tournament.name}
                    </Link>
                  </h3>
                </div>
                <div className="d-block w-100 mb-3">
                  <h5 className="text-grey1 text-14 mt-0 mb-2">
                    prefecture
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      Shimane
                    </span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    Dates
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      {new Date(tournament.event_date).toDateString()}
                    </span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    meeting place
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      Hirata Gymnasium
                    </span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    Tournament Classification
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      Team Competition (Open)
                    </span>
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-start w-100">
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    Deadline: 10 days left
                  </span>
                  <span className="border border-color-silver rounded-2 text-green4 px-2 py-2 me-2 text-14">
                    Available: Extra room
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
