import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-5 bg-green2">
      <div className="container">
        <div className="d-block w-100">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="d-block w-100">
                <h3 className="text-green4 text-42 mob-text-30 fw-bold mt-0 mb-2">About the Badminton</h3>
                <p className="text-green4 text-15 mt-0 mb-0 small-width2">
                  Lorem ipsum dolor sit amet consectetur. Magnis placerat eros id adipiscing non. Egestas pellentesque sed aliquam dolor quis.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-block w-100 text-center">
                <img className="about-symbol" src="images/about-symbol.png" alt="About Symbol" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
