import React from 'react';

const FeatureSection = () => {
  return (
    <section className="py-5 bg-sec1">
      <div className="container">
        <div className="d-block w-100 pb-5">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-1 order-md-1 order-sm-2 order-2">
              <div className="d-block w-100">
                <h3 className="text-green3 fw-bold mt-0 mb-4 text-35 mob-text-30">
                  Lorem ipsum dolor sit amet consectetur. Natok Premium ID when sitting.
                </h3>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon1.png" alt="Feature Icon 1" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          Affordable price
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon2.png" alt="Feature Icon 2" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          iOS and Android apps
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon3.png" alt="Feature Icon 3" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          Player Friendly
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon4.png" alt="Feature Icon 4" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          Maintenance
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon5.png" alt="Feature Icon 5" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          Easy to use
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-inline-block">
                        <img src="images/feature-icon6.png" alt="Feature Icon 6" />
                      </div>
                      <div className="d-inline-block ps-3">
                        <span className="text-green3 fw-bold text-17 w-100 d-block">
                          Access to all features
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="" className="bg-green1 bg-hover-black mt-3 text-white rounded-pill px-4 py-2 lh-lg border-0 text-16">
                  Join Us
                  <i className="fa fa-arrow-right ms-2 text-16"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-2 order-md-2 order-sm-1 order-1">
              <div className="d-block w-100">
                <img src="images/player-mockup.png" alt="Player Mockup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
