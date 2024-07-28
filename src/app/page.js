import Navbar from "@/components/Navbar/Navbar";
import AboutSection from "@/sections/HomePage/AboutSection";
import HeroSection from "@/sections/HomePage/HeroSection";
import InformantSection from "@/sections/HomePage/InformantSection";
import LatestEventSection from "@/sections/HomePage/LatestEventSection";
import Societies from "@/sections/HomePage/Societies";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        
        <HeroSection />
        <AboutSection />
        <InformantSection />
        <LatestEventSection />
        <Societies />
      </div>
    </div>
  );
};

export default Home;
