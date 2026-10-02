import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/Forgetpassword";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Learn from "./components/Learn";
import Notes from "./components/Notes";
import Calculator from "./components/Calculator";
import Ai from "./components/Ai";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Layout from "./components/Layout";

// Hides the footer on the landing page
const ConditionalFooter = () => {
  const { pathname } = useLocation();
  if (pathname === "/") return null;
  return <Footer />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between">
        <ToastContainer position="top-right" autoClose={3000} />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logout" element={<Logout />} />

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
        </main>

        <ConditionalFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;