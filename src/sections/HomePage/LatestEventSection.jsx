"use client";

import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const CarouselContainer = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #2563eb;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

function LatestEventSection() {
  const latestEvent = [
    { eventId: 1, eventImg: "/images/Events/Event-IMG1.png" },
    { eventId: 2, eventImg: "/images/Events/Event-IMG1.png" },
    { eventId: 3, eventImg: "/images/Events/Event-IMG1.png" },
    { eventId: 4, eventImg: "/images/Events/Event-IMG1.png" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Title>Latest Events</Title>
      <CarouselContainer>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
        >
          {latestEvent.map((event) => (
            <SwiperSlide key={event.eventId}>
              <EventImage src={event.eventImg} alt={`Event ${event.eventId}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </motion.div>
  );
}

export default LatestEventSection;
