import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Logout function
  const logout = (e) => {
    e.preventDefault();
    dispatch(setUser({ apiKey: null, isLoggedIn: false }));
    navigate('/login');
  };

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
              {isLoggedIn ? (
                <>
                  <Link to="/tournament-management" className="header-btn1">
                    Dashboard
                  </Link>
                  <button className="header-btn1" onClick={logout}>
                    Signout
                  </button>
                </>
              ) : (
                <Link to="/create-account" className="header-btn1">
                  Signup
                </Link>
              )}
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
