import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../components/About"
import Faqs from "../components/Faqs"
import TermsOfService from "../components/TermsOfService"
import PrivacyPolicy from "../components/PrivacyPolicy"
import Contact from "../components/Contact"
import CreateAccount from "../components/CreateAccount"
import Login from "../components/Login"
import Tournaments from '../pages/Tournaments';
import CreateTournament from '../pages/Tournaments/Create';

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
      <Route path="/tournaments/new" element={<CreateTournament />} />
    </Routes>
  </Router>
);
