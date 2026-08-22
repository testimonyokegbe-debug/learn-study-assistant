import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Learn from "./components/Learn";
import Notes from "./components/Notes";
import Calculator from "./components/Calculator";
import Ai from "./components/Ai";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Pages that need the Navbar go inside this wrapper */}
        <Route element={<Layout />}>
          <Route path="/learn" element={<Learn />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/ai-assist" element={<Ai />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
              <Testimonials />
              <Contact />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;