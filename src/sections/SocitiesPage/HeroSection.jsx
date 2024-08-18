import React from "react";
import Image from "next/image";
import styled from "styled-components";

// Styled components
const HeroContainer = styled.div`
  font-family: monospace;
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  filter: blur(5px);
  transform: scale(1.1);
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 80%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

function HeroSection({ path }) {
  return (
    <HeroContainer>
      <HeroImage src={path} alt="Hero Image" layout="fill" priority />
      <TextOverlay>
        <Title>IEEE PES SAHRDAYA</Title>
        <Subtitle>
          WELCOME TO THE POWER AND ENERGY SOCIETY (PES) AT IEEE SAHRDAYA STUDENT
          BRANCH!
        </Subtitle>
      </TextOverlay>
    </HeroContainer>
  );
}

export default HeroSection;
