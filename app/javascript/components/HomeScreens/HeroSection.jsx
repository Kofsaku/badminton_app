import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-5 bg-green2">
      <div className="container">
        <div className="d-block w-100 my-lg-5 my-md-5 my-sm-4 my-2">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              <div className="d-block w-100 pb-4">
                <span className="text-green4 d-inline-block rounded-pill px-4 py-1 text-14 border border-color-silver2 mb-3 fw-bold">
                  Limitless control on one platform
                </span>
                <h3 className="text-green4 text-60 mob-text-40 fw-bold mt-0 mb-2">
                  The best <br /> Badminton app.
                </h3>
                <p className="text-green4 text-15 mt-0 mb-0 small-width2 lh-normal1">
                  Lorem ipsum dolor sit amet consectetur. Faletra dignissim brandit kiss org. Proin mattis Phasellus Phasellus facilis vulputate dictumst non-consequat. Fringilla of elite bellproinhendrerit adipisingeget.
                </p>
              </div>
              <div className="d-block w-100 pb-5 pt-2">
                <div className="d-flex toggle-wrapper px-2 py-2 w-100 align-items-center justify-content-between rounded-pill bg-white overflow-hidden">
                  <button className="toggle-btn1 active-toggle">I'm a player</button>
                  <button className="toggle-btn1">I am a tournament organizer</button>
                </div>
              </div>
              <div className="d-block w-100 pt-3">
                <h4 className="text-green4 mt-0 mb-3 text-16 fw-bold">Approved By</h4>
              </div>
              <div className="d-flex flex-wrap w-100 align-items-center justify-content-start">
                <img src="images/approved-logo1.png" className="me-5" alt="Approved Logo 1" />
                <img src="images/approved-logo2.png" className="me-5" alt="Approved Logo 2" />
                <img src="images/approved-logo3.png" className="me-5" alt="Approved Logo 3" />
                <img src="images/approved-logo4.png" alt="Approved Logo 4" />
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
              <div className="d-block w-100 text-center">
                <img className="custom-image2" src="images/shuttle.png" alt="Shuttle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
