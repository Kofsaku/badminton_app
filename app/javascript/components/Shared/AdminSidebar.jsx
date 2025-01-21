import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AdminSidebar = () => {
  const { t } = useTranslation();
  const role = useSelector((state) => state.user.role);

  const menuItems = {
    organizer: [
      {
        path: "/tournament-management",
        text: t("adminSidebar.menu.tournamentManagement"),
      },
      {
        path: "/tournament-creation",
        text: t("adminSidebar.menu.tournamentCreation"),
      },
      { path: "type-management#", text: t("adminSidebar.menu.typeManagement") },
      {
        path: "split-management",
        text: t("adminSidebar.menu.splitManagement"),
      },
      {
        path: "/players-management",
        text: t("adminSidebar.menu.playerManagement"),
      },
      {
        path: "/match-management",
        text: t("adminSidebar.menu.matchManagement"),
      },
    ],
    admin: [
      {
        path: "/players-management",
        text: t("adminSidebar.menu.usersManagement"),
      },
      {
        path: "/organizer-management",
        text: t("adminSidebar.menu.organizerManagement"),
      },
      {
        path: "/tournament-management",
        text: t("adminSidebar.menu.tournamentManagement"),
      },
    ],
    common: [
      { path: "/timetables", text: t("adminSidebar.menu.timetable") },
      {
        path: "/notifications-management",
        text: t("adminSidebar.menu.notificationManagement"),
      },
    ],
    player: [
      {
        path: "/tournament-timetable",
        text: t("adminSidebar.menu.tournaments"),
      },
      {
        path: "/team-matches",
        text: t("adminSidebar.menu.teamMatches")
      }
    ],
  };

  const renderMenu = (items) =>
    items.map((item, index) => (
      <li key={index}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "left-menu-btn1 merriweather-font active"
              : "left-menu-btn1 merriweather-font"
          }
        >
          {item.text}
        </NavLink>
      </li>
    ));

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
            alt={t("adminSidebar.logo.alt")}
          />
        </div>
        <div className="d-block w-100 px-3 mb-4">
          <h3 className="text-black fw-bold text-20 merriweather-font">
            {role !== "Both" ? role : "Tournament Organizer"}
          </h3>
        </div>
        <div className="d-block px-3 mb-4">
          <ul className="list-style-none p-0 m-0">
            {/* Common Menu */}
            {renderMenu(menuItems.common)}

            {/* Admin Menu */}
            {(role === "Admin" || role === "Both") &&
              renderMenu(menuItems.admin)}

            {/* Organizer Menu */}
            {(role === "Tournament Organizer" || role === "Both") &&
              renderMenu(menuItems.organizer)}

            {/* Player Menu */}
            {role === "Player" && renderMenu(menuItems.player)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminSidebar;
