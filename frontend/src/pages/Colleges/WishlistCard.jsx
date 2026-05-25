// src/pages/Wishlist/WishlistCard.jsx

import React from "react";
import {
  FaHeart,
  FaRegEye,
  FaMapMarkerAlt,
  FaStar,
  FaTrash,
} from "react-icons/fa";

const WishlistCard = ({ college, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-[220px] object-cover"
        />

        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md">
          <FaHeart className="text-pink-500 text-lg" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-[24px] font-bold text-[#0B1B43] mb-2">
          {college.name}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 text-[15px] mb-3">
          <FaMapMarkerAlt />
          <span>{college.location}</span>
        </div>

        <div className="inline-block bg-[#EEF4FF] text-[#2563EB] text-sm px-3 py-2 rounded-lg mb-4">
          {college.courses}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold text-gray-700">{college.rating}</span>

          <span className="text-gray-500">({college.reviews})</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex-1 border border-[#2563EB] text-[#2563EB] py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2563EB] hover:text-white transition-all duration-300">
            <FaRegEye />
            View Details
          </button>

          <button
            onClick={() => onRemove(college.id)}
            className="flex-1 border border-red-300 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <FaTrash />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
