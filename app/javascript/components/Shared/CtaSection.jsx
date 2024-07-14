import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="bg-green1 py-4">
      <div className="container">
        <div className="row align-items-center my-2">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-0 mb-4">
            <h4 className="text-white text-26 mob-text-25 m-0 text-lg-start text-md-start text-center">
              Download the app
            </h4>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="d-flex align-items-center justify-content-lg-end justify-content-md-end justify-content-center">
              <Link to="#">
                <img src="images/apple-store.png" alt="Apple Store" />
              </Link>
              <Link to="#" className="ms-3">
                <img src="images/google-store.png" alt="Google Store" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
