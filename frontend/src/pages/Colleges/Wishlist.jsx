// src/pages/Wishlist/Wishlist.jsx

import React, { useState } from "react";
import { FaHeart, FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";

import WishlistCard from "./WishlistCard";
import { wishlistData } from "./wishlistData";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : wishlistData;
  });

  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);

  // Remove Single College
  const handleRemove = (id) => {
    const filtered = wishlist.filter((item) => item.id !== id);
    setWishlist(filtered);
  };

  // Remove All Colleges
  const handleRemoveAll = () => {
    setWishlist([]);
  };

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#EEF4FF] py-14 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left */}
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span>Home</span>
              <span>{">"}</span>
              <span className="text-[#2563EB] font-medium">Wishlist</span>
            </div>

            {/* Heading */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                <FaHeart className="text-[#2563EB] text-2xl" />
              </div>

              <h1 className="text-4xl font-bold text-[#0B1B43]">My Wishlist</h1>
            </div>

            <p className="text-gray-600 text-lg">
              Colleges you've saved to explore later
            </p>
          </div>

          {/* Right Image */}
          <div>
            <img
              src="/src/assets/wishlist/wishlist-banner.jpeg"
              alt="wishlist-banner"
              className="w-[350px]"
            />
          </div>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="px-6 md:px-12 lg:px-20 py-10">
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-10">
            <h2 className="text-3xl font-bold text-[#0B1B43]">
              Saved Colleges ({wishlist.length})
            </h2>

            {wishlist.length > 0 && (
              <button
                onClick={handleRemoveAll}
                className="border border-red-300 text-red-500 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <FaTrash />
                Remove All
              </button>
            )}
          </div>

          {/* Cards */}
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
              {wishlist.map((college) => (
                <WishlistCard
                  key={college.id}
                  college={college}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-[#2563EB] text-4xl" />
              </div>

              <h2 className="text-3xl font-bold text-[#0B1B43] mb-3">
                Wishlist Empty
              </h2>

              <p className="text-gray-500 text-lg">
                No colleges added to wishlist yet.
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                <FaShoppingBag className="text-[#2563EB] text-3xl" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0B1B43] mb-1">
                  Want to add more colleges?
                </h3>

                <p className="text-gray-500">
                  Explore colleges and save them to your wishlist.
                </p>
              </div>
            </div>

            {/* Button */}
            <button className="bg-[#2563EB] text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-blue-700 transition-all duration-300">
              Explore Colleges
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
