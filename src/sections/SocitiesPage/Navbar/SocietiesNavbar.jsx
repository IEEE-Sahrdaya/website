import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const SocietiesNavbar = ({ logo, navLinks, buttonLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <div className="flex md:w-1/2 w-full items-center justify-between">

      <Logo>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          layout="intrinsic"
          />
      </Logo>

      <MenuToggle onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </MenuToggle>
          </div>

      <NavLinks className={isOpen ? "active" : ""}>
        {navLinks.map((link, index) => (
          <NavItem key={index} href={link.href}>
            {link.text}
          </NavItem>
        ))}
        <JoinButton href={buttonLink.href}>{buttonLink.text}</JoinButton>
      </NavLinks>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Logo = styled.div`
  flex-shrink: 0;
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #0070f3;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    width: 100%;
    gap: 1rem;

    &.active {
      display: flex;
    }
  }
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #0070f3;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #005bb5;
    transform: scale(1.05);
  }
`;

const JoinButton = styled.a`
  padding: 0.5rem 1.5rem;
  background-color: #0070f3;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 9999px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

export default SocietiesNavbar;
