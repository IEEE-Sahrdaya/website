"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 200px;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  background-color: #ffffff;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
`;

const Tab = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.active === "true" ? "bold" : "normal")};
  border-left: 5px solid
    ${(props) => (props.active === "true" ? "#0077be" : "transparent")};
  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    border-left: none;
    border-bottom: 5px solid
      ${(props) => (props.active === "true" ? "#0077be" : "transparent")};
    display: inline-block;
    width: 50%;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333333;
  display: block;
`;

const Sidebar = ({society}) => {
  const pathname = usePathname();
  const sidebarLinks = [
    { href: "/dashboard", label: "Events" },
    { href: "/dashboard/people", label: "People" },
    ...(society.toLowerCase() !== 'sb' ? [{ href: "/dashboard/society", label: "Society Page Data" }] : []),
    // Add more links as needed
  ];
  return (
    <SidebarContainer>
      {sidebarLinks.map((link, index) => (
        <Tab key={index} active={`${pathname === link.href}`}>
          <StyledLink href={link.href}>{link.label}</StyledLink>
        </Tab>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
