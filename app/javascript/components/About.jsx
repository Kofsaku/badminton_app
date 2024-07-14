import React from "react";
import Header from './Shared/Header';
import HeroSection from './AboutScreens/HeroSection';
import VisionSection from './AboutScreens/VisionSection';
import PartnersSection from './AboutScreens/PartnersSection';
import StorySection from './AboutScreens/StorySection';
import CultureAndValuesSection from './AboutScreens/CultureAndValuesSection';
import TeamSection from './AboutScreens/TeamSection';
import CtaSection from './Shared/CtaSection';
import Footer from './Shared/Footer';

export default () => (
  <div>
    <Header />
    <HeroSection />
    <VisionSection />
    <StorySection />
    <CultureAndValuesSection />
    <PartnersSection />
    <TeamSection />
    <CtaSection />
    <Footer />
  </div>
);
