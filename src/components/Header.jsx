import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout logic here (clear auth/session later)
    navigate("/");
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-16 py-4 bg-white shadow-sm">
        <img src={assets.logo} alt="logo" className="h-10 w-auto" />
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Logout
        </button>
      </nav>
      <h2 className="text-black font-bold px-6 md:px-16 mt-4">
        Hello, Welcome to LEARN.
      </h2>
      {/* Grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-16 py-10">
        {/* Box 1 - Image */}
        <div className="bg-[#F5F2ED] rounded-2xl shadow-md flex items-center justify-center p-6">
          <img src={assets.student} alt="student" className="max-h-48 object-contain" />
        </div>

        {/* Box 2 - Placeholder */}
     <div className="bg-[#F5F2ED] rounded-2xl shadow-md flex flex-col justify-center p-6">
  <h2 className="text-gray-700 text-xl font-semibold mb-4">
    Why Choose Our Study Assistant?
  </h2>
  <ul className="space-y-2 text-gray-600">
    <li className="flex items-center gap-2"> Personalized Learning</li>
    <li className="flex items-center gap-2"> Homework Help</li>
    <li className="flex items-center gap-2"> Exam Preparation</li>
    <li className="flex items-center gap-2"> Instant Answers</li>
    <li className="flex items-center gap-2"> 24/7 Learning Support</li>
  </ul>
</div>
      </div>
    </div>
  );
};

export default Header;