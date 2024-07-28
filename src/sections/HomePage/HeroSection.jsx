"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

// Array of image paths
const images = [
  '/images/Slider/Slider-IMG1.png',
  '/images/Slider/Slider-IMG1.png',
  '/images/Slider/Slider-IMG1.png',
];

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden w-full h-[70vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-lg px-3"
    >
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Pagination, Autoplay]}
        className="w-full h-full rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <motion.img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
