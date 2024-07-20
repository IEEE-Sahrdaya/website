"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/images/Slider/Slider-IMG1.png',
  '/images/Slider/Slider-IMG1.png',
  '/images/Slider/Slider-IMG1.png',
  // Add more images here
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div 
      className=" overflow-hidden rounded-lg w-full md:w-[90vw] lg:w-[80vw] h-[30vh] sm:h-[50vh] md:h-[60vh] mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Slider Images */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover rounded-lg absolute top-0 left-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </motion.div>
      {/* Navigation dots */}
      <motion.div 
        className=" left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-black scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default HeroSection;
