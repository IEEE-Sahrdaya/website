import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: #0088cc;
  font-size: 22px;
  margin: 0 0 10px 0;
  position: relative;
  font-weight: bold;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50px;
    height: 2px;
    background-color: #0088cc;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin: 20px 0;
`;

const Button = styled.a`
  background-color: #0088cc;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #006699;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    align-self: flex-start;
  }
`;

const ContactSection = ({ email }) => {
  return (
    <Container>
      <LeftSection>
        <Title>Contact Us</Title>
        <Subtitle>Contact Us for any queries, any time any where</Subtitle>
      </LeftSection>
      <Button href={`mailto: ${email}`}>CONTACT US</Button>
    </Container>
  );
};

export default ContactSection;
