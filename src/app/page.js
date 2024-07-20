import Navbar from "@/components/Navbar";
import HeroSection from "@/sections/HomePage/HeroSection";
import React from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="px-3">
        
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
