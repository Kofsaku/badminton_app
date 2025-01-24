import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../api/axiosInstance";
import { start } from "@popperjs/core";

const SearchSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    // classification: "all",
    start_date: "",
    end_date: "",
    // status: "all",
    region: "all",
    prefecture: "",
    venue: "all",
    match_format: "all",
    // participation_type: "all",
  });
  const [searchResults, setSearchResults] = useState([]);

  const {
    name,
    // classification,
    start_date,
    end_date,
    // status,
    region,
    // venue,
    match_format: matchFormat,
    // participation_type: participationType,
  } = formData;

  const regions = [
    "hokkaido",
    "tohoku",
    "kanto",
    "hokuriku",
    "koshinetsu",
    "tokai",
    "kinki",
    "chugoku",
    "shikoku",
    "kyushu",
  ];

  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ];

  useEffect(() => {
    axiosInstance
      .post("/api/v1/tournaments/q", formData)
      .then((response) => setSearchResults(response.data))
      .catch((e) => {});
  }, []);

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

  const { t } = useTranslation();

  const getSliderSettings = () => {
    const numberOfSlides = searchResults.length;

    const sliderSettings = {
      dots: true,
      infinite: numberOfSlides > 1,
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
            infinite: numberOfSlides > 1,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: numberOfSlides > 1,
            dots: true,
          },
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: numberOfSlides > 1,
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

    return sliderSettings;
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-block w-100 mb-5">
          <h3 className="text-green3 fw-bold text-32 mob-text-28 m-0">
            {t("home.search.title")}
          </h3>
        </div>
        <div className="d-block w-100 mb-5">
          <div className="row">
            {/* Tournament Name Field */}
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  {t("home.search.fields.tournamentName")}
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
                  {t("home.search.fields.dates")}
                </h5>
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input
                      type="date"
                      name="start_date"
                      className="field-style4 w-100"
                      value={start_date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <span className="d-block text-center text-16 text-block">
                      ~
                    </span>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                    <input
                      type="date"
                      name="end_date"
                      className="field-style4 w-100"
                      value={end_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  {t("home.search.fields.region")}
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      region === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">
                      {t("home.search.options.all")}
                    </span>
                    <input
                      type="radio"
                      name="region"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="all"
                      onChange={handleChange}
                    />
                  </div>
                  {regions.map((curRegion) => (
                    <div
                      className={`d-inline-block mb-2 checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 me-2 py-2 position-relative ${
                        region === curRegion && "checkbox-selector-active"
                      }`}
                    >
                      <span className="text-14 d-inline-block">
                        {t(`home.search.regions.${curRegion}`)}
                      </span>
                      <input
                        type="radio"
                        name="region"
                        className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                        value={curRegion}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Venue Field */}
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  {t("home.search.fields.prefecture")}
                </h5>
                <select name="prefecture" onChange={handleChange}>
                  <option value="">{t(`home.search.options.all`)}</option>
                  {prefectures.map((prefecture, index) => (
                    <option key={index} value={prefecture}>
                      {prefecture}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Match Format Field */}
            <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-5">
              <div className="d-block w-100">
                <h5 className="text-green3 mt-0 mb-3 text-18 fw-bold">
                  {t("home.search.fields.tournamentType")}
                </h5>
                <div className="d-flex w-100 align-items-start justify-content-start flex-wrap checkbox-selector-all">
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-4 me-2 py-2 position-relative ${
                      matchFormat === "all" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">
                      {t("home.search.options.all")}
                    </span>
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
                    <span className="text-14 d-inline-block">
                      {t("home.search.options.team")}
                    </span>
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
                    <span className="text-14 d-inline-block">
                      {t("home.search.options.single")}
                    </span>
                    <input
                      type="radio"
                      name="match_format"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="single"
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`d-inline-block checkbox-selector-wrapper border border-color-silver2 rounded-2 px-2 py-2 position-relative ${
                      matchFormat === "double" && "checkbox-selector-active"
                    }`}
                  >
                    <span className="text-14 d-inline-block">
                      {t("home.search.options.double")}
                    </span>
                    <input
                      type="radio"
                      name="match_format"
                      className="position-absolute checkbox-selector-1 opacity-0 top-0 start-0 w-100 h-100"
                      value="double"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Search with Conditions Link */}
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
          <Slider {...getSliderSettings()} className="custom-slider1 arrows-1">
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
                  <h5 className="text-grey1 text-14">
                    Dates
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      {new Date(tournament.event_date).toDateString()}
                    </span>
                  </h5>
                  <h5 className="text-grey1 text-14">
                    Region
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      {tournament.region &&
                        t(`home.search.regions.${tournament.region}`)}
                    </span>
                  </h5>
                  <h5 className="text-grey1 text-14 mt-0 mb-2">
                    Prefecture
                    <span className="text-green4 d-inline-block ms-1 fw-bold">
                      {tournament.prefecture}
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
