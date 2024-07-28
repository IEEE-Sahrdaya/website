"use client";

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledH1 = styled.h1`
  margin-top: 2rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  padding: 0 1rem;
  font-size: 1.8rem;
  color: #2563eb;
`;

const AboutSectionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    padding: 2.4rem;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  height: auto;
  width: 100%;
`;

const TextContainer = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ImageContainer = styled(motion.div)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    width: 50%;
  }
`;

function AboutSection() {
  return (
    <AboutSectionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <StyledH1>About Us</StyledH1>
      <ContentContainer>
        <TextContainer>
          <p className="text-black text-sm md:text-lg lg:text-lg leading-relaxed">
            IEEE Sahrdaya is a dynamic space where connections flourish and
            growth takes root. We offer an inviting environment that encourages
            networking and the forging of meaningful professional relationships.
            Our diverse range of events is meticulously designed to amplify both
            leadership and technical skills. From engaging workshops and
            enlightening seminars to spirited technical competitions, we provide
            a pathway for members to excel and innovate. As a community, we are
            dedicated to nurturing the latent potential of each individual.
            Through interactive experiences and knowledge-sharing, we strive to
            kindle the flames of creativity and ingenuity. Join us at IEEE
            Sahrdaya to embark on an exciting journey of learning,
            collaboration, and empowerment, as we collectively shape the
            ever-evolving landscape of technology and its impact on society.
          </p>
        </TextContainer>
        <ImageContainer
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src="/images/AboutIMG.jpg"
            alt="About"
            width={3000}
            height={1000}
          />
        </ImageContainer>
      </ContentContainer>
    </AboutSectionContainer>
  );
}

export default AboutSection;
