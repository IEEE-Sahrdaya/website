"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link';

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const SectionContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const CarouselContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const EventImageWrapper = styled.div`
  width: 100%;
  padding-top: 75%; // 4:3 aspect ratio
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0077be;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-top: 1rem;
  
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

const EventTitle = styled.h2`
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1rem;
  color: #1a365d;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 2rem;
  
  .emoji {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .message {
    color: #4a5568;
    font-size: 1.1rem;
  }
`;

function LatestEventSection({ events, title, showFullEventsButton }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionContainer
      id="events"
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Title>{title}</Title>
      {events.length === 0 ? (
        <EmptyStateContainer>
          <span className="emoji">¯\_(ツ)_/¯</span>
          <span className="message">No Events Found. Contact Society Bearers</span>
        </EmptyStateContainer>
      ) : (
        <CarouselContainer>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {events.map((event) => (
              <SwiperSlide className="mb-10" key={event.id}>
                <EventImageWrapper>
                  <EventImage src={event.mediaPath} alt={`Event ${event.id}`} />
                </EventImageWrapper>
                <EventTitle>{event.title}</EventTitle>
              </SwiperSlide>
            ))}
          </Swiper>
        </CarouselContainer>
      )}
       {showFullEventsButton && (
        <ViewButton href="/events">View Full Events</ViewButton>
      )}
    </SectionContainer>
  );
}

export default LatestEventSection;
