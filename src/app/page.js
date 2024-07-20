import Navbar from "@/components/Navbar";
import AboutSection from "@/sections/HomePage/AboutSection";
import HeroSection from "@/sections/HomePage/HeroSection";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="px-3">
        
        <HeroSection />
        <AboutSection />
      </div>
    </div>
  );
};

export default Home;
