import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="d-block w-100 border-bottom py-5">
        <div className="container">
          <div className="row my-4 py-2">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-block w-100 mb-lg-0 mb-md-0 mb-4">
                <Link to="/">
                  <img className="footer-logo mb-3" src="images/badminton-dark-logo.png" alt="Badminton Logo" />
                </Link>
                <h5 className="text-green3 mt-0 mb-2 text-17 fw-bold">Main Slogan here,</h5>
                <p className="text-green3 fw-normal mt-0 mb-3 text-14">Supporting line here</p>
                <div className="d-flex align-items-center justify-content-start">
                  <Link to="#" className="me-2">
                    <img src="images/fb-green-icon.svg" alt="Facebook" />
                  </Link>
                  <Link to="#" className="me-2">
                    <img src="images/twitter-green-icon.svg" alt="Twitter" />
                  </Link>
                  <Link to="#" className="me-2">
                    <img src="images/linkedin-green-icon.svg" alt="LinkedIn" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="d-block w-100 mt-3">
                    <h3 className="text-green3 mt-0 mb-3 fw-bold text-18">Useful links</h3>
                    <ul className="list-style-none m-0 p-0">
                      <li className="mb-2">
                        <Link to="/" className="text-grey1 text-14 m-0 text-hover-black">家</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">For players</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">For tournament organizers</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="d-block w-100 mt-3">
                    <h3 className="text-green3 mt-0 mb-3 fw-bold text-18">Our Company</h3>
                    <ul className="list-style-none m-0 p-0">
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Link #1</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Link #2</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Link #3</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="d-block w-100 mt-3">
                    <h3 className="text-green3 mt-0 mb-3 fw-bold text-18">Contact Us</h3>
                    <ul className="list-style-none m-0 p-0">
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Phone: (123) 000-00000</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Email: email@email.com</Link>
                      </li>
                      <li className="mb-2">
                        <Link to="#" className="text-grey1 text-14 m-0 text-hover-black">Location: Location</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block w-100 py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
              <div className="d-flex flex-wrap align-items-center justify-content-start">
                <Link to="/about" className="text-muted text-14 ms-0 me-3">About Us</Link>
                <Link to="/contact" className="text-muted text-14 ms-0 me-3">Contact</Link>
                <Link to="/privacy-policy" className="text-muted text-14 ms-0 me-3">Privacy Policy</Link>
                <Link to="#" className="text-muted text-14 ms-0 me-3">How to Use</Link>
                <Link to="/terms-of-service" className="text-muted text-14 ms-0 me-3">Terms of Service</Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12 mt-lg-0 mt-md-0 mt-3">
              <p className="text-lg-end text-md-end text-start text-muted p-0 m-0 mob-text-14 text-14">
                © 2023 Badminton. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
