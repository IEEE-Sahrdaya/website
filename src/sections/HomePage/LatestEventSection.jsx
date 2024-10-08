"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const CarouselContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  margin-top: 1rem;
  @media (min-width: 768px) {
    margin-top: 2rem;
  }
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

const EventImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%; // 16:9 aspect ratio
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const EventImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function LatestEventSection({ events, title }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      id="events"
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Title>{title}</Title>
      {events.length === 0 ? (
        <>
          <h2 className="text-5xl text-center py-6">¯\_(ツ)_/¯</h2>
          <h2 className="text-center text-md">
            No Events Found. Contact Society Bearers
          </h2>
        </>
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
                <h2 className="font-bold text-xl text-center mt-2">
                  {event.title}
                </h2>
              </SwiperSlide>
            ))}
          </Swiper>
        </CarouselContainer>
      )}
    </motion.div>
  );
}

export default LatestEventSection;
