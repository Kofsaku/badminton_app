import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const role = useSelector((state) => state.user.role);

  return (
    <section className="left-sidebar-wrapper bg-white overflow-auto custom-scroll1">
      <div className="d-block w-100">
        <div className="d-lg-none d-sm-block d-block text-start">
          <button
            id="admin-close-icon"
            className="border-0 bg-transparent px-3 py-3"
          >
            <i className="fa fa-times text-black text-20"> </i>
          </button>
        </div>
        <div className="d-block w-100 py-lg-5 py-md-5 pt-sm-2 pb-sm-5 pt-2 pb-5 text-center">
          <img
            className="admin-logo"
            src="/images/badminton-admin-logo.png"
            alt="Admin Logo"
          />
        </div>
        <div className="d-block w-100 px-3 mb-4">
          <h3 className="text-black fw-bold text-20 merriweather-font">
            {" "}
            Tournament Organizer{" "}
          </h3>
        </div>
        <div className="d-block px-3 mb-4">
          <ul className="list-style-none p-0 m-0">
            {/* Links for role == 'Player' */}
            {(role === "Tournament Organizer" ||
              role === "Admin" ||
              role === "Both") && (
              <>
                <li>
                  <NavLink
                    to="/tournament-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Tournament Management
                  </NavLink>
                </li>
              </>
            )}

            {role === "Admin" && (
              <>
                <li>
                  <NavLink
                    to="/users-management"
                    className="left-menu-btn1 merriweather-font"
                    activeClassName="active"
                  >
                    Users Management
                  </NavLink>
                </li>
              </>
            )}

            {(role === "Tournament Organizer" || role === "Both") && (
              <>
                <li>
                  <NavLink
                    to="/tournament-creation"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Tournament Creation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="type-management#"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Type Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="split-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Split Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/players-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Player Management
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tournament-tables"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    League/Tournament Tables
                  </NavLink>
                </li>
              </>
            )}

            {(role === "Tournament Organizer" ||
              role === "Admin" ||
              role === "Both") && (
              <>
                <li>
                  <NavLink
                    to="/timetables"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Timetable
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/notifications-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    Notification Management
                  </NavLink>
                </li>
              </>
            )}

            {role === "Player" && (
              <>
                <li>
                  <NavLink
                    to="/tournament-timetable"
                    className="left-menu-btn1 merriweather-font"
                    activeClassName="active"
                  >
                    Tournaments
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
