import styled from "styled-components";

const ExecomContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  text-align: center;
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

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MemberCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const MemberName = styled.h2`
  color: #ff6600;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MemberPosition = styled.p`
  color: #333;
  font-size: 1rem;
`;

const ViewButton = styled.a`
  background-color: #0077be;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005fa3;
  }
`;

const ExecomSection = () => {
  const members = [
    {
      name: "Mr. Anil Antony",
      position: "Branch Counsellor",
      image: "../../../images/execom/user.jpg",
    },
    {
      name: "Mr. Robin Francis",
      position: "Chairperson",
      image: "../../../images/execom/user.jpg",
    },
    {
      name: "Ms. Aaisha Shafeek",
      position: "Vice Chair",
      image: "../../../images/execom/user.jpg",
    },
  ];

  return (
    <ExecomContainer>
      <Title>Execom</Title>
      <MembersGrid>
        {members.map((member, index) => (
          <MemberCard key={index}>
            <MemberImage src={member.image} alt={member.name} />
            <MemberName>{member.name}</MemberName>
            <MemberPosition>{member.position}</MemberPosition>
          </MemberCard>
        ))}
      </MembersGrid>
      <ViewButton href="/execom">View Full Execom</ViewButton>
    </ExecomContainer>
  );
};

export default ExecomSection;
