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
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;

  > * {
    flex-basis: calc(33.333% - 1.333rem);
    max-width: calc(33.333% - 1.333rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    > * {
      flex-basis: 100%;
      max-width: 100%;
    }
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

const ExecomSection = ({ people, showFullExecomBtn }) => {
  return (
    <ExecomContainer id="execom">
      <Title>Execom</Title>
      {people.length === 0 ? (
        <>
          <h2 className="text-5xl text-center py-6">¯\_(ツ)_/¯</h2>
          <h2 className="text-center text-md">
            No Society Bearers found. Contact Technical Team. If you&apos;ve society
            access, update your buddies
          </h2>
        </>
      ) : (
        <MembersGrid>
          {people.map((member, index) => (
            <MemberCard key={index}>
              <MemberImage src={member.mediaPath} alt={member.mediaPath} />
              <MemberName>{member.name}</MemberName>
              <MemberPosition>{member.role}</MemberPosition>
            </MemberCard>
          ))}
        </MembersGrid>
      )}
      {showFullExecomBtn && (
        <ViewButton href="/execom">View Full Execom</ViewButton>
      )}
    </ExecomContainer>
  );
};

export default ExecomSection;
