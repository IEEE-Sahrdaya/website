"use client";

import AboutSection from "@/sections/HomePage/AboutSection";
import ExecomSection from "@/sections/HomePage/ExecomSection";
import FooterSection from "@/sections/HomePage/FooterSection";
import LatestEventSection from "@/sections/HomePage/LatestEventSection";
import ContactSection from "@/sections/SocitiesPage/ContactSection";
import HeroSection from "@/sections/SocitiesPage/HeroSection";
import SocietiesNavbar from "@/sections/SocitiesPage/Navbar/SocietiesNavbar";
import {
  fetchEventsBySociety,
  fetchPeopleBySociety,
  fetchSocietyData,
} from "@/utils/FirebaseFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SocietyPage({ params }) {
  const router = useRouter();
  const [societyData, setSocietyData] = useState(null);
  const [latestEvents, setLatestEvents] = useState([]);
  const [execom, setExecom] = useState([]);
  const { slug } = params;

  useEffect(() => {
    const loadSocietyData = async () => {
      try {
        const data = await fetchSocietyData(slug);
        if (data.society === "") {
          router.push("/404"); // Redirect to 404 page if society not found
          return;
        }
        setSocietyData(data);
        fetchEventsBySociety(data.society, setLatestEvents);
        fetchPeopleBySociety(data.society, setExecom);
      } catch (error) {
        console.error("Error loading society data:", error);
        router.push("/404");
      }
    };

    loadSocietyData();
  }, [slug, router]);
  console.log(societyData);

  if (!societyData) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  const logo = {
    src: `/images/Societies/${slug}.png`, // You might want to add this to your societyData
    alt: `${societyData.society} Logo`,
    width: 100,
    height: 20,
  };

  const navLinks = [
    { href: "#about", text: "About Us" },
    { href: "#execom", text: "Team" },
    { href: "#events", text: "Events" },
  ];

  const societies = [
    { code: "cas", name: "Circuits and Systems Society" },
    { code: "cs", name: "Computer Society" },
    { code: "css", name: "Control Systems Society" },
    { code: "edsoc", name: "Education Society" },
    { code: "embs", name: "Engineering in Medicine and Biology Society" },
    { code: "ias", name: "Industry Applications Society" },
    { code: "ies", name: "Industrial Electronics Society" },
    { code: "npss", name: "Nuclear and Plasma Sciences Society" },
    { code: "pes", name: "Power and Energy Society" },
    { code: "ps", name: "Photonics Society" },
    { code: "ras", name: "Robotics and Automation Society" },
    {
      code: "sight",
      name: "Special Interest Group on Humanitarian Technology",
    },
    { code: "sps", name: "Signal Processing Society" },
    { code: "wie", name: "Women In Engineering" },
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
      <HeroSection
        path={societyData.heroImage}
        title={`IEEE ${societyData.society.toUpperCase()} SAHRDAYA`}
        subtitle={`WELCOME TO THE ${societies
          .find((society) => society.code === slug)
          .name.toUpperCase()} (${societyData.society.toUpperCase()}) AT IEEE SAHRDAYA STUDENT BRANCH!`}
      />
      <AboutSection
        title={`About ${societyData.society.toUpperCase()}`}
        textContent={societyData.aboutText}
        imageSrc={societyData.backgroundImage}
      />
      <LatestEventSection title="Latest Events" events={latestEvents} />
      <ExecomSection people={execom} />
      <ContactSection email={societyData.email} />
      <FooterSection />
    </div>
  );
}

export default SocietyPage;
