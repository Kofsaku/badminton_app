import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green1">
      <div className="container">
        <div className="header-row d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/">
              <img src="images/badminton-white-logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="navbar-custom">
            <div className="menu-item-btn menu-active-btn">
              <Link to="/">
                家
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/about">
                About
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/services">
                Service
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/faqs">
                FAQ's
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/privacy-policy">
                Privacy Policy
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/terms-of-service">
                Terms of Service
              </Link>
            </div>
            <div className="menu-item-btn">
              <Link to="/contact">
                Contact
              </Link>
            </div>
            <div className="d-inline-block">
              <Link to="/create-account" className="header-btn1">
                Sign up now
              </Link>
            </div>
          </div>
          <div className="navbar-handler d-lg-none d-md-none d-sm-block d-block">
            <button id="navbar-trigger" className="bg-transparent border-0 p-0">
              <img src="images/hamburger-icon.svg" alt="Menu" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
