import React from "react";
import { FiSearch, FiHeadphones } from "react-icons/fi";
import { FaUniversity, FaGraduationCap, FaShieldAlt } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import heroImage from "/src/assets/images/heroSectionImg.png";

const features = [
  {
    icon: <FaGraduationCap />,
    title: "Diverse Courses",
    desc: "Wide range of courses to choose",
    color: "text-[#5B3DF5]",
  },
  {
    icon: <FaUniversity />,
    title: "Trusted Colleges",
    desc: "Government, Private & Deemed Universities",
    color: "text-[#14B8A6]",
  },
  {
    icon: <HiOutlineDocumentText />,
    title: "Easy Process",
    desc: "Simple and hassle-free admission process",
    color: "text-[#F59E0B]",
  },
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    desc: "Your data is protected and 100% secure",
    color: "text-[#3B82F6]",
  },
  {
    icon: <FiHeadphones />,
    title: "24/7 Support",
    desc: "Get help anytime from our experts",
    color: "text-[#A855F7]",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#F8F8FC] to-white pt-8 pb-12 md:pt-8 md:pb-16 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h1 className="text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.2] sm:leading-[1.3] font-bold text-[#071B52]">
              Find the Right College
              <br className="hidden sm:block" />
              for a{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Bright Future
              </span>
            </h1>

            <p className="text-[#5E6282] text-base sm:text-lg mt-4 md:mt-6 max-w-[560px] mx-auto lg:mx-0">
              Explore top colleges, courses and admission opportunities in
              Odisha. All information at one place.
            </p>

            {/* Search Box*/}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mt-6 md:mt-8 p-1.5 max-w-[700px] mx-auto lg:mx-0 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center flex-1 px-4 bg-gray-50/50 rounded-xl sm:rounded-l-xl sm:rounded-r-none">
                  <FiSearch className="text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search for courses, colleges..."
                    className="w-full px-3 py-3 sm:py-3.5 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                  />
                </div>

                <div className="border-l border-gray-200 px-4 bg-gray-50/50 rounded-xl sm:rounded-none">
                  <select className="outline-none bg-transparent text-[#071B52] py-3 sm:py-3.5 w-full">
                    <option>All Categories</option>
                    <option>B.Tech</option>
                    <option>MBA</option>
                    <option>BCA</option>
                    <option>B.Sc</option>
                  </select>
                </div>

                <button className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white px-6 py-3 sm:py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                  <FiSearch className="text-xl" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8 justify-center lg:justify-start">
              <Link to="/register">
                <button className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <HiOutlineDocumentText className="text-2xl" />
                  Apply Now
                </button>
              </Link>

              <Link to="/colleges">
                <button className="border-2 border-primary text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto">
                  <FaUniversity />
                  Explore Colleges
                </button>
              </Link>

              <Link to="/field">
            <button className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              <span>Courses After 12th</span>
            </button>
            </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center mt-8 lg:mt-0">
            <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#D8B4FE] via-[#C4B5FD] to-[#A78BFA] opacity-70 blur-2xl animate-pulse"></div>
            <div className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] rounded-full bg-gradient-to-tr from-primary to-primary-dark opacity-20 blur-3xl"></div>
            <img
              src={heroImage}
              alt="student"
              className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] lg:w-[520px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mt-12 md:mt-14">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-50"
            >
              <div className={`text-3xl md:text-4xl ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              <h3 className="font-bold text-[#071B52] mt-3 md:mt-4 text-base md:text-lg">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;