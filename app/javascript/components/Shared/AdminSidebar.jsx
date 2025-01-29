import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AdminSidebar = () => {
  const { t } = useTranslation();
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
            alt={t('adminSidebar.logo.alt')}
          />
        </div>
        <div className="d-block w-100 px-3 mb-4">
          <h3 className="text-black fw-bold text-20 merriweather-font">
            {role != "Both" ? role : "Tournament Organizer"}
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
                    {t('adminSidebar.menu.tournamentManagement')}
                  </NavLink>
                </li>
              </>
            )}

            {role === "Admin" && (
              <>
                <li>
                  <NavLink
                    to="/users-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    {t('adminSidebar.menu.usersManagement')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/organizer-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    {t('adminSidebar.menu.organizerManagement')}
                  </NavLink>
                </li>
              </>
            )}

            {(role === "Tournament Organizer" ||
              role === "Both" ||
              role === "Admin") && (
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
                    {t('adminSidebar.menu.tournamentCreation')}
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
                    {t('adminSidebar.menu.splitManagement')}
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
                    {t('adminSidebar.menu.playerManagement')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/match-management"
                    className={({ isActive }) =>
                      isActive
                        ? "left-menu-btn1 merriweather-font active"
                        : "left-menu-btn1 merriweather-font"
                    }
                  >
                    {t('adminSidebar.menu.matchManagement')}
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
                    {t('adminSidebar.menu.timetable')}
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
                    {t('adminSidebar.menu.notificationManagement')}
                  </NavLink>
                </li>
              </>
            )}

            <>
              <li>
                <NavLink
                  to="/tournament-timetable"
                  className={({ isActive }) =>
                    isActive
                      ? "left-menu-btn1 merriweather-font active"
                      : "left-menu-btn1 merriweather-font"
                  }
                >
                  {t('adminSidebar.menu.tournaments')}
                </NavLink>
              </li>
            </>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;