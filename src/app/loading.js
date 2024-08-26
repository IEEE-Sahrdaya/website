"use client";
import Image from "next/image";
import React from "react";
import styled, { keyframes } from "styled-components";
import SBFavicon from "../../public/images/favicon_logo.jpg";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border: 4px solid #0072c6;
  border-top: 4px solid #00b5e2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <SpinnerWrapper>
      <Spinner>
        <Image
          alt="SB Logo"
          priority={true}
          src={SBFavicon}
          height={50}
          width={50}
        />
      </Spinner>
    </SpinnerWrapper>
  );
}
