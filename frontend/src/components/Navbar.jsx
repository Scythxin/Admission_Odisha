import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaGlobe, FaCog, FaLock, FaHeadset, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import API_BASE from "../config/api";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const { wishlist } = useContext(AuthContext);

  const [lang, setLang] = useState(
    localStorage.getItem("language") || "en"
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("password"); // "password", "language", "support"

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch(`${API_BASE}?r=auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const resData = await response.json();
      if (resData.status === "success") {
        setPasswordSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(resData.message || "Failed to change password.");
      }
    } catch (error) {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const users = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-3">
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
                className={`relative cursor-pointer transition-all duration-300 ${isActive(link.path)
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
                className={`relative cursor-pointer transition-all duration-300 ${isActive("/dashboard")
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
          <div className="hidden md:flex items-center gap-4">
            {/* Wishlist Count */}
            {token && wishlist?.length > 0 && (
              <Link
                to="/wishlist"
                className="relative inline-flex items-center justify-center rounded-full bg-red-50 border border-red-100 px-3 py-2 text-red-600 text-sm font-semibold hover:bg-red-100 transition-all duration-200"
              >
                <FaHeart className="mr-1 text-base" />
                {wishlist.length}
              </Link>
            )}
            {/* Language */}
            <div className="relative">
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
                          item === "EN"
                            ? "en"
                            : item === "Hindi"
                              ? "hi"
                              : "od";

                        setLang(selected);

                        i18n.changeLanguage(selected);


                        localStorage.setItem("language", selected);

                        localStorage.setItem(
                          "language",
                          selected
                        );


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
                          src={`http://localhost/backend/${user.profile_photo}`}
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

                    </div>
                  )}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-100 rounded-md shadow-lg z-50 overflow-hidden py-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setSettingsOpen(true);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      <FaCog className="text-xs text-gray-500" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 transition-all duration-200"
                    >
                      <FaSignOutAlt className="text-xs" />
                      Logout
                    </button>
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg z-50 overflow-hidden">
                        <Link
                          to="/wishlist"
                          onClick={() => setProfileOpen(false)}
                          className="w-full block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                          <FaHeart className="inline-block mr-2 text-xs text-red-500" />
                          Wishlist
                        </Link>
                        <button
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.reload();
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <FaSignOutAlt className="text-xs" />
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/login"
                      className="border border-[#6C4DF6] text-[#6C4DF6] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#F5F3FF] transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-[#6C4DF6] text-[#6C4DF6] px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#F5F3FF] transition-all duration-300"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 text-2xl hover:text-[#6C4DF6] transition-colors duration-300"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-lg animate-slideDown">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-3 text-sm transition-all duration-300 ${isActive(link.path)
                      ? "text-[#6C4DF6] bg-gradient-to-r from-[#F5F3FF] to-[#F3E8FF] border-l-4 border-[#6C4DF6]"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              {user?.is_admin === 1 && (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-3 text-sm transition-all duration-300 ${isActive("/dashboard")
                      ? "text-[#6C4DF6] bg-gradient-to-r from-[#F5F3FF] to-[#F3E8FF] border-l-4 border-[#6C4DF6]"
                      : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  Dashboard
                </Link>
              )}
              {token && (
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-3 text-sm transition-all duration-300 ${
                    isActive("/wishlist")
                      ? "text-[#6C4DF6] bg-gradient-to-r from-[#F5F3FF] to-[#F3E8FF] border-l-4 border-[#6C4DF6]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Wishlist {wishlist?.length > 0 && `(${wishlist.length})`}
                </Link>
              )}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2 mx-4"></div>

              {/* Language */}
              <div className="px-6 py-3">
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <FaGlobe className="text-xs" /> Language
                </p>
                <div className="flex gap-2">
                  {["EN", "Hindi", "Odia"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        const selected =

                          item === "EN" ? "en" : item === "Hindi" ? "hi" : "od";

                          item === "EN"
                            ? "en"
                            : item === "Hindi"
                              ? "hi"
                              : "od";


                        setLang(selected);

                        i18n.changeLanguage(selected);


                        localStorage.setItem("language", selected);

                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${
                        (item === "EN" && lang === "en") ||
                        (item === "Hindi" && lang === "hi") ||
                        (item === "Odia" && lang === "od")
                          ? "bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}

                        localStorage.setItem(
                          "language",
                          selected
                        );

                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-md text-sm transition-all duration-300 ${(item === "EN" && lang === "en") ||
                          (item === "Hindi" && lang === "hi") ||
                          (item === "Odia" && lang === "od")
                          ? "bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}

                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex gap-3 px-6 py-3">
                {token ? (
                  <div className="flex flex-col w-full gap-2">
                    <button
                      className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSettingsOpen(true);
                      }}
                    >
                      <FaCog className="text-sm text-gray-500" />
                      Settings
                    </button>
                    <button
                      className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      <FaSignOutAlt className="text-sm" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="flex-1">
                      <button className="w-full border border-[#6C4DF6] text-[#6C4DF6] py-2 rounded-md hover:bg-[#F5F3FF] transition-all duration-300">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <button className="w-full bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                        Register
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Animation */}
        <style>{`
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

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[72px] md:h-[80px]"></div>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-100 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6">Settings</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSettingsTab("password");
                      setPasswordError("");
                      setPasswordSuccess("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "password"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaLock className="text-sm" />
                    Change Password
                  </button>
                  <button
                    onClick={() => setSettingsTab("language")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "language"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaGlobe className="text-sm" />
                    Language
                  </button>
                  <button
                    onClick={() => setSettingsTab("support")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${settingsTab === "support"
                        ? "bg-[#6C4DF6] text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <FaHeadset className="text-sm" />
                    Help & Support
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSettingsOpen(false)}
                className="mt-6 md:mt-0 w-full text-center text-sm font-medium text-gray-400 hover:text-gray-600 py-2 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                Close
              </button>
            </div>

            {/* Content Panel */}
            <div className="flex-1 p-8 overflow-y-auto relative">
              <button
                onClick={() => setSettingsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>

              {settingsTab === "password" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Change Password</h4>
                  <p className="text-sm text-gray-500 mb-6">Update your password to keep your account secure.</p>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#6C4DF6] focus:ring-2 focus:ring-[#6C4DF6]/20 transition-all duration-200 text-sm focus:outline-none"
                      />
                    </div>

                    {passwordError && (
                      <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100">
                        {passwordError}
                      </p>
                    )}

                    {passwordSuccess && (
                      <p className="text-xs text-green-600 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-100">
                        {passwordSuccess}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-full bg-[#6C4DF6] hover:bg-[#5B3EE0] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {passwordLoading ? "Saving Changes..." : "Save Password"}
                    </button>
                  </form>
                </div>
              )}

              {settingsTab === "language" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Language Preference</h4>
                  <p className="text-sm text-gray-500 mb-6">Choose your preferred language for the interface.</p>

                  <div className="space-y-3">
                    {[
                      { code: "en", label: "English", native: "English" },
                      { code: "hi", label: "Hindi", native: "हिन्दी" },
                      { code: "od", label: "Odia", native: "ଓଡ଼ିଆ" }
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          setLang(item.code);
                          i18n.changeLanguage(item.code);
                          localStorage.setItem("language", item.code);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${lang === item.code
                            ? "border-[#6C4DF6] bg-[#F5F3FF]"
                            : "border-gray-100 hover:border-gray-200 bg-white"
                          }`}
                      >
                        <div className="text-left">
                          <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.native}</p>
                        </div>
                        {lang === item.code && (
                          <div className="w-5 h-5 rounded-full bg-[#6C4DF6] flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {settingsTab === "support" && (
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Help & Support</h4>
                  <p className="text-sm text-gray-500 mb-6">Get in touch with us if you have any questions or issues.</p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                        <a href="mailto:support@admissionodisha.in" className="text-sm font-bold text-[#6C4DF6] hover:underline">
                          support@admissionodisha.in
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">We usually reply within 24 hours.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                        <FaPhoneAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</p>
                        <a href="tel:+919114422555" className="text-sm font-bold text-gray-800 hover:text-[#6C4DF6] transition-colors">
                          +91 91144 22555
                        </a>
                        <p className="text-xs text-gray-500 mt-0.5">Mon - Sat (9:00 AM - 6:00 PM)</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1">Need immediate guidance?</p>
                      <p className="text-xs leading-relaxed">
                        You can fill out the contact form or use the guidance popup helper on the homepage to register a query and receive custom support.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
