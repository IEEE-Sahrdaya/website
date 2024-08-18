"use client";

import React, { useEffect, useState } from "react";
import SocietiesNavbar from "@/sections/SocitiesPage/Navbar/SocietiesNavbar";
import HeroSection from "@/sections/SocitiesPage/HeroSection";
import AboutSection from "@/sections/HomePage/AboutSection";
import { AboutSectionData } from "./data";
import {
  fetchAllEvents,
  fetchEventsBySociety,
  fetchPeopleBySociety,
  getSociety,
} from "@/utils/FirebaseFunctions";
import LatestEventSection from "@/sections/HomePage/LatestEventSection";
import { usePathname } from "next/navigation";
import ExecomSection from "@/sections/HomePage/ExecomSection";
import FooterSection from "@/sections/HomePage/FooterSection";
import ContactSection from "@/sections/SocitiesPage/ContactSection";

function Page() {
  const [latestSectionData, setLatestSectionData] = useState([]);
  const [Execom, setExecom] = useState([])
  const fullPath = usePathname();
  const SocietyCode = fullPath.split("/").pop();

  useEffect(() => {
    fetchEventsBySociety(SocietyCode, setLatestSectionData);
    fetchPeopleBySociety(SocietyCode, setExecom)
  }, [SocietyCode]);
  const logo = {
    src: "/images/Societies/PES/Society-Logo1.png",
    alt: "Logo",
    width: 100,
    height: 20,
  };

  const navLinks = [
    { href: "#about", text: "About Us" },
    { href: "#execom", text: "Team" },
    { href: "#events", text: "Events" },
  ];

  const buttonLink = {
    href: "/join-ieee",
    text: "Join IEEE Sahrdaya",
  };

  return (
    <div>
      <SocietiesNavbar
        logo={logo}
        navLinks={navLinks}
        buttonLink={buttonLink}
      />
      <HeroSection path="/images/Societies/PES/hero.png" />
      <AboutSection
        title={AboutSectionData.title}
        textContent={AboutSectionData.textContent}
        imageSrc={AboutSectionData.imageSrc}
      />
      <LatestEventSection title="Latest Events" events={latestSectionData} />
      <ExecomSection people={Execom}/>
      <ContactSection email={'ieeepes@sahrdaya.ac.in'}/>
      <FooterSection/>
    </div>
  );
}

export default Page;
