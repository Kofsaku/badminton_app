import React from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import HeroSection from './HomeScreens/HeroSection';
import SearchSection from './HomeScreens/SearchSection';
import FeatureSection from './HomeScreens/FeatureSection';
import ProductSection from './HomeScreens/ProductSection';
import UseSection from './HomeScreens/UseSection';
import CtaSection from './HomeScreens/CtaSection';
import TeamSearchSection from './HomeScreens/TeamSearchSection';
import Footer from './Footer';

export default () => (
  <div>
    <Header />
    <HeroSection />
    <SearchSection />
    <TeamSearchSection />
    <FeatureSection />
    <ProductSection />
    <UseSection />
    <CtaSection />
    <Footer />
  </div>
);
