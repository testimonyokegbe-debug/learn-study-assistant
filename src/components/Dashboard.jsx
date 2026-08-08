import React from "react";
import { assets } from "../assets/assets";

const dashboardItems = [
  {
    title: "Learn",
    description: "Access lessons and study materials.",
    link: "/learn",
  },
  {
    title: "Notes",
    description: "View and manage your saved notes.",
    link: "/notes",
  },
  {
    title: "Quiz",
    description: "Test your knowledge with quizzes.",
    link: "/quiz",
  },
  {
    title: "AI Smart Assist",
    description: "Get instant help powered by AI.",
    link: "/ai-assist",
  },
];

const Dashboard = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: clear auth/session, then redirect to login
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      

   {/* Page heading */}
<div className="px-6 md:px-16 lg:px-24 pt-10">
  <div className="flex items-center gap-2">
    <img src={assets.Dashboard} className="h-6" alt="Dashboard" />
    <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
  </div>
  <p className="text-gray-500 mt-2">
    Your personal study assistant!
    Explore the features below to enhance your learning experience.
  </p>
</div>

      {/* 2x2 grid */}
      <div className="px-6 md:px-16 lg:px-24 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
            
              < a href={item.link}
              className="mt-6 inline-block text-blue-500 font-medium hover:underline w-fit"
            >
              Go to {item.title} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;