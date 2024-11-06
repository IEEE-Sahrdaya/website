"use client";

import { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Dialog, Transition } from '@headlessui/react';
import { fetchAllEvents } from "@/utils/FirebaseFunctions";
import Navbar from "@/components/Navbar/Navbar";
import { IoClose } from "react-icons/io5";

const EventsContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  padding: 2rem 0;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Renamed from EventCard to EventCardWrapper
const EventCardWrapper = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: ${props => props.active ? '#2563eb' : '#fff'};
  color: ${props => props.active ? '#fff' : '#2563eb'};
  border: 1px solid #2563eb;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Modal = styled(Dialog)`
  position: fixed;
  z-index: 50;
  inset: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  max-width: 1000px;
  width: 90%;
  margin: 2rem auto;
  padding: 2rem;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #4a5568;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 50;
  
  &:hover {
    color: #1a202c;
    transform: rotate(90deg);
  }
`;

const EventTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a365d;
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const EventDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
  white-space: pre-wrap;
  text-align: justify;
`;

const EventMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ViewDetailsButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #1d4ed8;
  }
`;

const SOCIETIES_MAP = [
  { code: "cas", name: "Circuits and Systems Society" },
  { code: "cs", name: "Computer Society" },
  { code: "css", name: "Control Systems Society" },
  { code: "edsoc", name: "Education Society" },
  { code: "embs", name: "Engineering in Medicine and Biology Society" },
  { code: "ias", name: "Industry Applications Society" },
  { code: "ies", name: "Industrial Electronics Society" },
  { code: "npss", name: "Nuclear and Plasma Sciences Society" },
  { code: "pes", name: "Power and Energy Society" },
  { code: "ps", name: "Photonics Society" },
  { code: "ras", name: "Robotics and Automation Society" },
  { code: "sight", name: "Special Interest Group on Humanitarian Technology" },
  { code: "sps", name: "Signal Processing Society" },
  { code: "wie", name: "Women In Engineering" },
];

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ViewAllButton = styled.button`
  background-color: #0077be;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: #005fa3;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

function EventCard({ event, index, inView }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the full society name
  const societyInfo = SOCIETIES_MAP.find(s => s.code === event.society);
  
  // Format the date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <EventCardWrapper
        className="rounded-lg overflow-hidden shadow-md bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="aspect-video relative">
          <img
            src={event.mediaPath}
            alt={event.title}
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl mb-2">{event.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
          <p className="text-sm text-blue-600 mb-3">
            {societyInfo ? societyInfo.name : event.society.toUpperCase()}
          </p>
          <ViewDetailsButton
            onClick={() => setIsOpen(true)}
            className="w-full"
          >
            View Details
          </ViewDetailsButton>
        </div>
      </EventCardWrapper>

      <Transition show={isOpen} as={Fragment}>
        <Modal onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ModalOverlay />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <ModalContent>
                  <CloseButton onClick={() => setIsOpen(false)}>
                    <IoClose size={24} />
                  </CloseButton>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <ImageContainer>
                      <img
                        src={event.mediaPath}
                        alt={event.title}
                        loading="lazy"
                      />
                    </ImageContainer>
                    
                    <div className="space-y-6">
                      <EventTitle>{event.title}</EventTitle>
                      
                      <div className="space-y-4">
                        <EventMetadata>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formattedDate}</span>
                        </EventMetadata>
                        
                        <EventMetadata>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{societyInfo ? societyInfo.name : event.society.toUpperCase()}</span>
                        </EventMetadata>
                        
                        <div className="pt-4">
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">About the Event</h3>
                          <EventDescription>{event.description}</EventDescription>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalContent>
              </Transition.Child>
            </div>
          </div>
        </Modal>
      </Transition>
    </>
  );
}

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace with your Firebase function to fetch events
        fetchAllEvents(setEvents); // You'll need to create this function
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Don't calculate pagination if events array is empty
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent) || [];
  const totalPages = Math.ceil((events?.length || 0) / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <EventsContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-lg" />
              <div className="p-4 bg-white rounded-b-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </EventsContainer>
    );
  }

  return (
    <>
      <Navbar />
      <EventsContainer>
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All Events
        </motion.h1>

        <EventsGrid ref={ref}>
          {currentEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              inView={inView}
            />
          ))}
        </EventsGrid>

        <ButtonContainer>
          <PaginationContainer>
            <ViewAllButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </ViewAllButton>
            
            {[...Array(totalPages)].map((_, index) => (
              <ViewAllButton
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </ViewAllButton>
            ))}
            
            <ViewAllButton
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </ViewAllButton>
          </PaginationContainer>
        </ButtonContainer>
      </EventsContainer>
    </>
  );
}

export default EventsPage;