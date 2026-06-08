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
import logo from "../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");
  const { wishlist } = useContext(AuthContext);

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
                  className={`px-6 py-3 text-sm transition-all duration-300 ${
                    isActive(link.path)
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
                  className={`px-6 py-3 text-sm transition-all duration-300 ${
                    isActive("/dashboard")
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
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex gap-3 px-6 py-3">
                {token ? (
                  <div className="flex flex-col w-full gap-3">
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
    </>
  );
};

export default Navbar;
