"use client";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/utils/firebase";
import {
  createPerson,
  deletePerson,
  fetchPeopleBySociety,
  getSociety,
} from "@/utils/FirebaseFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;
const CreateButton = styled.button`
  background-color: #0077be;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
`;
const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  overflow-y: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0077be;
  color: white;
`;

const WelcomeText = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SignOutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;
// Add new styled components for the person card
const PersonCard = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const PersonImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
  object-fit: cover;
`;

const PersonInfo = styled.div`
  flex: 1;
`;

const PersonName = styled.h3`
  margin: 0;
  color: #0077be;
`;
const EventsHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;
const PersonRole = styled.p`
  margin: 5px 0;
  color: #666;
`;
const DeleteButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  z-index: 1001;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;
const People = () => {
  const router = useRouter();
  const [society, setSociety] = useState("");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return router.push("/signin");
      }
      const userSociety = await getSociety(user.uid);
      setSociety(userSociety);
      setNewPerson({ ...newPerson, society: userSociety });
      fetchPeopleBySociety(userSociety, setPeople);
    });
  }, [setPeople]);

  const [showModal, setShowModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    role: "",
    society: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreatePerson = () => {
    if (!newPerson.name || !newPerson.role || !photo) {
      setErrorMessage("All fields are required, including the photo.");
      return;
    }
    createPerson(newPerson, photo);
    setShowModal(false);
    setNewPerson({
      name: "",
      role: "",
      society: society,
    });
    setPhoto(null);
    setErrorMessage("");
  };

  const handleDeletePerson = async (personId) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      await deletePerson(personId);
      fetchPeopleBySociety(society, setPeople);
    }
  };

  return (
    <Container>
      <Sidebar society={society}/>
      <div style={{ flex: 1 }}>
        <Header>
          <WelcomeText>
            Welcome, IEEE {society.toUpperCase()} SAHRDAYA
          </WelcomeText>
          <SignOutButton onClick={() => auth.signOut()}>Sign Out</SignOutButton>
        </Header>
        <Content>
          <CreateButton onClick={() => setShowModal(true)}>
            Add New Office Bearer
          </CreateButton>
          <EventsHeader>
            Office Bearers in the Society ({people.length})
          </EventsHeader>
          {people.map((person) => (
            <PersonCard key={person.id}>
              <PersonImage src={person.mediaPath} alt={person.name} />
              <PersonInfo>
                <PersonName>{person.name}</PersonName>
                <PersonRole>{person.role}</PersonRole>
              </PersonInfo>
              <DeleteButton onClick={() => handleDeletePerson(person.id)}>
                Delete
              </DeleteButton>
            </PersonCard>
          ))}
        </Content>
      </div>
      {showModal && (
        <Overlay>
          <Modal>
            <h2 className="text-xl font-bold text-center text-[#0682DB]">
              Add New Office Bearer
            </h2>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}

            <Input
              required
              placeholder="Name"
              value={newPerson.name}
              onChange={(e) =>
                setNewPerson({ ...newPerson, name: e.target.value })
              }
            />
            <Input
              required
              placeholder="Role"
              value={newPerson.role}
              onChange={(e) =>
                setNewPerson({ ...newPerson, role: e.target.value })
              }
            />
            <Input
              required
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <CreateButton onClick={handleCreatePerson}>Add Person</CreateButton>
            <CreateButton
              onClick={() => {
                setShowModal(false);
                setErrorMessage("");
              }}
            >
              Cancel
            </CreateButton>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default People;
