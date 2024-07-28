"use client";

import React from "react";
import Image from "next/image";
import styled from "styled-components";

const StyledH1 = styled.h1`
  margin-top: 2rem;
  font-weight: bold;
  width: 100%;
  text-align: left;
  padding: 0 1rem;
  font-size: 1.8rem;
  color: #2563eb;
`;

function AboutSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <StyledH1>About Us</StyledH1>
      <div className="flex justify-center items-center h-auto w-full">
        <div className=" h-auto flex justify-center items-center w-1/2 px-4">
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
        </div>
        <div className="hidden md:flex md:justify-center md:px-4 w-1/2">
          <div className="flex justify-center px-4">
            <Image
              src="/images/AboutIMG.jpg"
              alt="About"
              width={3000}
              height={1200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
