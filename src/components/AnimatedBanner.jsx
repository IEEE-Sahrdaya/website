import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBanner = () => {
  return (
    <motion.div 
      className="text-center flex justify-center items-center h-16 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center space-x-4 px-4"
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="relative">
          <motion.div 
            className="h-4 w-4 bg-red-600 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-red-600 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <p className="text-sm sm:text-base font-medium">
          Registrations for IEEE Sahrdaya SB's flagship event, Infinia, are now live. 
          <span className="hidden sm:inline"> Join the technical infinity, where imagination meets technology.</span>
        </p>
        <motion.a 
          className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-bold hover:bg-blue-100 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href='https://infinia.ieeesahrdaya.com'
        >
          Learn More
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBanner;