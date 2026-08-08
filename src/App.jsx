import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";


import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       
  
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
              <Testimonials />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;