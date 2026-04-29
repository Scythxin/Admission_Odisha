import React from "react";
import {
  FaUserGraduate,
  FaUsers,
  FaShieldAlt,
  FaClipboardList,
} from "react-icons/fa";

const infoData = [
  {
    id: 1,
    icon: <FaUserGraduate />,
    title: "For Students",
    description:
      "Discover the best colleges and courses that match your goals.",
    iconColor: "text-[#5B3DF5]",
    bgColor: "bg-[#5B3DF5]/10",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "For Parents",
    description: "A trusted platform to support your child's bright future.",
    iconColor: "text-[#EC4899]",
    bgColor: "bg-[#EC4899]/10",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Verified Information",
    description:
      "All colleges and courses are verified for your safety and trust.",
    iconColor: "text-[#14B8A6]",
    bgColor: "bg-[#14B8A6]/10",
  },
  {
    id: 4,
    icon: <FaClipboardList />,
    title: "All at One Place",
    description:
      "Courses, colleges, fees, eligibility and more — everything here.",
    iconColor: "text-[#3B82F6]",
    bgColor: "bg-[#3B82F6]/10",
  },
];

const InfoSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#071B52]">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-base md:text-lg mt-2 max-w-2xl mx-auto">
            Your trusted partner in finding the right educational path
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {infoData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-50 hover:border-gray-100"
            >
              <div
                className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center text-2xl ${item.iconColor} mb-4 group-hover:scale-110 group-hover:rounded-2xl transition-all duration-300`}
              >
                {item.icon}
              </div>

              <h3 className="text-[#071B52] font-semibold text-lg mb-2 group-hover:text-[#4F46E5] transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;