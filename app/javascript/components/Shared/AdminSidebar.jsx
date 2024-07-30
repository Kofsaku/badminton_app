import React, { useState } from 'react';

const AdminSidebar = () => {
  return (
    <section className="left-sidebar-wrapper bg-white overflow-auto custom-scroll1">
      <div className="d-block w-100">
        <div className="d-lg-none d-sm-block d-block text-start">
          <button id="admin-close-icon" className="border-0 bg-transparent px-3 py-3">
            <i className="fa fa-times text-black text-20"> </i>
          </button>
        </div>
        <div className="d-block w-100 py-lg-5 py-md-5 pt-sm-2 pb-sm-5 pt-2 pb-5 text-center">
          <img className="admin-logo" src="/images/badminton-admin-logo.png" alt="Admin Logo" />
        </div>
        <div className="d-block w-100 px-3 mb-4">
          <h3 className="text-black fw-bold text-20 merriweather-font"> Tournament Organizer </h3>
        </div>
        <div className="d-block px-3 mb-4">
          <ul className="list-style-none p-0 m-0">
            <li>
              <a href="tournament-management.html" className="left-menu-btn1 active merriweather-font"> Tournament Management </a>
            </li>
            <li>
              <a href="tournament-creation.html" className="left-menu-btn1 merriweather-font"> Tournament Creation </a>
            </li>
            <li>
              <a className="left-menu-btn1 merriweather-font"> Type Management </a>
            </li>
            <li>
              <a className="left-menu-btn1 merriweather-font"> Split Management </a>
            </li>
            <li>
              <a href="player-management.html" className="left-menu-btn1 merriweather-font"> Player Management </a>
            </li>
            <li>
              <a href="league-tournament-tables.html" className="left-menu-btn1 merriweather-font"> League/Tournament Tables </a>
            </li>
            <li>
              <a href="tournament-timetable.html" className="left-menu-btn1 merriweather-font"> Timetable</a>
            </li>
            <li>
              <a href="notifications-management.html" className="left-menu-btn1 merriweather-font"> Notification Management </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default AdminSidebar;
