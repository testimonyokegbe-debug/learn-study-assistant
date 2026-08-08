import React from 'react';
import { useNavigate } from "react-router-dom";

const Ai = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <img src="/logo.jpg" alt="FlyRank logo" className="h-8 w-8" />
          <span className="font-semibold text-lg">Learn</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        > Back</button>
      </nav>

      {/* page content goes here */}
    </div>
  );
};

export default Ai;