import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaSignOutAlt,
  FaGlobe,
  FaUser,
  FaCog,
  FaLock,
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaGraduationCap,
  FaBook,
} from "react-icons/fa";
import MyProfileButton from "./profile/MyProfileButton";
import SettingsButton from "./profile/SettingsButton";
import LogoutButton from "./profile/LogoutButton";

import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { API_BASE, ASSETS_BASE } from "../config/api";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const { wishlist } = useContext(AuthContext);

  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleUserUpdate = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    // Initial load
    handleUserUpdate();

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, []);

  const navLinks = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: t("about"),
      path: "/about",
    },
    {
      name: t("college"),
      path: "/colleges",
    },
    {
      name: t("course"),
      path: "/course",
    },
    {
      name: t("contact"),
      path: "/contact",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100
        ${scrolled ? "shadow-lg" : ""}`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 md:px-6 py-3 w-full">
          {/* LOGO - Reduced gap */}
          <Link to="/" className="flex items-center gap-1 group">
            <img
              src={logo}
              alt="logo"
              className="h-14 md:h-16 object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <div className="leading-tight">
              <h1 className="text-[18px] font-bold tracking-wide text-[#1F2A44]">
                ADMISSION
              </h1>
              <h2 className="text-[20px] font-bold text-[#0EA5A4] -mt-1">
                ODISHA
              </h2>
              <p className="text-[10px] text-gray-500 mt-[2px] hidden sm:block">
                YOUR DREAM. OUR GUIDANCE. YOUR FUTURE.
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-[#6C4DF6] font-semibold"
                    : "text-gray-600 hover:text-[#6C4DF6]"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute left-0 -bottom-[8px] w-full h-[2px] bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] rounded-full"></span>
                )}
              </Link>
            ))}
            {user?.is_admin === 1 && (
              <Link
                to="/dashboard"
                className={`relative cursor-pointer transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "text-[#6C4DF6] font-semibold"
                    : "text-gray-600 hover:text-[#6C4DF6]"
                }`}
              >
                Dashboard
                {isActive("/dashboard") && (
                  <span className="absolute left-0 -bottom-[8px] w-full h-[2px] bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] rounded-full"></span>
                )}
              </Link>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Wishlist Count */}
            {token && wishlist?.length > 0 && (
              <Link
                to="/wishlist"
                className="hidden md:inline-flex relative items-center justify-center rounded-full bg-red-50 border border-red-100 px-3 py-2 text-red-600 text-sm font-semibold hover:bg-red-100 transition-all duration-200"
              >
                <FaHeart className="mr-1 text-base" />
                {wishlist.length}
              </Link>
            )}
            {/* Language */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium bg-white/50 hover:bg-white transition-all duration-300"
              >
                <FaGlobe className="text-gray-500 text-xs" />
                {lang}
                <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-100 rounded-md shadow-lg z-50 overflow-hidden">
                  {["EN", "Hindi", "Odia"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        const selected =
                          item === "EN" ? "en" : item === "Hindi" ? "hi" : "od";

                        setLang(selected);
                        i18n.changeLanguage(selected);
                        localStorage.setItem("language", selected);
                        setOpen(false);
                      }}
                      className="px-3 py-2 text-sm hover:bg-gradient-to-r hover:from-[#F5F3FF] hover:to-[#F3E8FF] cursor-pointer transition-all duration-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {token ? (
              <div className="relative">
                {user ? (
                  <>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-3 focus:outline-none"
                    >
                      {user?.profile_photo ? (
                        <img
                          src={`${ASSETS_BASE}/${user.profile_photo}`}
                          alt="profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold uppercase">
                          {user?.name
                            ? user.name
                                .split(" ")
                                .map((word) => word.charAt(0))
                                .join("")
                                .slice(0, 2)
                            : user?.email?.charAt(0)}
                        </div>
                      )}
                    </button>
                    <div
                      className={`absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg z-50 overflow-hidden py-1 transition-all duration-200 ${profileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                    >
                      <MyProfileButton onClick={() => setProfileOpen(false)} />
                      <SettingsButton onClick={() => setProfileOpen(false)} />
                      <Link
                        to="/wishlist"
                        onClick={() => setProfileOpen(false)}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100 transition-all duration-200"
                      >
                        <FaHeart className="inline-block mr-2 text-xs text-red-500" />
                        Wishlist
                      </Link>
                      <LogoutButton onClick={() => setProfileOpen(false)} />
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2 md:gap-3">
                    <Link
                      to="/login"
                      className="border border-[#6C4DF6] text-[#6C4DF6] px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-semibold hover:bg-[#F5F3FF] transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2 md:gap-3">
                <Link
                  to="/login"
                  className="border border-[#6C4DF6] text-[#6C4DF6] px-3 py-1.5 md:px-5 md:py-2 rounded-md text-xs md:text-sm font-semibold hover:bg-[#F5F3FF] transition-all duration-300"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-3 py-1.5 md:px-5 md:py-2 rounded-md text-xs md:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed top navbar */}
      <div className="h-[70px] md:h-[80px]"></div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[100] flex justify-around items-center h-16 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/") ? "text-[#6C4DF6]" : "text-gray-500 hover:text-[#6C4DF6]"}`}
        >
          <FaHome className="text-xl mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          to="/about"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/about") ? "text-[#6C4DF6]" : "text-gray-500 hover:text-[#6C4DF6]"}`}
        >
          <FaInfoCircle className="text-xl mb-1" />
          <span className="text-[10px] font-medium">About</span>
        </Link>
        <Link
          to="/colleges"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/colleges") ? "text-[#6C4DF6]" : "text-gray-500 hover:text-[#6C4DF6]"}`}
        >
          <FaGraduationCap className="text-xl mb-1" />
          <span className="text-[10px] font-medium">College</span>
        </Link>
        <Link
          to="/course"
          className={`flex flex-col items-center justify-center w-full h-full ${isActive("/course") ? "text-[#6C4DF6]" : "text-gray-500 hover:text-[#6C4DF6]"}`}
        >
          <FaBook className="text-xl mb-1" />
          <span className="text-[10px] font-medium">Course</span>
        </Link>
        <Link
          to="/wishlist"
          className={`flex flex-col items-center justify-center w-full h-full relative ${isActive("/wishlist") ? "text-[#6C4DF6]" : "text-gray-500 hover:text-[#6C4DF6]"}`}
        >
          <div className="relative">
            <FaHeart className="text-xl mb-1" />
            {token && wishlist?.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Wishlist</span>
        </Link>
      </nav>

      {/* Spacer to prevent content from hiding under fixed bottom navbar on mobile */}
      <div className="md:hidden h-[64px]"></div>
    </>
  );
};

export default Navbar;
