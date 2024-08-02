"use client";

import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const CarouselContainer = styled.div`
  width: 100%;
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
  
  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

const SocietyLogo = styled.img`
  width: auto;
  height: 50px;
  object-fit: contain;
  margin: auto;
  
  @media (min-width: 640px) {
    height: 60px;
  }
  
  @media (min-width: 768px) {
    height: 70px;
  }
  
  @media (min-width: 1024px) {
    height: 80px;
  }
`;

function Societies() {
  const societies = [
    { id: 1, name: "Society 1", logo: "/images/Societies/Society-Logo1.png" },
    { id: 2, name: "Society 2", logo: "/images/Societies/Society-Logo2.png" },
    { id: 3, name: "Society 3", logo: "/images/Societies/Society-Logo3.png" },
    { id: 4, name: "Society 4", logo: "/images/Societies/Society-Logo4.png" },
    { id: 5, name: "Society 5", logo: "/images/Societies/Society-Logo2.png" },
    { id: 6, name: "Society 1", logo: "/images/Societies/Society-Logo1.png" },
    { id: 7, name: "Society 2", logo: "/images/Societies/Society-Logo2.png" },
    { id: 8, name: "Society 3", logo: "/images/Societies/Society-Logo3.png" },
    { id: 9, name: "Society 4", logo: "/images/Societies/Society-Logo4.png" },
    { id: 10, name: "Society 5", logo: "/images/Societies/Society-Logo2.png" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-4 md:mt-8"
    >
      <Title>Our Societies</Title>
      <CarouselContainer>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {societies.map((society) => (
            <SwiperSlide key={society.id} style={{ width: 'auto' }}>
              <SocietyLogo src={society.logo} alt={society.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </motion.div>
  );
}

export default Societies;