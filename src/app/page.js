"use client";

import Navbar from "@/components/Navbar/Navbar";
import AboutSection from "@/sections/HomePage/AboutSection";
import ExecomSection from "@/sections/HomePage/ExecomSection";
import FooterSection from "@/sections/HomePage/FooterSection";
import HeroSection from "@/sections/HomePage/HeroSection";
import InformantSection from "@/sections/HomePage/InformantSection";
import LatestEventSection from "@/sections/HomePage/LatestEventSection";
import Societies from "@/sections/HomePage/Societies";
import {
  fetchAllEvents,
  fetchPeopleBySociety,
} from "@/utils/FirebaseFunctions";
import { useEffect, useState } from "react";
import { AboutSectionData } from "./data";

const Home = () => {
  const [aboutsectionData, setAboutSectionData] = useState(AboutSectionData);
  const [latestsectionData, setLatestSectionData] = useState([]);
  const [ExecomData, setExecomData] = useState([]);
  useEffect(() => {
    fetchAllEvents(setLatestSectionData);
    fetchPeopleBySociety("sb", setExecomData);
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
        <LatestEventSection title="Latest Events" events={latestsectionData} />
        <Societies />
        {
          // Show faculty advisor, chair, vice chair only on home page
        }
        <ExecomSection
          people={ExecomData.slice(0, 3)}
          showFullExecomBtn={true}
        />
        <FooterSection />
      </div>
    </div>
  );
};

export default Home;
