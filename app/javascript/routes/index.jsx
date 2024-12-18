import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../components/About";
import Faqs from "../components/Faqs";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Contact from "../components/Contact";
import AccountForm from "../components/CreateAccount";
import Login from "../components/Login";
import Tournaments from "../pages/Tournaments";
import CreateTournament from "../pages/Tournaments/Create";
import ShowTournament from "../pages/Tournaments/Show";
import EditTournament from "../pages/Tournaments/Edit";
import CongratsProfile from "../components/CreateAccount/CongratsProfile";
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
import MatchList from "../pages/MatchList";
import NewMatch from "../pages/NewMatch";
import ScoreBoard from "../pages/ScoreBoard";
import MatchClass from "../pages/MatchClass/List";
import NewMatchClass from "../pages/MatchClass/New";
import TournamentOrganizers from "../pages/TournamentOrganizers/List";
import TournamentOrganizer from "../pages/TournamentOrganizers/Show";
import EditTournamentOrganizer from "../pages/TournamentOrganizers/Edit";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/create-account" element={<AccountForm />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/tournament-creation"
        element={
          <ProtectedRoute>
            <CreateTournament />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-management"
        element={
          <ProtectedRoute>
            <Tournaments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer-management"
        element={
          <ProtectedRoute>
            <TournamentOrganizers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer-management/:id"
        element={
          <ProtectedRoute>
            <TournamentOrganizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizer-management/:id/edit"
        element={
          <ProtectedRoute>
            <EditTournamentOrganizer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/congrats-profile"
        element={
          <ProtectedRoute>
            <CongratsProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/tournament-details/:id" element={<ShowTournament />} />
      <Route
        path="/tournaments/:id/edit"
        element={
          <ProtectedRoute>
            <EditTournament />
          </ProtectedRoute>
        }
      />
      <Route
        path="/players-management"
        element={
          <ProtectedRoute>
            <Players />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match-class"
        element={
          <ProtectedRoute>
            <MatchClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/match-class/new"
        element={
          <ProtectedRoute>
            <NewMatchClass />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-tables"
        element={
          <ProtectedRoute>
            <TournamentTables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-tables/new-round-robin"
        element={
          <ProtectedRoute>
            <NewRoundRobin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-tables/new-knockout"
        element={
          <ProtectedRoute>
            <NewKnockout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-tables/:id"
        element={
          <ProtectedRoute>
            <TournamentTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tournament-tables/:id/edit"
        element={
          <ProtectedRoute>
            <EditTournamentTable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetables"
        element={
          <ProtectedRoute>
            <Timetables />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetables/new"
        element={
          <ProtectedRoute>
            <CreateTimetable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetables/:id"
        element={
          <ProtectedRoute>
            <ShowTimetable />
          </ProtectedRoute>
        }
      />
      <Route path="/matches" element={<MatchList />} />
      <Route path="/matches/new" element={<NewMatch />} />
      <Route path="/matches/:id/scoreboard" element={<ScoreBoard />} />
    </Routes>
  </Router>
);
