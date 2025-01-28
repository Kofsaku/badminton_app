import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t: translation } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const role = useSelector((state) => state.user.role);

  const menuItems = [
    { path: "/", text: translation("header.menu.home") },
    { path: "/about", text: translation("header.menu.about") },
    { path: "/services", text: translation("header.menu.services") },
    { path: "/faqs", text: translation("header.menu.faqs") },
    { path: "/privacy-policy", text: translation("header.menu.privacyPolicy") },
    {
      path: "/terms-of-service",
      text: translation("header.menu.termsOfService"),
    },
    { path: "/transactions-law", text: "特定商取引法" },
    { path: "/contact", text: translation("header.menu.contact") },
  ];

  const logout = (e) => {
    e.preventDefault();
    dispatch(logoutUser()); // Dispatch LOGOUT_USER action
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-green1">
      <div className="container">
        <div className="header-row d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/">
              <img src="/images/badminton-white-logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="navbar-custom">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`menu-item-btn ${
                  item.path === "/" ? "menu-active-btn" : ""
                }`}
              >
                <Link to={item.path}>{item.text}</Link>
              </div>
            ))}
            <div className="d-inline-block">
              {isLoggedIn ? (
                <>
                  <Link
                    to={
                      role === "player"
                        ? "/dashboard"
                        : "/tournament-management"
                    }
                    className="header-btn1 ml-20"
                  >
                    {translation("header.auth.dashboard")}
                  </Link>
                  <button className="header-btn1" onClick={logout}>
                    {translation("header.auth.signout")}
                  </button>
                </>
              ) : (
                <Link to="/create-account" className="header-btn1">
                  {translation("header.auth.signup")}
                </Link>
              )}
            </div>
          </div>
          <div className="navbar-handler d-lg-none d-md-none d-sm-block d-block">
            <button id="navbar-trigger" className="bg-transparent border-0 p-0">
              <img src="/images/hamburger-icon.svg" alt="Menu" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
