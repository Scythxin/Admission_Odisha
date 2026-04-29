import React from "react";
import { FaStar, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

import kiit from "/src/assets/images/colleges/kiit.jpg";
import vssut from "/src/assets/images/colleges/vssut.jpg";
import utkal from "/src/assets/images/colleges/utkal.jpg";
import soa from "/src/assets/images/colleges/soa.jpg";
import nit from "/src/assets/images/colleges/nit.jpg";

const colleges = [
  {
    name: "KIIT University",
    location: "Bhubaneswar",
    rating: "4.6",
    image: kiit,
  },
  {
    name: "VSSUT Burla",
    location: "Sambalpur",
    rating: "4.4",
    image: vssut,
  },
  {
    name: "Utkal University",
    location: "Bhubaneswar",
    rating: "4.3",
    image: utkal,
  },
  {
    name: "SOA University",
    location: "Bhubaneswar",
    rating: "4.5",
    image: soa,
  },
  {
    name: "NIT Rourkela",
    location: "Rourkela",
    rating: "4.7",
    image: nit,
  },
];

const TopColleges = () => {
  const handleExploreColleges = () => {
    window.location.href = "/colleges";
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAFAFD]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#071B52]">
              Top Colleges in Odisha
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-2">
              Explore the best educational institutions in Odisha
            </p>
          </div>

          <button
            onClick={handleExploreColleges}
            className="group inline-flex items-center gap-2 text-[#4F46E5] font-semibold text-sm md:text-base hover:gap-3 transition-all duration-300"
          >
            Explore Colleges
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {colleges.map((college, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-[200px] sm:h-[180px] md:h-[200px]">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-lg">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-[#071B52] font-bold text-sm">{college.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-[#071B52] text-lg mb-2 group-hover:text-[#4F46E5] transition-colors duration-300 line-clamp-1">
                  {college.name}
                </h3>

                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                  <FaMapMarkerAlt className="text-xs" />
                  <span>{college.location}</span>
                </div>

                <button className="w-full py-2.5 text-sm font-medium rounded-xl border border-[#4F46E5] text-[#4F46E5] bg-white/50 group-hover:bg-[#4F46E5] group-hover:text-white transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            Find Your Perfect College
          </h3>
          <p className="text-white/80 text-sm md:text-base mb-4">
            Get personalized recommendations based on your preferences
          </p>
          <button
            onClick={handleExploreColleges}
            className="bg-white text-[#4F46E5] px-6 md:px-8 py-2.5 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopColleges;