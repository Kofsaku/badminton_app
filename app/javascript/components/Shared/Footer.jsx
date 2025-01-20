import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t: footer_translation } = useTranslation();

  const socialLinks = [
    { icon: 'fb-green-icon.svg', alt: footer_translation('footer.social.facebook') },
    { icon: 'twitter-green-icon.svg', alt: footer_translation('footer.social.twitter') },
    { icon: 'linkedin-green-icon.svg', alt: footer_translation('footer.social.linkedin') }
  ];

  const bottomLinks = [
    { path: '/about', text: footer_translation('footer.bottomLinks.0') },
    { path: '/contact', text: footer_translation('footer.bottomLinks.1') },
    { path: '/privacy-policy', text: footer_translation('footer.bottomLinks.2') },
    { path: '#', text: footer_translation('footer.bottomLinks.3') },
    { path: '/terms-of-service', text: footer_translation('footer.bottomLinks.4') }
  ];

  return (
    <footer>
      <div className="d-block w-100 border-bottom py-5">
        <div className="container">
          <div className="row my-4 py-2">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="d-block w-100 mb-lg-0 mb-md-0 mb-4">
                <Link to="/">
                  <img
                    className="footer-logo mb-3"
                    src="/images/badminton-dark-logo.png"
                    alt="Badminton Logo"
                  />
                </Link>
                <h5 className="text-green3 mt-0 mb-2 text-17 fw-bold">
                  Main Slogan here,
                </h5>
                <p className="text-green3 fw-normal mt-0 mb-3 text-14">
                  Supporting line here
                </p>
                <div className="d-flex align-items-center justify-content-start">
                  {socialLinks.map((link, index) => (
                    <Link to="#" key={index} className="me-2">
                      <img src={`/images/${link.icon}`} alt={link.alt} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="d-block w-100 mt-3">
                    <h3 className="text-green3 mt-0 mb-3 fw-bold text-18">
                      Useful links
                    </h3>
                    <ul className="list-style-none m-0 p-0">
                      {bottomLinks.slice(0, 3).map((link, index) => (
                        <li className="mb-2" key={index}>
                          <Link
                            to={link.path}
                            className="text-grey1 text-14 m-0 text-hover-black"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                  <div className="d-block w-100 mt-3">
                    <h3 className="text-green3 mt-0 mb-3 fw-bold text-18">
                      Our Company
                    </h3>
                    <ul className="list-style-none m-0 p-0">
                      {bottomLinks.slice(3).map((link, index) => (
                        <li className="mb-2" key={index}>
                          <Link
                            to={link.path}
                            className="text-grey1 text-14 m-0 text-hover-black"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
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
                {bottomLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-muted text-14 ms-0 me-3"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12 mt-lg-0 mt-md-0 mt-3">
              <p className="text-lg-end text-md-end text-start text-muted p-0 m-0 mob-text-14 text-14">
                {footer_translation('footer.copyright')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
