import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { useContext } from "react";

const Navbar = () => {
         const token = localStorage.getItem("token");


  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "College", path: "/colleges" },
    { name: "Course", path: "/course" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;
  
  return (
    <>
      {/* Placeholder to prevent layout shift on mobile when navbar becomes fixed */}
      <div className={`h-[72px] w-full md:hidden ${scrolled ? "block" : "hidden"}`}></div>
      
      <header className={`z-[100] transition-all duration-300 shadow-md bg-white border-b border-gray-200 md:sticky md:top-0 md:left-0 md:w-full md:rounded-none ${scrolled ? "fixed top-4 left-4 w-[calc(100%-2rem)] rounded-xl" : "sticky top-0 left-0 w-full rounded-none"}`}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        
        {/* Left - Logo + Text */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="logo" className="h-12 md:h-16 w-auto object-contain" />

          <div className="leading-tight">
            <h1 className="text-[16px] md:text-[18px] font-bold tracking-wide text-[#1F2A44]">
              ADMISSION
            </h1>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#0EA5A4] -mt-1">
              ODISHA
            </h2>
            <p className="text-[8px] md:text-[10px] text-gray-500 mt-[2px] hidden sm:block">
              YOUR DREAM. OUR GUIDANCE. YOUR FUTURE.
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[14px] lg:text-[15px] font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative cursor-pointer transition-colors ${
                isActive(link.path)
                  ? "text-[#6C4DF6] font-semibold"
                  : "hover:text-[#6C4DF6]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute left-0 -bottom-[8px] w-full h-[2px] bg-[#6C4DF6]"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium bg-white hover:bg-gray-50 transition"
            >
              {lang}
              <span className="text-xs">▾</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg overflow-hidden z-50">
                {["EN", "Hindi", "Odia"].map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setLang(item);
                      setOpen(false);
                    }}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Login */}

{token ? (
  <button onClick={() => {
    localStorage.removeItem("token");
    window.location.reload();
  }}>
    Logout
  </button>
) : (
  <>
    <Link to="/login" className="px-4 py-2 rounded-md font-medium text-primary border border-primary hover:bg-primary/10 transition-colors">Login</Link>
    <Link to="/register" className="px-4 py-2 rounded-md font-medium text-white bg-primary hover:opacity-90 shadow-sm transition-all">Register</Link>
  </>
)}


        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-600 text-2xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-3 text-[15px] font-medium transition ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Divider */}
            <div className="h-px bg-gray-200 my-2 mx-4"></div>
            
            {/* Mobile Language Options */}
            <div className="px-6 py-3">
              <p className="text-xs text-gray-500 mb-2">Select Language</p>
              <div className="flex gap-2">
                {["EN", "Hindi", "Odia"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setLang(item);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-sm transition ${
                      lang === item
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile Action Buttons */}
            <div className="flex gap-3 px-6 py-3 mt-2">
              {token ? (
                <button
                  className="w-full border border-primary text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/10 transition"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setMobileMenuOpen(false);
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full border border-primary text-primary px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/10 transition">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-primary text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm hover:opacity-90 transition">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Animation Css */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
    </>
  );
};

export default Navbar;