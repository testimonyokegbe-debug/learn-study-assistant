import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={assets.video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      {/* Right side content */}
      <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-16 lg:px-24">
        <div className="w-full md:w-1/2 text-white flex flex-col items-center text-center">
          {/* Heading: slides in from the right, then stays in place */}
          <motion.h2
            className="text-3xl md:text-5xl font-semibold mb-4"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            LEARN,
          </motion.h2>

          {/* Paragraph + button: rise from bottom to top */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <p className="text-gray-200 mb-8">
              Your Personal AI Study Assistant
              Study with confidence using an intelligent assistant designed to help students understand concepts faster,
              complete assignments, prepare for exams, and stay organized.
              Whether you're learning a new topic or reviewing for your next test,
              your AI study partner is available whenever you need it.
            </p>

            <Link
              to="/login"
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;