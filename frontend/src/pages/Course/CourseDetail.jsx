import React, { useEffect } from "react";
import {
  FaGraduationCap, FaBookOpen, FaCheckCircle, FaUniversity, FaStar, FaArrowRight
} from "react-icons/fa";
import cseImg from "../../assets/images/cse_hero.png";
import ctaBooksImg from "../../assets/images/cta_books.png";

/* ── DATA ── */
const courses = [
  {
    name: "B.Tech in Computer Science Engineering",
    desc: "A 4-year undergraduate program focused on software development, algorithms, data structures, databases, and system design.",
  },
  {
    name: "BE in Computer Science Engineering",
    desc: "Engineering degree that emphasizes computing fundamentals, programming, and real-world applications.",
  },
  {
    name: "Diploma in Computer Science Engineering",
    desc: "A diploma course providing basic knowledge in computer systems, programming, and applications.",
  },
];

const eligibility = [
  "Candidate must have passed 10+2 (or equivalent) with Physics, Chemistry and Mathematics.",
  "Minimum aggregate marks required: 50% (may vary by institute).",
  "Some institutes may require a valid entrance exam score (JEE Main, state CET, etc.).",
  "English may be a compulsory subject in 12th.",
];

const universities = [
  { name: "Indian Institute of Technology, Delhi", location: "New Delhi, Delhi", rating: "4.8", initial: "IIT" },
  { name: "National Institute of Technology, Rourkela", location: "Rourkela, Odisha", rating: "4.6", initial: "NIT" },
  { name: "Vellore Institute of Technology, Vellore", location: "Vellore, Tamil Nadu", rating: "4.5", initial: "VIT" },
  { name: "KIIT University", location: "Bhubaneswar, Odisha", rating: "4.4", initial: "KIIT" },
  { name: "SOA University", location: "Bhubaneswar, Odisha", rating: "4.4", initial: "SOA" },
  { name: "NIT Rourkela", location: "Rourkela, Odisha", rating: "4.3", initial: "NIT" },
];

/* ── COMPONENTS ── */
const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F4F1FF] text-[#5B45C4] text-xl shrink-0">
      {icon}
    </div>
    <h2 className="text-[22px] font-bold text-[#0F172A]">{title}</h2>
  </div>
);

/* ── MAIN ── */
const CourseDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-poppins text-gray-800 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 pt-8">

        {/* HERO SECTION */}
        <section className="relative flex flex-col md:flex-row justify-between items-center py-10 md:py-16 mb-16">
          {/* Background Blob & Dots Placeholder */}
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#F5F3FF] rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          
          <div className="max-w-[550px] z-10">
            <span className="inline-block bg-[#A78BFA] text-white text-[13px] px-4 py-1.5 rounded-full font-semibold mb-6">
              Engineering
            </span>
            
            <h1 className="text-4xl md:text-[44px] font-extrabold text-[#0F172A] leading-[1.2] mb-6">
              Computer Science<br />Engineering (CSE)
            </h1>

            <div className="w-12 h-1 bg-[#5B45C4] rounded mb-6"></div>

            <p className="text-gray-600 text-[15px] leading-relaxed max-w-[500px]">
              Computer Science Engineering is a dynamic field that focuses on the design, development, and application of computer systems, software, and technologies to solve real-world problems.
            </p>
          </div>

          <div className="relative mt-12 md:mt-0 flex-1 flex justify-center lg:justify-end z-10">
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
               <img src={cseImg} alt="Computer Science" className="w-full h-full object-contain drop-shadow-xl" />
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="mb-16">
          <SectionTitle icon={<FaBookOpen />} title="Introduction" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="flex-1 text-gray-600 text-[15px] leading-relaxed">
               <p>
                 Computer Science Engineering (CSE) combines the principles of computer science and engineering to develop software, applications, and systems that power modern technology. It involves the study of programming, algorithms, data structures, artificial intelligence, and more.
               </p>
             </div>
             <div className="w-[140px] h-[140px] rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#A78BFA] text-5xl shrink-0">
               <FaBookOpen className="opacity-50 text-7xl" />
             </div>
          </div>
        </section>

        {/* COURSES AVAILABLE */}
        <section className="mb-16">
          <SectionTitle icon={<FaGraduationCap />} title="Courses Available" />
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c, i) => {
              const parts = c.name.split("Computer Science Engineering");
              return (
                <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col items-start">
                  <div className="w-14 h-14 rounded-full bg-[#F4F1FF] text-[#5B45C4] text-2xl flex items-center justify-center mb-6">
                    <FaGraduationCap />
                  </div>
                  <h3 className="text-[17px] text-[#0F172A] mb-4">
                    {parts[0]}<span className="font-bold">Computer Science<br/>Engineering</span>{parts[1]}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section className="mb-16 bg-[#F8F9FA] rounded-3xl p-8 md:p-10">
          <SectionTitle icon={<FaUniversity className="text-xl" />} title="Eligibility" />
          <ul className="space-y-4">
            {eligibility.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheckCircle className="text-[#22C55E] text-lg mt-0.5 shrink-0" />
                <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TOP UNIVERSITIES */}
        <section className="mb-16">
          <SectionTitle icon={<FaUniversity />} title="Top Universities / Institutes" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {universities.map((u, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow bg-white flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 text-gray-500 font-bold text-xs shrink-0 shadow-sm">
                   {u.initial}
                 </div>
                 
                 <div className="flex-1">
                   <h4 className="text-[14px] font-bold text-[#0F172A] leading-tight mb-1">{u.name}</h4>
                   <p className="text-[12px] text-gray-500">{u.location}</p>
                 </div>
                 
                 <div className="bg-[#DCFCE7] text-[#16A34A] text-[12px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
                   <FaStar className="text-[10px]" /> {u.rating}
                 </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="border-2 border-[#5B45C4] text-[#5B45C4] font-semibold text-[15px] px-8 py-2.5 rounded-lg hover:bg-[#5B45C4] hover:text-white transition-colors">
              View More Institutes
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#5B45C4] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
           
           <div className="flex items-center gap-8 z-10 w-full flex-col md:flex-row text-center md:text-left">
             <div className="w-32 h-32 shrink-0">
               <img src={ctaBooksImg} alt="Books" className="w-full h-full object-contain drop-shadow-2xl" />
             </div>
             
             <div className="flex-1">
               <h3 className="text-xl md:text-[22px] font-bold text-white mb-2">
                 Explore more courses and find the right path for your future.
               </h3>
               <p className="text-indigo-100 text-[15px]">
                 Compare courses, colleges, eligibility and more in one place.
               </p>
             </div>
             
             <button className="bg-white text-[#5B45C4] font-semibold text-[15px] px-6 py-3.5 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0 shadow-lg">
               Explore More Courses <FaArrowRight />
             </button>
           </div>
        </section>

      </div>
    </div>
  );
};

export default CourseDetail;