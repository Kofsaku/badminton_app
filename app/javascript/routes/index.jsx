import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../components/About";
import Faqs from "../components/Faqs";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Contact from "../components/Contact";
import CreateAccount from "../components/CreateAccount";
import Login from "../components/Login";
import Tournaments from "../pages/Tournaments";
import CreateTournament from "../pages/Tournaments/Create";
import EditTournament from "../pages/Tournaments/Edit";
import Timetables from "../pages/Timetables";
import CreateTimetable from "../pages/Timetables/New";
import ShowTimetable from "../pages/Timetables/Show";
import TournamentTables from "../pages/TournamentTables";
import NewRoundRobin from "../pages/TournamentTables/NewRoundRobin";
import NewKnockout from "../pages/TournamentTables/NewKnockout";
import TournamentTable from "../pages/TournamentTables/Show";
import EditTournamentTable from "../pages/TournamentTables/Edit";
import Players from "../pages/Players";
import ProtectedRoute from "./ProtectedRoute";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tournament-creation" element={<CreateTournament />} />
      <Route
        path="/tournament-management"
        element={
          <ProtectedRoute>
            <Tournaments />
          </ProtectedRoute>
        }
      />
      <Route path="/tournaments/:id/edit" element={<EditTournament />} />
      <Route path="/players-management" element={<Players />} />
      <Route path="/tournament-tables" element={<TournamentTables />} />
      <Route
        path="/tournament-tables/new-round-robin"
        element={<NewRoundRobin />}
      />
      <Route path="/tournament-tables/new-knockout" element={<NewKnockout />} />
      <Route path="/tournament-tables/:id" element={<TournamentTable />} />
      <Route
        path="/tournament-tables/:id/edit"
        element={<EditTournamentTable />}
      />
      <Route path="/timetables" element={<Timetables />} />
      <Route path="/timetables/new" element={<CreateTimetable />} />
      <Route path="/timetables/:id" element={<ShowTimetable />} />
    </Routes>
  </Router>
);
