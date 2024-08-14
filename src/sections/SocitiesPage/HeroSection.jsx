import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

// Styled components
const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh; 
  overflow: hidden;
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

function HeroSection({path}) {
  return (
    <HeroContainer>
      <HeroImage
        src={path}
        alt="Hero Image"
        layout="fill"
        priority
      />
    </HeroContainer>
  );
}

export default HeroSection;
