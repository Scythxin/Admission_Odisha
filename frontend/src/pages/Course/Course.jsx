import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, GraduationCap, Laptop, BookOpen, FlaskConical, Briefcase, 
  Pill, Palette, Microscope, ChevronRight, Settings, Users, 
  ShieldCheck, Headphones, Sparkles, TrendingUp, Star, Zap
} from 'lucide-react';

// Import your image
import heroImage from "/src/assets/images/course.png";

const Course = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Explore Courses, Build Your Future";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setAnimatedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const streams = [
    { name: "Engineering",icon: <Laptop size={24} />, color: "text-[#5B3DF5]", bg: "bg-[#5B3DF5]/10" },
    { name: "Management",icon: <Briefcase size={24} />, color: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
    { name: "Science", icon: <FlaskConical size={24} />, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    { name: "Computer App.", icon: <Laptop size={24} />, color: "text-[#EC4899]", bg: "bg-[#EC4899]/10" },
    { name: "Pharmacy", icon: <Pill size={24} />, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
    { name: "Education", icon: <BookOpen size={24} />, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
    { name: "Arts & Humanities", icon: <Palette size={24} />, color: "text-[#A855F7]", bg: "bg-[#A855F7]/10" },
  ];

  const popularCourses = [
    { t: "B.Tech", sub: "Bachelor of Technology", dur: "4 Years", s: "Engineering & Tech",  ic: <GraduationCap size={24} />, c: "text-[#5B3DF5]", bg: "bg-[#5B3DF5]/10" },
    { t: "MBA", sub: "Master of Business Admin.", dur: "2 Years", s: "Management",  ic: <Briefcase size={24} />, c: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
    { t: "B.Sc", sub: "Bachelor of Science", dur: "3 Years", s: "Science",  ic: <FlaskConical size={24} />, c: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    { t: "BCA", sub: "Bachelor of Computer App.", dur: "3 Years", s: "Computer Applications",  ic: <Laptop size={24} />, c: "text-[#EC4899]", bg: "bg-[#EC4899]/10" },
    { t: "B.Pharm", sub: "Bachelor of Pharmacy", dur: "4 Years", s: "Pharmacy",  ic: <Pill size={24} />, c: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
    { t: "Diploma", sub: "Polytechnic Diploma", dur: "3 Years", s: "Various Branches",  ic: <Settings size={24} />, c: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    { t: "B.Ed", sub: "Bachelor of Education", dur: "2 Years", s: "Education",  ic: <BookOpen size={24} />, c: "text-[#10B981]", bg: "bg-[#10B981]/10" },
    { t: "BA", sub: "Bachelor of Arts", dur: "3 Years", s: "Arts & Humanities",  ic: <Palette size={24} />, c: "text-[#A855F7]", bg: "bg-[#A855F7]/10" },
  ];

  const whyChooseUs = [
    { t: "Wide Range", d: "Diverse courses across streams", ic: <BookOpen size={20} />, c: "text-[#5B3DF5]", bg: "bg-[#5B3DF5]/10" },
    { t: "Top Colleges", d: "Verified Universities", ic: <Users size={20} />, c: "text-[#14B8A6]", bg: "bg-[#14B8A6]/10" },
    { t: "100% Trusted", d: "Verified and secure process", ic: <ShieldCheck size={20} />, c: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    { t: "Expert Guidance", d: "Help from our counselors", ic: <Headphones size={20} />, c: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  ];

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans pb-16">
      
      {/* HERO SECTION */}
      <section className="bg-white pt-8 pb-16 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT - Text Content */}
            <div>
              <h1 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] font-bold text-[#071B52]">
                <span className="text-[#4F46E5]">{animatedText}</span>
              </h1>
              <p className="text-[#5E6282] text-base sm:text-lg mt-4 max-w-[560px]">
                Discover a wide range of courses from top colleges and universities in Odisha. 
                Find the perfect course that matches your career goals.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link to="/colleges">
                  <button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-md transition-all duration-300 transform hover:scale-105">
                    Explore Colleges
                    <TrendingUp size={18} />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-[#4F46E5] text-[#4F46E5] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#4F46E5] hover:text-white transition-all duration-300">
                    Contact Us
                    <Headphones size={18} />
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT - Image */}
            <div className="relative flex justify-center">
              <img
                src={heroImage}
                alt="Students"
                className="relative z-10 w-[280px] sm:w-[380px] md:w-[460px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL SEARCH BAR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Search Input Row */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-xl">
                <Search className="text-[#4F46E5]" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for courses by name, college, or stream..."
                className="flex-1 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-base py-2"
              />
            </div>
          </div>

          {/* Filters Row - Fixed dropdown positioning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b sm:border-b-0 sm:border-r border-gray-100 relative">
              <div className="px-4 py-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Category</label>
                <select className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  <option>All Categories</option>
                  <option>Engineering</option>
                  <option>Management</option>
                  <option>Medical</option>
                  <option>Pharmacy</option>
                  <option>Law</option>
                </select>
              </div>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-gray-100 relative">
              <div className="px-4 py-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Degree Level</label>
                <select className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  <option>All Degrees</option>
                  <option>Bachelor's Degree</option>
                  <option>Master's Degree</option>
                  <option>Diploma</option>
                  <option>Certificate</option>
                </select>
              </div>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-gray-100 relative">
              <div className="px-4 py-2">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">Stream</label>
                <select className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  <option>All Streams</option>
                  <option>Science</option>
                  <option>Commerce</option>
                  <option>Arts</option>
                  <option>Technology</option>
                </select>
              </div>
            </div>
            <div className="p-3 bg-[#4F46E5]/5">
              <button className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold hover:bg-[#4338CA] transition-all duration-300 flex items-center justify-center gap-2 mt-1">
                <Search size={18} />
                Search Courses
              </button>
            </div>
          </div>
        </div>

        {/* Popular Searches Tags */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <span className="text-xs text-gray-400 font-medium">Popular Searches:</span>
          {['B.Tech', 'MBA', 'B.Sc', 'BCA', 'B.Pharm', 'Diploma', 'M.Tech', 'LLB'].map(tag => (
            <span key={tag} className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-[#4F46E5]/10 hover:text-[#4F46E5] transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* STREAMS SECTION */}
      <section className="max-w-[1280px] mx-auto py-16 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071B52]">Browse by Stream</h2>
            <p className="text-gray-500 text-sm mt-1">Explore courses by your preferred stream</p>
          </div>
          <Link to="/streams">
            <button className="text-[#4F46E5] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
              View All Streams <ChevronRight size={16} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {streams.map((s, i) => (
            <div 
              key={i} 
              className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center cursor-pointer"
            >
              <div className={`${s.bg} ${s.color} w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>
              <h4 className="font-bold text-sm text-[#071B52]">{s.name}</h4>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.count} Courses</p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES SECTION */}
      <section className="max-w-[1280px] mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071B52]">Popular Courses</h2>
            <p className="text-gray-500 text-sm mt-1">Most sought-after courses by students</p>
          </div>
          <Link to="/courses">
            <button className="text-[#4F46E5] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
              View All Courses <ChevronRight size={16} />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.map((c, i) => (
            <div 
              key={i} 
              className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`${c.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <div className={c.c}>{c.ic}</div>
              </div>
              <h4 className="text-xl font-bold text-[#071B52]">{c.t}</h4>
              <p className="text-xs text-gray-500 mb-4">{c.sub}</p>
              <div className="space-y-2 mb-5">
                <p className="text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-lg">{c.dur} Degree Program</p>
                <p className="text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-lg">{c.s}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase">{c.col} Colleges</span>
                <button className="text-[#4F46E5] font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-300">
                  Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071B52]">Why Choose Us?</h2>
          <p className="text-gray-500 text-sm mt-2">We make your course selection journey easier</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((w, i) => (
            <div 
              key={i} 
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center"
            >
              <div className={`${w.bg} ${w.c} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {w.ic}
              </div>
              <h5 className="font-bold text-lg text-[#071B52] mb-2">{w.t}</h5>
              <p className="text-xs text-gray-500 leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-md">
          <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Finding the right course?
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Get personalized guidance from our expert counselors.
            </p>
          </div>
          <Link to="/register">
            <button className="relative z-10 bg-white text-[#4F46E5] px-8 md:px-10 py-3.5 rounded-xl font-bold hover:shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Get Free Guidance
              <Zap size={18} />
            </button>
          </Link>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        </div>
      </section>

    </div>
  );
};

export default Course;