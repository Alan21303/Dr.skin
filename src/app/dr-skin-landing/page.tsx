'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa'
import Link from 'next/link'

export default function DrSkinLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarStyle = {
    height: scrollY > 50 ? '60px' : '80px',
    boxShadow: scrollY > 50 ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
  }

  const testimonials = [
    { name: 'Jane Doe', role: 'Dermatologist', review: 'Dr. Skin has revolutionized how I approach initial consultations. It\'s an invaluable tool for both patients and professionals.', rating: 5 },
    { name: 'John Smith', role: 'Patient', review: 'I was anxious about a skin condition, but Dr. Skin provided quick insights that helped me decide to see a specialist. It\'s user-friendly and informative!', rating: 5 },
    { name: 'Emily Brown', role: 'Nurse', review: 'As a healthcare professional, I\'m impressed by Dr. Skin\'s accuracy. It\'s a great first step for anyone concerned about skin issues.', rating: 4 },
  ]

  const navLinks = [
    { name: 'Home', path: '/dr-skin-landing' },
    { name: 'Predictions', path: '/skin-disease-interface' },
    { name: 'History', path: '/prediction-history' },
    { name: 'Testimony', path: '#testimonials' }, // Updated to anchor link
    { name: 'User Profile', path: '/profile-page' },
    { name: 'Login/Register', path: '/login-page' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <motion.nav
        className="fixed w-full z-50 transition-all duration-300 bg-white"
        style={navbarStyle}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          <motion.div
            className="text-[#2E8BC0] text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="mr-2"
              whileHover={{
                scale: [1, 1.2, 1],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            >
              <FaHeart className="text-[#4FB7B1]" />
            </motion.div>
            Dr. Skin
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ name, path }) => (
              <Link key={name} href={path} passHref>
                <motion.div
                  className="text-[#5A5A5A] hover:text-[#2E8BC0] transition-colors duration-300 relative cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  {name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2E8BC0]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes className="text-[#2E8BC0] text-2xl" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBars className="text-[#2E8BC0] text-2xl" />
                </motion.div>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="h-screen flex items-center justify-center bg-white text-[#2E8BC0] relative overflow-hidden"
        style={{ opacity }}
      >
        <motion.div
          className="text-center z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Dr. Skin: Your AI Companion for Skin Disease Identification
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#5A5A5A] italic">
            Easily identify skin diseases with AI-powered technology.
          </p>
          <Link href="/skin-disease-interface" passHref>
            <motion.div
              className="bg-[#4FB7B1] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#009688] transition-colors duration-300 inline-block cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Prediction
            </motion.div>
          </Link>
        </motion.div>
        <motion.div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('/placeholder.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center text-[#2E8BC0] relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Dr. Skin
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-[#2E8BC0]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-6 md:mb-0"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src="/about-dr-skin.jpg"
                alt="About Dr. Skin"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </motion.div>
            <div className="md:w-1/2 text-lg text-[#5A5A5A]">
              <p>
                Dr. Skin is an AI-driven platform designed to assist users in identifying skin diseases quickly and accurately. Whether you&apos;re a patient or a healthcare provider, our tool offers valuable insights and guidance to ensure informed decisions.
              </p>
              <p className="mt-4">
                With cutting-edge technology and a user-friendly interface, Dr. Skin makes skin health accessible to everyone. Empowering users to understand their skin conditions is our mission.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-[#F9F9F9]"> {/* Added id here */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#2E8BC0]">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="mt-4 text-gray-800 italic">&quot;{testimonial.review}&quot;</p>
                <p className="mt-2 text-yellow-500">
                  Rating: {Array.from({ length: testimonial.rating }, () => '⭐')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6">
      <motion.footer
        className="bg-white text-[#5A5A5A] py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-[#2E8BC0]">Dr. Skin</h3>
              <p>Your trusted AI companion for skin health</p>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2">Developed by the Dr. Skin Team</p>
              <p>Computer Science Department, Sahrdaya College of Engineering and Technology (Autonomous) </p>
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <motion.a href="#" whileHover={{ scale: 1.2, color: '#3b5998' }}>
              <FaFacebook size={24} />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: '#1da1f2' }}>
              <FaTwitter size={24} />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: '#e1306c' }}>
              <FaInstagram size={24} />
            </motion.a>
          </div>
          <div className="mt-8 text-center">
            <form className="max-w-md mx-auto">
              <label htmlFor="newsletter" className="block mb-2 text-[#2E8BC0]">Stay Updated with Skin Health Insights!</label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#4FB7B1]"
                />
                <button
                  type="submit"
                  className="bg-[#4FB7B1] text-white px-4 py-2 rounded-r-md hover:bg-[#009688] transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/subscribe.tsx';
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Dr. Skin. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
      </footer>
    </div>
  )
}
