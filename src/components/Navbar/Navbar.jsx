"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const societies = [
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
  { code: "sight", name: "SIGHT" },
  { code: "sps", name: "Signal Processing Society" },
  { code: "wie", name: "Women In Engineering" },
];

const NavLink = ({ href, children, onClick }) => (
  <motion.a
    href={href}
    className="text-blue-600 hover:text-blue-900 text-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {children}
  </motion.a>
);

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSocietiesOpen, setIsSocietiesOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSocietiesOpen(false);
  };

  const toggleSocieties = () => {
    setIsSocietiesOpen(!isSocietiesOpen);
  };

  return (
    <motion.nav
      ref={ref}
      className="bg-white w-full relative z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src="/images/IEEE Sahrdaya Logo.jpg"
              alt="IEEE Logo"
              className="h-12"
              width={0}
              height={0}
              sizes="10rem"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex flex-grow justify-center space-x-8 relative">
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#events">Events</NavLink>
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.button
              className="text-blue-600 hover:text-blue-900 text-lg focus:outline-none flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Societies
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1" size={20} />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute top-full left-0 w-64 bg-white shadow-lg mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="grid grid-cols-1 gap-2 p-4 max-h-80 overflow-y-auto scrollbar-hide"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {societies.map((society, index) => (
                      <motion.a
                        key={index}
                        href={`/societies/${society.code}`}
                        className="text-blue-600 hover:text-blue-900 block p-2 hover:bg-gray-100"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, originX: 0 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {society.name}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink href="/execom">Execom</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </div>

        {/* Right: Join Button (Desktop) and Hamburger Menu (Mobile) */}
        <div className="flex gap-4 items-center">
          <motion.a
            href="/signin"
            className="hidden md:inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.a>
          <motion.a
            href="/join-ieee"
            className="hidden md:inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join IEEE
          </motion.a>
          <button
            className="md:hidden text-blue-600 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 space-y-4">
              <NavLink href="#about" onClick={toggleMobileMenu}>
                About Us
              </NavLink>
              <NavLink href="#events" onClick={toggleMobileMenu}>
                Events
              </NavLink>
              <motion.button
                className="text-blue-600 hover:text-blue-900 text-lg focus:outline-none flex items-center justify-between"
                onClick={toggleSocieties}
              >
                Societies
                <motion.div
                  animate={{ rotate: isSocietiesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {isSocietiesOpen && (
                  <motion.div
                    className="pl-4 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {societies.map((society, index) => (
                      <motion.a
                        key={index}
                        href={`/societies/${society.code}`}
                        className="text-blue-600 hover:text-blue-900 block"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, originX: 0 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMobileMenu}
                      >
                        {society.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <NavLink href="/execom" onClick={toggleMobileMenu}>
                Execom
              </NavLink>
              <NavLink href="/gallery" onClick={toggleMobileMenu}>
                Gallery
              </NavLink>
              <NavLink href="/contact" onClick={toggleMobileMenu}>
                Contact Us
              </NavLink>
              <motion.a
                href="/signin"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
              >
                Sign In
              </motion.a>
              <motion.a
                href="/join-ieee"
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
              >
                Join IEEE
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
