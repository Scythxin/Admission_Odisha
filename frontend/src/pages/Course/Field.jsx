import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCog, FaHeartbeat, FaBriefcase, FaPalette,
  FaFlask, FaBalanceScale, FaPencilAlt, FaConciergeBell,
  FaDesktop, FaGraduationCap, FaArrowRight, FaLightbulb,
} from "react-icons/fa";
import after12Img from "../../assets/images/after12img.png";

const fields = [
  { icon: <FaCog />, color: "bg-[#F3E8FF] text-[#6D28D9]", name: "Engineering &\nTechnology", desc: "Build the future with\ninnovation and technology.", link: "/field/engineering" },
  { icon: <FaHeartbeat />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "Medical &\nHealth", desc: "Serve society and improve\nlives through healthcare." },
  { icon: <FaBriefcase />, color: "bg-[#FFEDD5] text-[#EA580C]", name: "Commerce &\nManagement", desc: "Lead businesses and\ndrive economic growth." },
  { icon: <FaPalette />, color: "bg-[#FCE7F3] text-[#DB2777]", name: "Arts &\nHumanities", desc: "Explore creativity, culture\nand human expression." },
  { icon: <FaFlask />, color: "bg-[#DBEAFE] text-[#2563EB]", name: "Science", desc: "Discover, learn and\nexpand the boundaries\nof knowledge." },
  { icon: <FaBalanceScale />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Law", desc: "Uphold justice and\nbuild a career in legal\nprofession." },
  { icon: <FaPencilAlt />, color: "bg-[#FCE7F3] text-[#DB2777]", name: "Design", desc: "Turn ideas into reality\nwith creativity and\nimagination." },
  { icon: <FaConciergeBell />, color: "bg-[#FEF3C7] text-[#D97706]", name: "Hospitality", desc: "Create memorable\nexperiences and build\na global career." },
  { icon: <FaDesktop />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "IT &\nComputer", desc: "Shape the digital world\nwith skills and\ntechnology." },
  { icon: <FaGraduationCap />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Education", desc: "Inspire minds and\nshape the future\nthrough teaching." },
];

const FieldCard = ({ icon, color, name, desc, link }) => (
  <Link to={link || "#"} className="block h-full">
    <div className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
      
      <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl ${color}`}>
        {icon}
      </div>

      <h3 className="text-lg md:text-xl font-bold text-[#071B52] leading-snug">
        {name.split("\n").map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h3>

      <p className="text-gray-500 text-xs md:text-sm leading-relaxed whitespace-pre-line">
        {desc}
      </p>
    </div>
  </Link>
);

const Field = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-poppins text-gray-800 pb-12">
      <div className="max-w-[1200px] mx-auto">
        {/* HERO */}
        <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 lg:px-12 py-12 md:py-20 bg-white relative overflow-hidden">
          
          {/* LEFT */}
          <div className="max-w-xl z-10 flex-1">
            <span className="inline-block bg-[#F3EEFF] text-[#4F46E5] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6">
              Courses After 12th
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-[#071B52] mb-4 tracking-tight leading-tight">
              Choose a Field
            </h1>

            <div className="w-16 h-1 bg-[#4F46E5] mb-6"></div>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[320px]">
              Select a field to explore courses and career opportunities after 12th.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative w-full md:w-[500px] flex justify-center items-center mt-12 md:mt-0 z-10 flex-1">
            <img 
              src={after12Img} 
              alt="Graduation Hat and Books" 
              className="w-full max-w-[380px] md:max-w-[480px] object-contain relative z-10 mix-blend-multiply"
            />
          </div>
        </section>

        {/* FIELDS */}
        <section className="px-6 md:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((f, i) => (
              <FieldCard key={i} {...f} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 md:mx-8 lg:mx-12 mt-4 mb-20 bg-[#F8F6FF] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          
          <div className="flex items-center gap-6 flex-1 text-center md:text-left flex-col md:flex-row">
            <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-[#EBE4FF] rounded-full flex items-center justify-center shrink-0">
              <FaLightbulb className="text-[#4F46E5] text-2xl md:text-3xl" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#071B52] mb-1.5">
                Not sure which field is right for you?
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                Get expert guidance and discover the best options for your future.
              </p>
            </div>
          </div>

          <button className="bg-[#3B28CC] hover:bg-[#2A1B99] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 transition-colors whitespace-nowrap mt-4 md:mt-0">
            Explore Now <FaArrowRight />
          </button>

        </section>
      </div>
    </div>
  );
};

export default Field;