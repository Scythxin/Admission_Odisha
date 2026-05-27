import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

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
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "College", path: "/colleges" },
    { name: "Course", path: "/course" },
    { name: "Contact", path: "/contact" },
  ];

  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];

  const wishlistCount = wishlistItems.length;
  const isActive = (path) => location.pathname === path;

  // const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile spacing fix */}
      <div
        className={`h-[72px] w-full md:hidden ${scrolled ? "block" : "hidden"}`}
      ></div>

      <header
        className={`z-[100] transition-all duration-300 bg-white border-b border-gray-200
        ${scrolled ? "fixed top-4 left-4 w-[calc(100%-2rem)] rounded-xl shadow-lg" : "sticky top-0 w-full"}`}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="h-14 md:h-16 object-contain"
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
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative cursor-pointer ${
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
            {user?.is_admin === 1 && (
              <Link
                to="/dashboard"
                className={`relative cursor-pointer ${
                  isActive("/dashboard")
                    ? "text-[#6C4DF6] font-semibold"
                    : "hover:text-[#6C4DF6]"
                }`}
              >
                Dashboard
                {isActive("/dashboard") && (
                  <span className="absolute left-0 -bottom-[8px] w-full h-[2px] bg-[#6C4DF6]"></span>
                )}
              </Link>
            )}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/wishlist"
              className="relative flex items-center gap-2 text-[#0B1B43] font-medium hover:text-[#2563EB] transition-all duration-300"
            >
              <FaHeart className="text-xl" />

              <span>Wishlist</span>

              {/* Count */}
              {wishlistCount > 0 && (
                <span className="absolute -top-2 left-5 bg-[#2563EB] text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium bg-white hover:bg-gray-50"
              >
                {lang}
                <span className="text-xs">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-md z-50">
                  {["EN", "Hindi", "Odia"].map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setLang(item);
                        setOpen(false);
                      }}
                      className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
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
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition flex items-center gap-2"
                >
                  Profile
                  <span className="text-xs">▾</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md z-50 overflow-hidden">
                    <Link
                      to="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-[#6C4DF6] text-[#6C4DF6] px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#F5F3FF]"
                >
                  Login
                </Link>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-[#6C4DF6] to-[#8B5CF6] text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md hover:opacity-90 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg animate-slideDown">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-6 py-3 text-sm ${
                    isActive(link.path)
                      ? "text-[#6C4DF6] bg-[#F5F3FF] border-l-4 border-[#6C4DF6]"
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
                  className={`px-6 py-3 text-sm ${
                    isActive("/dashboard")
                      ? "text-[#6C4DF6] bg-[#F5F3FF] border-l-4 border-[#6C4DF6]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </Link>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-200 my-2 mx-4"></div>

              {/* Language */}
              <div className="px-6 py-3">
                <p className="text-xs text-gray-500 mb-2">Language</p>
                <div className="flex gap-2">
                  {["EN", "Hindi", "Odia"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setLang(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded ${
                        lang === item
                          ? "bg-[#6C4DF6] text-white"
                          : "bg-gray-100"
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
                    <Link to="/wishlist" className="w-full">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full border border-[#6C4DF6] text-[#6C4DF6] py-2 rounded-md hover:bg-[#F5F3FF]"
                      >
                        Wishlist
                      </button>
                    </Link>
                    <button
                      className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="flex-1">
                      <button className="w-full border border-[#6C4DF6] text-[#6C4DF6] py-2 rounded-md">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <button className="w-full bg-[#6C4DF6] text-white py-2 rounded-md">
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
    </>
  );
};

export default Navbar;
