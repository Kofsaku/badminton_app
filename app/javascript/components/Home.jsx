import React from "react";
import { Link } from "react-router-dom";
import Header from './Shared/Header';
import CtaSection from './Shared/CtaSection';
import HeroSection from './HomeScreens/HeroSection';
import SearchSection from './HomeScreens/SearchSection';
import TournamentSection from './HomeScreens/TournamentSection';
import ResultSection from './HomeScreens/ResultSection';
import PickOutSection from './HomeScreens/PickOutSection';
import FeatureSection from './HomeScreens/FeatureSection';
import ProductSection from './HomeScreens/ProductSection';
import UseSection from './HomeScreens/UseSection';
import TeamSearchSection from './HomeScreens/TeamSearchSection';
import Footer from './Shared/Footer';

export default () => (
  <div>
    <Header />
    <HeroSection />
    <SearchSection />
    <TournamentSection />
    <ResultSection />
    <PickOutSection />
    <TeamSearchSection />
    <FeatureSection />
    <ProductSection />
    <UseSection />
    <CtaSection />
    <Footer />
  </div>
);
