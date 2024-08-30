"use client";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createEvent,
  deleteEvent,
  fetchEventsBySociety,
  getSociety,
} from "../../utils/FirebaseFunctions";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
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
const DeleteButton = styled.button`
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const EventsHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const EventCard = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  min-height: 8rem;
  background-color: white;
`;

const DateBox = styled.div`
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  width: 60px;
  float: left;
  margin-right: 20px;

  @media (max-width: 480px) {
    float: none;
    margin: 0 auto 10px;
  }
`;

const Day = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6600;
`;

const Month = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Year = styled.div`
  font-size: 0.8rem;
`;

const EventTitle = styled.h3`
  margin-top: 0;
  color: #0077be;

  @media (max-width: 480px) {
    text-align: center;
  }
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const Dashboard = () => {
  const router = useRouter();
  const [Society, setSociety] = useState("");

  const [Events, setEvents] = useState([]);
  useEffect(() => {
    document.title = "Manage Events | IEEE Sahrdaya SB"
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return router.push("/signin");
      }
      const society = await getSociety(user.uid);
      setSociety(society);
      setNewEvent({ ...newEvent, society: socsocietyiety });
      fetchEventsBySociety(society, setEvents);
    });
  }, [setEvents]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    society: "",
  });
  const [Poster, setPoster] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateEvent = () => {
    
    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.date ||
      !newEvent.society ||
      !Poster
    ) {
      setErrorMessage("All fields are required, including the poster.");
      return;
    }
    createEvent(newEvent, Poster);
    setShowModal(false);
    setNewEvent({ title: "", description: "", date: "", society:"" });
    setPoster(null);
    setNewEvent({ ...newEvent, society: Society });
    setErrorMessage("");
  };
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(eventId);
      fetchEventsBySociety(Society, setEvents);
    }
  };
  return (
    <Container>
      <Sidebar society={Society}/>
      <div style={{ flex: 1 }}>
        <Header>
          <WelcomeText>
            Welcome, IEEE {Society.toUpperCase()} SAHRDAYA
          </WelcomeText>
          <SignOutButton
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign Out
          </SignOutButton>
        </Header>
        <Content>
          <CreateButton onClick={() => setShowModal(true)}>
            Create New Event
          </CreateButton>
          <EventsHeader>
            Events Posted by the Society ({Events.length})
          </EventsHeader>
          {Events.map((event) => (
            <EventCard key={event.id}>
              <DateBox>
                <Day>{new Date(event.date).getDate()}</Day>
                <Month>
                  {new Date(event.date).toLocaleString("default", {
                    month: "short",
                  })}
                </Month>
                <Year>{new Date(event.date).getFullYear()}</Year>
              </DateBox>
              <EventTitle>{event.title}</EventTitle>
              <p className="truncate-paragraph">{event.description}</p>
              <DeleteButton onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </DeleteButton>
            </EventCard>
          ))}
        </Content>
      </div>
      {showModal && (
        <Overlay>
          <Modal>
            <h2 className="text-xl font-bold text-center text-[#0682DB]">
              Create New Event
            </h2>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}
            <Input
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <Input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <Input type="file" onChange={(e) => setPoster(e.target.files[0])} />
            <CreateButton onClick={handleCreateEvent}>
              Create Event
            </CreateButton>
            <CreateButton onClick={() => setShowModal(false)}>
              Cancel
            </CreateButton>
          </Modal>
        </Overlay>
      )}
    </Container>
  );
};

export default Dashboard;
