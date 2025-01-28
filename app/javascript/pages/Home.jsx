import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Header from "../components/Shared/Header";
import CtaSection from "../components/Shared/CtaSection";
import HeroSection from "../components/HomeScreens/HeroSection";
import SearchSection from "../components/HomeScreens/SearchSection";
import TournamentSection from "../components/HomeScreens/TournamentSection";
import ResultSection from "../components/HomeScreens/ResultSection";
import PickOutSection from "../components/HomeScreens/PickOutSection";
import FeatureSection from "../components/HomeScreens/FeatureSection";
import ProductSection from "../components/HomeScreens/ProductSection";
import UseSection from "../components/HomeScreens/UseSection";
import TeamSearchSection from "../components/HomeScreens/TeamSearchSection";
import Footer from "../components/Shared/Footer";

const Home = () => {
  const [activeToggle, setActiveToggle] = useState('player');

  return (
    <div>
      <Header />
      <HeroSection activeToggle={activeToggle} setActiveToggle={setActiveToggle} />
      {activeToggle === 'player' ? (
        <>
          <SearchSection />
          {/* <FeatureSection /> */}
        </>
      ) : (
        <>
          <UseSection />
          <ProductSection />

        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
