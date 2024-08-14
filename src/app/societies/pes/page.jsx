"use client";

import React, { useEffect , useState} from 'react';
import SocietiesNavbar from '@/sections/SocitiesPage/Navbar/SocietiesNavbar';
import HeroSection from '@/sections/SocitiesPage/HeroSection';
import AboutSection from '@/sections/HomePage/AboutSection';
import { AboutSectionData } from './data';
import { fetchAllEvents } from "@/utils/FirebaseFunctions";
import LatestEventSection from '@/sections/HomePage/LatestEventSection';

function Page() {

    const [latestSectionData, setLatestSectionData] = useState([]);

    useEffect(() => {
        fetchAllEvents(setLatestSectionData);
    }, []);
    const logo = {
        src: '/images/Societies/PES/Society-Logo1.png', 
        alt: 'Logo',
        width: 100,
        height: 20,
    };

    const navLinks = [
        { href: '#about', text: 'About Us' },
        { href: '#team', text: 'Team' },
        { href: '#events', text: 'Events' },
    ];

    const buttonLink = {
        href: '/join-ieee',
        text: 'Join IEEE Sahrdaya',
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
        
            
        </div>
    );
}

export default Page;
