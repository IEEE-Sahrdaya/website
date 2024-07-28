"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


const SectionContainer = styled.div`
  margin-top: 2rem;
  background-color: #0371A4; 
  height: auto;
  padding: 2rem 0;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin: 1rem;
`;

const Statistic = styled(motion.p)`
  font-size: 2rem; 
  font-weight: bold;
`;

const Label = styled.p`
  font-size: 1rem; 
  margin: 0.5rem 0 1rem 0;
`;

const CountUp = ({ target }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger animation once
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  if (inView) {
    controls.start({
      count: target,
      transition: { duration: 2, ease: "easeOut" }
    });
  }

  return (
    <Statistic
      ref={ref}
      animate={controls}
      initial={{ count: 0 }}
      onUpdate={(latest) => setCount(latest.count)}
    >
      {count.toFixed(0)} <span style={{ fontSize: "1rem" }}>+</span>
    </Statistic>
  );
};

function InformantSection() {
  return (
    <SectionContainer>
      <FlexContainer>
        <FlexColumn>
          <CountUp target={1000}/>
          <Label>Membership-count</Label>
          <CountUp target={50} />
          <Label>Professional Members</Label>
        </FlexColumn>
        <FlexColumn>
          <CountUp target={11} />
          <Label>Societies</Label>
          <CountUp target={20} />
          <Label>Years of Experience</Label>
        </FlexColumn>
        <FlexColumn>
          <CountUp target={3} />
          <Label>Student Affinity Group</Label>
          <CountUp target={100} />
          <Label>Events</Label>
        </FlexColumn>
      </FlexContainer>
    </SectionContainer>
  );
}

export default InformantSection;
