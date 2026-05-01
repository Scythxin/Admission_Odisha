import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaFlask,
  FaLaptopCode,
  FaCog,
  FaCapsules,
  FaArrowRight,
} from "react-icons/fa";

const courses = [
  {
    title: "B.Tech",
    subtitle: "Bachelor of Technology",
    icon: <FaGraduationCap />,
    iconColor: "text-[#5B3DF5]",
    bgGradient: "from-[#5B3DF5]/20 to-[#5B3DF5]/5",
    duration: "4 Years",
    career: "Engineer",
  },
  {
    title: "MBA",
    subtitle: "Master of Business Administration",
    icon: <FaBriefcase />,
    iconColor: "text-[#EC4899]",
    bgGradient: "from-[#EC4899]/20 to-[#EC4899]/5",
    duration: "2 Years",
    career: "Manager",
  },
  {
    title: "B.Sc",
    subtitle: "Bachelor of Science",
    icon: <FaFlask />,
    iconColor: "text-[#14B8A6]",
    bgGradient: "from-[#14B8A6]/20 to-[#14B8A6]/5",
    duration: "3 Years",
    career: "Scientist",
  },
  {
    title: "BCA",
    subtitle: "Bachelor Computer Applications",
    icon: <FaLaptopCode />,
    iconColor: "text-[#F59E0B]",
    bgGradient: "from-[#F59E0B]/20 to-[#F59E0B]/5",
    duration: "3 Years",
    career: "Developer",
  },
  {
    title: "Diploma",
    subtitle: "Polytechnic Diploma",
    icon: <FaCog />,
    iconColor: "text-[#3B82F6]",
    bgGradient: "from-[#3B82F6]/20 to-[#3B82F6]/5",
    duration: "3 Years",
    career: "Technician",
  },
  {
    title: "B.Pharm",
    subtitle: "Bachelor of Pharmacy",
    icon: <FaCapsules />,
    iconColor: "text-[#10B981]",
    bgGradient: "from-[#10B981]/20 to-[#10B981]/5",
    duration: "4 Years",
    career: "Pharmacist",
  },
];

const PopularCourses = () => {
  // Optional: Add individual course click handler
  const handleCourseClick = (courseTitle) => {
    // Navigate to specific course page or open modal
    console.log(`Clicked on ${courseTitle}`);
    // You can add navigation to specific course page
    // window.location.href = `/courses/${courseTitle.toLowerCase()}`;
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#FAFAFD] to-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071B52]">
              Popular Courses
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Choose from 1000+ courses across top colleges
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => handleCourseClick(course.title)}
              className="group relative bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Decorative Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className={`text-3xl md:text-4xl ${course.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-3`}>
                {course.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-[#071B52] mb-1 group-hover:text-[#4F46E5] transition-colors duration-300">
                {course.title}
              </h3>

              {/* Subtitle */}
              <p className="text-gray-500 text-xs md:text-sm mb-3 line-clamp-1">
                {course.subtitle}
              </p>

              {/* Duration & Career Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-white/80 transition-colors duration-300">
                  {course.duration}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-white/80 transition-colors duration-300">
                  {course.career}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link - Updated with React Router Link */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 md:mt-16">
          <Link to="/course">
            <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-8 md:px-10 py-3 md:py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span>View All Courses</span>
            </button>
          </Link>
          <Link to="/field">
            <button className="group inline-flex items-center gap-2 bg-white border-2 border-[#4F46E5] text-[#4F46E5] px-8 md:px-10 py-3 md:py-3.5 rounded-xl font-semibold shadow hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <span>Courses After 12th</span>
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        
      </div>
    </section>
  );
};

export default PopularCourses;