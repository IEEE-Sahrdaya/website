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

const SectionContainer = styled(motion.div)`
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

function AboutSection({ title, textContent, imageSrc }) {
  return (
    <SectionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <StyledH1>{title}</StyledH1>
      <ContentContainer>
        <TextContainer>
          <p className="text-black text-sm md:text-lg lg:text-lg leading-relaxed">
            {textContent}
          </p>
        </TextContainer>
        <ImageContainer
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={3000}
            height={1000}
          />
        </ImageContainer>
      </ContentContainer>
    </SectionContainer>
  );
}

export default AboutSection;
