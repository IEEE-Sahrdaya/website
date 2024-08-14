import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SocietiesNavbar = ({ logo, navLinks, buttonLink }) => {
  return (
    <Nav>
      <Logo>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          layout="intrinsic"
        />
      </Logo>

      <div className="flex gap-3 items-center ">
        <NavLinks>
          {navLinks.map((link, index) => (
            <NavItem key={index} href={link.href}>
              {link.text}
            </NavItem>
          ))}
        </NavLinks>{" "}
        <JoinButton href={buttonLink.href}>{buttonLink.text}</JoinButton>
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
`;

const Logo = styled.div`
  flex-shrink: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-origin: end;
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
`;

export default SocietiesNavbar;
