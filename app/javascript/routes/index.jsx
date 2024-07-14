import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About"
import Faqs from "../components/Faqs"
import TermsOfService from "../components/TermsOfService"
import PrivacyPolicy from "../components/PrivacyPolicy"
import Contact from "../components/Contact"

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
);
