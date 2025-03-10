"use client";

import Navbar from "@/components/Navbar/Navbar";
import FooterSection from "@/sections/HomePage/FooterSection";
import { fetchAllPeople } from "@/utils/FirebaseFunctions";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 1rem;
  margin-top: 1rem;
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const SocietySection = styled.div`
  margin-bottom: 40px;
`;

const SocietyTitle = styled.h2`
  margin: 1.6rem 0;
  color: #0077be;
  border-bottom: 2px solid #0077be;
  padding-bottom: 10px;
  font-weight: 500;
  font-size: 22px;
  margin-bottom: 20px;
`;

const MembersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const MemberCard = styled.div`
  width: 200px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  text-align: center;
  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const MemberImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const MemberInfo = styled.div`
  padding: 15px;
`;

const MemberName = styled.h3`
  color: #ff6600;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #333;
  font-size: 1rem;
`;

const priorityOrder = {
  "Branch Counsellor": 1,
  Chairperson: 2,
  "Vice Chairperson": 3,
  Secretary: 4,
  "Technical Coordinator": 5,
};
const societyPriorityOrder = {
  sb: 1,
};
// Function to sort members based on priority
const sortMembers = (members) => {
  return members.sort((a, b) => {
    const priorityA = priorityOrder[a.role] || 100;
    const priorityB = priorityOrder[b.role] || 100;
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return a.name.localeCompare(b.name);
  });
};

function AllExecomPage() {
  const [societies, setSocieties] = useState({});

  useEffect(() => {
    const loadAllPeople = async () => {
      try {
        const allPeople = await fetchAllPeople();
        const groupedBySociety = allPeople.reduce((acc, person) => {
          if (!acc[person.society]) {
            acc[person.society] = [];
          }
          acc[person.society].push(person);
          return acc;
        }, {});

        // Sort members in each society
        Object.keys(groupedBySociety).forEach((society) => {
          groupedBySociety[society] = sortMembers(groupedBySociety[society]);
        });

        setSocieties(groupedBySociety);
      } catch (error) {
        console.error("Error loading people data:", error);
      }
    };
const sortedSocieties = Object.entries(societies).sort((a, b) => {
  const priorityA = societyPriorityOrder[a[0]] || 100;
  const priorityB = societyPriorityOrder[b[0]] || 100;

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }
  return a[0].localeCompare(b[0]);
});
    loadAllPeople();
  }, []);
  const sortedSocieties = Object.entries(societies).sort((a, b) => {
    const priorityA = societyPriorityOrder[a[0]] || 100;
    const priorityB = societyPriorityOrder[b[0]] || 100;
  
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    return a[0].localeCompare(b[0]);
  });
  return (
    <>
    <Navbar />
      <PageContainer>
        <Title>Execom Members 2025-26</Title>
        {sortedSocieties.map(([society, members]) => (
          <SocietySection key={society}>
            <SocietyTitle>{society.toUpperCase()} Execom</SocietyTitle>
            <MembersGrid>
              {members.map((member) => (
                <MemberCard key={member.id}>
                  <MemberImage src={member.mediaPath} alt={member.name} />
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                  </MemberInfo>
                </MemberCard>
              ))}
            </MembersGrid>
          </SocietySection>
        ))}
      </PageContainer>
      <FooterSection />
    </>
  );
}

export default AllExecomPage;
