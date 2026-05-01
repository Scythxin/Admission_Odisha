import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaInfoCircle,
  FaDesktop, FaBuilding, FaCog, FaBolt,
  FaMicrochip, FaPlane, FaBrain, FaCode,
  FaDna, FaRobot, FaLeaf, FaIndustry,
  FaShieldAlt, FaChartBar, FaNetworkWired, FaDatabase,
  FaHeadset, FaThLarge
} from "react-icons/fa";
import engImg from "../../../assets/images/engandtechimg.png";

/* ── DATA ── */
const specializations = [
  { icon: <FaDesktop />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Computer Science\nEngineering", desc: "Build software, solve problems\nand shape the digital future." },
  { icon: <FaBuilding />, color: "bg-[#DCFCE7] text-[#16A34A]", name: "Civil Engineering", desc: "Design, build and maintain\nthe world around us." },
  { icon: <FaCog />, color: "bg-[#FEF9C3] text-[#D97706]", name: "Mechanical\nEngineering", desc: "Design machines and systems\nthat power the future." },
  { icon: <FaBolt />, color: "bg-[#FEF3C7] text-[#D97706]", name: "Electrical\nEngineering", desc: "Work with electricity, energy\nand drive innovation." },
  { icon: <FaMicrochip />, color: "bg-[#EDE9FE] text-[#4F46E5]", name: "Electronics &\nCommunication", desc: "Design circuits, devices\nand communication systems." },
  { icon: <FaPlane />, color: "bg-[#DBEAFE] text-[#2563EB]", name: "Aerospace\nEngineering", desc: "Take technology to\nthe skies and beyond." },
  { icon: <FaBrain />, color: "bg-[#FCE7F3] text-[#DB2777]", name: "AI & Data Science", desc: "Use data and AI to\nbuild smarter solutions." },
  { icon: <FaCode />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "Information\nTechnology", desc: "Manage systems,\nnetworks and secure data." },
  { icon: <FaDna />, color: "bg-[#DCFCE7] text-[#15803D]", name: "Biotechnology\nEngineering", desc: "Combine biology and\ntechnology for innovation." },
  { icon: <FaRobot />, color: "bg-[#CCFBF1] text-[#0F766E]", name: "Robotics\nEngineering", desc: "Build intelligent\nmachines that work for us." },
  { icon: <FaLeaf />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Environmental\nEngineering", desc: "Create sustainable\nsolutions for a better tomorrow." },
  { icon: <FaIndustry />, color: "bg-[#FEE2E2] text-[#DC2626]", name: "Petroleum\nEngineering", desc: "Explore energy\nresources and drive the world." },
  { icon: <FaShieldAlt />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "Cyber Security", desc: "Protect systems and\ndata from digital threats." },
  { icon: <FaChartBar />, color: "bg-[#FEF3C7] text-[#D97706]", name: "Industrial\nEngineering", desc: "Optimize processes\nand improve efficiency." },
  { icon: <FaNetworkWired />, color: "bg-[#E0F2FE] text-[#0284C7]", name: "Cloud\nComputing", desc: "Build, deploy and\nmanage cloud solutions." },
  { icon: <FaDatabase />, color: "bg-[#FCE7F3] text-[#E11D48]", name: "Data\nEngineering", desc: "Build pipelines and\nmanage large scale data." },
];

/* ── CARD ── */
const SpecCard = ({ icon, color, name, desc }) => (
  <div className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative h-full">
    
    <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl ${color}`}>
      {icon}
    </div>

    <h3 className="text-[17px] font-bold text-[#071B52] leading-snug mt-2">
      {name.split("\n").map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h3>

    <p className="text-[13px] text-gray-500 leading-relaxed whitespace-pre-line flex-1 mb-4">
      {desc}
    </p>

    <div className="absolute bottom-5 right-5 text-[#4F46E5] text-sm opacity-70 group-hover:opacity-100 transition-opacity">
      <FaArrowRight />
    </div>
  </div>
);

/* ── MAIN ── */
const EngAndTech = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-poppins text-gray-800 pb-12">
      <div className="max-w-[1200px] mx-auto">
        
        {/* BACK */}
        <div className="px-6 md:px-8 lg:px-12 pt-8">
          <Link to="/field" className="inline-flex items-center gap-2 text-[15px] font-medium text-[#4F46E5] hover:gap-3 transition-all">
            <FaArrowLeft /> Back to Fields
          </Link>
        </div>

        {/* HERO */}
        <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 lg:px-12 py-8 md:py-12 bg-white relative overflow-hidden">
          
          {/* LEFT */}
          <div className="max-w-xl z-10 flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-[#EBE4FF] rounded-2xl flex items-center justify-center shrink-0">
                <FaThLarge className="text-2xl text-[#4F46E5]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#071B52] mb-2 tracking-tight">
                  Engineering & Technology
                </h1>
                <p className="text-gray-500 text-[15px] md:text-base">Choose your area of interest</p>
              </div>
            </div>

            <p className="text-[15px] md:text-base text-gray-500 leading-relaxed max-w-[400px]">
              Explore various specializations in Engineering & Technology and find the right path for your future.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative w-full md:w-[500px] flex justify-center items-center mt-12 md:mt-0 z-10 flex-1">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-[#F3EEFF] opacity-80 -z-10"></div>
            <div className="absolute -top-6 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle,_#D1D5DB_2px,_transparent_2px)] bg-[length:16px_16px] opacity-60 -z-10"></div>
            
            <img 
              src={engImg} 
              alt="Engineering and Technology" 
              className="w-full max-w-[380px] md:max-w-[480px] object-contain relative z-10 mix-blend-multiply"
            />
          </div>

        </section>

        {/* INFO BAR */}
        <div className="mx-6 md:mx-8 lg:mx-12 mb-10 bg-[#F8F6FF] rounded-xl px-6 py-4 flex items-center gap-3">
          <FaInfoCircle className="text-[#4F46E5] text-lg shrink-0" />
          <span className="text-gray-600 text-[15px]">
            Select a specialization to view courses, eligibility, top colleges and career opportunities.
          </span>
        </div>

        {/* GRID */}
        <section className="px-6 md:px-8 lg:px-12 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specializations.map((s, i) => (
              <SpecCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 md:mx-8 lg:mx-12 mt-4 mb-20 bg-[#F8F6FF] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          
          <div className="flex items-center gap-6 flex-1 text-center md:text-left flex-col md:flex-row">
            <div className="w-[60px] h-[60px] md:w-[72px] md:h-[72px] bg-[#EBE4FF] rounded-full flex items-center justify-center shrink-0">
              <FaHeadset className="text-[#4F46E5] text-2xl md:text-3xl" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#071B52] mb-1.5">
                Not sure which specialization is right for you?
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                Get expert guidance and discover the best path for your future.
              </p>
            </div>
          </div>

          <button className="bg-[#3B28CC] hover:bg-[#2A1B99] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 transition-colors whitespace-nowrap mt-4 md:mt-0">
            Get Guidance <FaArrowRight />
          </button>

        </section>

      </div>
    </div>
  );
};

export default EngAndTech;