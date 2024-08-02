"use client"

import Navbar from "@/components/Navbar/Navbar";
import AboutSection from "@/sections/HomePage/AboutSection";
import FooterSection from "@/sections/HomePage/FooterSection";
import HeroSection from "@/sections/HomePage/HeroSection";
import InformantSection from "@/sections/HomePage/InformantSection";
import LatestEventSection from "@/sections/HomePage/LatestEventSection";
import Societies from "@/sections/HomePage/Societies";
import React , {useEffect, useState} from "react";
import { AboutSectionData , LatestEventSectionData } from "./data";

const Home = () => {
  const [aboutsectionData, setAboutSectionData] = useState(AboutSectionData);
  const [latestsectionData, setLatestSectionData] = useState(LatestEventSectionData);


  useEffect(() => {
    // Fetch data from API
    // Update state
  }, []);
  return (
    <div>
      <Navbar />
      <div className="">
        
        <HeroSection />
        <AboutSection
        title={aboutsectionData.title}
        textContent={aboutsectionData.textContent}
        imageSrc={aboutsectionData.imageSrc}
        />
        <InformantSection />
        <LatestEventSection 
         title="Latest Events"
          events={latestsectionData}

        />
        <Societies />
        <FooterSection />
      </div>
    </div>
  );
};

export default Home;
