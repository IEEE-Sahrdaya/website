"use client"

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
  width: 100%;
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

const SocietyLogo = styled.img`
  width: auto;
  height: 80px;
  object-fit: contain;
  margin: auto;
`;

function Societies() {
  const societies = [
    { id: 1, name: "Society 1", logo: "/images/Societies/Society-Logo1.png" },
    { id: 2, name: "Society 2", logo: "/images/Societies/Society-Logo2.png" },
    { id: 3, name: "Society 3", logo: "/images/Societies/Society-Logo3.png" },
    { id: 4, name: "Society 4", logo: "/images/Societies/Society-Logo4.png" },
    { id: 5, name: "Society 5", logo: "/images/Societies/Society-Logo2.png" },
    { id: 1, name: "Society 1", logo: "/images/Societies/Society-Logo1.png" },
    { id: 2, name: "Society 2", logo: "/images/Societies/Society-Logo2.png" },
    { id: 3, name: "Society 3", logo: "/images/Societies/Society-Logo3.png" },
    { id: 4, name: "Society 4", logo: "/images/Societies/Society-Logo4.png" },
    { id: 5, name: "Society 5", logo: "/images/Societies/Society-Logo2.png" },
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
      className="mt-8"
    >
      <Title>Our Societies</Title>
      <CarouselContainer>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
        >
          {societies.map((society) => (
            <SwiperSlide key={society.id}>
              <SocietyLogo src={society.logo} alt={society.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>
    </motion.div>
  );
}

export default Societies;
