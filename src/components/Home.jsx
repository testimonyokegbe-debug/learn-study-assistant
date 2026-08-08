import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Home = () => {
  return (
    <div className="w-full px-4 md:px-16 lg:px-24 py-10">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden flex flex-col md:flex-row bg-[#F5F2ED] shadow-lg">
        
        {/* Left side - Image */}
        <div className="w-full md:w-1/2">
          <img src={assets.logo} alt="hero" className="w-full h-full object-cover" />
        </div>
        {/* Right side - Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 ">
            Your Personal AI Study Assistant
          </h2>
          <p className="text-gray-600 mb-6">
            Study with confidence using an intelligent assistant designed to help students understand concepts faster,
            complete assignments, prepare for exams, and stay organized.
            Whether you're learning a new topic or reviewing for your next test,
            your AI study partner is available whenever you need it.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition w-fit"
          >
            Get Started
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;