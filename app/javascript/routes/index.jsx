import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../components/About"
import Faqs from "../components/Faqs"
import TermsOfService from "../components/TermsOfService"
import PrivacyPolicy from "../components/PrivacyPolicy"
import Contact from "../components/Contact"
import AccountForm from "../components/CreateAccount/AccountForm"
import Login from "../components/Login"
import Tournaments from '../pages/Tournaments';
import CreateTournament from '../pages/Tournaments/Create';
import EditTournament from '../pages/Tournaments/Edit';
import TimeTable from '../pages/Tournaments/TimeTable';
import Players from '../pages/Players';
import ProtectedRoute from './ProtectedRoute';

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
      <Route path="/tournament-creation" element={<CreateTournament />} />
      <Route
        path="/tournament-management"
        element={
          <ProtectedRoute>
            <Tournaments />
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
      <Route path="/tournaments/:id/edit" element={<EditTournament />} />
      <Route path="/players-management" element={<Players />} />
      <Route path="/timetable" element={<TimeTable />} />
    </Routes>
  </Router>
);
