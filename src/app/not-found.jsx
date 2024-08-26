"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const StyledH1 = styled.h1`
  margin-top: 2rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
  font-size: 2.5rem;
  color: #2563eb;
`;

const SectionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  @media (min-width: 768px) {
    padding: 2.4rem;
  }
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  height: auto;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  @media (min-width: 768px) {
    width: 50%;
    align-items: flex-start;
  }
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

function NotFound() {
  return (
    <>
      <SectionContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledH1>404 Page Not Found</StyledH1>
        <ContentContainer>
          <TextContainer>
            <p className="text-black text-lg md:text-xl lg:text-2xl leading-relaxed text-center md:text-left mb-4">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left">
              Don&apos;t worry, you can always return to our homepage and
              explore from there.
            </p>
            <StyledLink href="/">Return to Homepage</StyledLink>
          </TextContainer>
          <ImageContainer
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src="/images/404.png"
              alt="404 Not Found"
              width={500}
              height={500}
            />
          </ImageContainer>
        </ContentContainer>
      </SectionContainer>
    </>
  );
}

export default NotFound;
