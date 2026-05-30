import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, GraduationCap, Laptop, BookOpen, FlaskConical, Briefcase, Pill, Palette, Settings, Users, ShieldCheck, Headphones, TrendingUp, Zap, ChevronRight } from "lucide-react";
import {
  FaCog, FaHeartbeat, FaBriefcase, FaPalette,
  FaFlask, FaBalanceScale, FaPencilAlt, FaConciergeBell,
  FaDesktop, FaGraduationCap
} from "react-icons/fa";

// Import your image
import heroImage from "/src/assets/images/course.png";

const popularCourses = [
  { t: "B.Tech",  sub: "Bachelor of Technology",    dur: "4 Years", s: "Engineering & Tech",   category: "Engineering", degree: "Bachelor's Degree", stream: "Technology", ic: "GraduationCap", c: "text-indigo-600",  bg: "bg-indigo-50"  },
  { t: "MBA",     sub: "Master of Business Admin.", dur: "2 Years", s: "Management",            category: "Management",  degree: "Master's Degree",   stream: "Commerce",    ic: "Briefcase",     c: "text-teal-600",   bg: "bg-teal-50"    },
  { t: "B.Sc",    sub: "Bachelor of Science",       dur: "3 Years", s: "Science",               category: "Science",     degree: "Bachelor's Degree", stream: "Science",     ic: "FlaskConical",  c: "text-amber-600",  bg: "bg-amber-50"   },
  { t: "BCA",     sub: "Bachelor of Computer App.", dur: "3 Years", s: "Computer Applications", category: "Engineering", degree: "Bachelor's Degree", stream: "Technology",  ic: "Laptop",        c: "text-pink-600",   bg: "bg-pink-50"    },
  { t: "B.Pharm", sub: "Bachelor of Pharmacy",      dur: "4 Years", s: "Pharmacy",              category: "Pharmacy",    degree: "Bachelor's Degree", stream: "Science",     ic: "Pill",          c: "text-blue-600",   bg: "bg-blue-50"    },
  { t: "Diploma", sub: "Polytechnic Diploma",       dur: "3 Years", s: "Various Branches",      category: "Engineering", degree: "Diploma",           stream: "Technology",  ic: "Settings",      c: "text-amber-600",  bg: "bg-amber-50"   },
  { t: "B.Ed",    sub: "Bachelor of Education",     dur: "2 Years", s: "Education",             category: "Education",   degree: "Bachelor's Degree", stream: "Arts",        ic: "BookOpen",      c: "text-emerald-600",bg: "bg-emerald-50" },
  { t: "BA",      sub: "Bachelor of Arts",          dur: "3 Years", s: "Arts & Humanities",     category: "Arts",        degree: "Bachelor's Degree", stream: "Arts",        ic: "Palette",       c: "text-purple-600", bg: "bg-purple-50"  },
];

const iconMap = { GraduationCap, Briefcase, FlaskConical, Laptop, Pill, Settings, BookOpen, Palette };

const fields = [
  { icon: <FaCog />, color: "bg-[#F3E8FF] text-[#6D28D9]", name: "Engineering &\nTechnology", desc: "Build the future with\ninnovation and technology.", link: "/field/engineering" },
  { icon: <FaHeartbeat />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "Medical &\nHealth", desc: "Serve society and improve\nlives through healthcare.", link: "/field/medical" },
  { icon: <FaBriefcase />, color: "bg-[#FFEDD5] text-[#EA580C]", name: "Commerce &\nManagement", desc: "Lead businesses and\ndrive economic growth.", link: "/field/commerce" },
  { icon: <FaPalette />, color: "bg-[#FCE7F3] text-[#DB2777]", name: "Arts &\nHumanities", desc: "Explore creativity, culture\nand human expression.", link: "/field/arts" },
  { icon: <FaFlask />, color: "bg-[#DBEAFE] text-[#2563EB]", name: "Science", desc: "Discover, learn and\nexpand the boundaries\nof knowledge.", link: "/field/science" },
  { icon: <FaBalanceScale />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Law", desc: "Uphold justice and\nbuild a career in legal\nprofession.", link: "/field/law" },
  { icon: <FaPencilAlt />, color: "bg-[#FCE7F3] text-[#DB2777]", name: "Design", desc: "Turn ideas into reality\nwith creativity and\nimagination.", link: "/field/design" },
  { icon: <FaConciergeBell />, color: "bg-[#FEF3C7] text-[#D97706]", name: "Hospitality", desc: "Create memorable\nexperiences and build\na global career.", link: "/field/hospitality" },
  { icon: <FaDesktop />, color: "bg-[#CCFBF1] text-[#0D9488]", name: "IT &\nComputer", desc: "Shape the digital world\nwith skills and\ntechnology.", link: "/field/it-computer" },
  { icon: <FaGraduationCap />, color: "bg-[#EDE9FE] text-[#6D28D9]", name: "Education", desc: "Inspire minds and\nshape the future\nthrough teaching.", link: "/field/education" },
];

const whyChooseUs = [
  { t: "Wide Range",      d: "Diverse courses across streams",  ic: <BookOpen size={20} />,    c: "text-indigo-600",  bg: "bg-indigo-50"  },
  { t: "Top Colleges",    d: "Verified Universities",           ic: <Users size={20} />,       c: "text-teal-600",    bg: "bg-teal-50"    },
  { t: "100% Trusted",    d: "Verified and secure process",     ic: <ShieldCheck size={20} />, c: "text-amber-600",   bg: "bg-amber-50"   },
  { t: "Expert Guidance", d: "Help from our counselors",        ic: <Headphones size={20} />,  c: "text-blue-600",    bg: "bg-blue-50"    },
];

const Course = () => {
  const [animatedText, setAnimatedText] = useState("");
  const fullText = "Explore Courses, Build Your Future";
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDegree, setSelectedDegree] = useState("All Degrees");
  const [selectedStream, setSelectedStream] = useState("All Streams");
  const courseSectionRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setAnimatedText(fullText.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const filteredCourses = popularCourses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = !q || c.t.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q);
    const matchCategory = selectedCategory === "All Categories" || c.category === selectedCategory;
    const matchDegree   = selectedDegree   === "All Degrees"    || c.degree    === selectedDegree;
    const matchStream   = selectedStream   === "All Streams"    || c.stream    === selectedStream;
    return matchSearch && matchCategory && matchDegree && matchStream;
  });

  const handleSearch = () => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-[#F8F8FC] min-h-screen font-sans pb-16">

      {/* HERO */}
      <section className="bg-white pt-10 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-[#071B52]">
                <span className="text-indigo-600">{animatedText}</span>
                <span className="animate-pulse text-indigo-400">|</span>
              </h1>
              <p className="text-gray-500 text-base mt-4 max-w-lg">
                Discover a wide range of courses from top colleges and universities in Odisha.
                Find the perfect course that matches your career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link to="/colleges">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Explore Colleges <TrendingUp size={16} />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    Contact Us <Headphones size={16} />
                  </button>
                </Link>
              </div>
            </div>
            {/* Hero Image */}
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

      {/* SEARCH BAR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 -mt-2">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-visible">
          <div className="flex flex-col md:flex-row">

            {/* Text search with suggestions */}
            <div className="relative flex items-center w-full md:w-[40%] px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 flex-shrink-0" size={18} />
              <input
                type="text"
                placeholder="Search courses by name or subject..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="w-full px-3 py-2 outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm"
              />
              {showSuggestions && searchQuery && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-56 overflow-y-auto">
                  {popularCourses.filter(c =>
                    c.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.sub.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, 8).map((course, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => { setSearchQuery(course.t); setShowSuggestions(false); setTimeout(() => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}
                      className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-sm text-gray-700 border-b last:border-b-0 border-gray-100 flex items-center gap-2"
                    >
                      <Search size={13} className="text-gray-400 flex-shrink-0" />
                      <span className="font-semibold">{course.t}</span>
                      <span className="text-gray-400 text-xs truncate">— {course.sub}</span>
                    </div>
                  ))}
                  {popularCourses.filter(c =>
                    c.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.sub.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-3 text-xs text-gray-400 text-center">No courses found</div>
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Category</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {["All Categories","Engineering","Management","Medical","Pharmacy","Law","Arts","Science","Education"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Degree */}
            <div className="w-full md:w-[20%] border-b md:border-b-0 md:border-r border-gray-200">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Degree</label>
                <select value={selectedDegree} onChange={e => setSelectedDegree(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {["All Degrees","Bachelor's Degree","Master's Degree","Diploma","Certificate"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Stream */}
            <div className="w-full md:w-[20%]">
              <div className="px-4 py-2">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Stream</label>
                <select value={selectedStream} onChange={e => setSelectedStream(e.target.value)}
                  className="w-full py-2 outline-none text-gray-700 bg-transparent text-sm cursor-pointer mt-1 appearance-none">
                  {["All Streams","Science","Commerce","Arts","Technology"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button onClick={handleSearch}
            className="w-full bg-indigo-600 text-white py-3 rounded-b-2xl font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
            <Search size={17} /> Search Courses
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap gap-2 justify-center mt-5">
          <span className="text-xs text-gray-400 font-medium self-center">Popular:</span>
          {["B.Tech","MBA","B.Sc","BCA","B.Pharm","Diploma","M.Tech","LLB"].map(tag => (
            <span key={tag}
              onMouseDown={() => { setSearchQuery(tag); setTimeout(() => courseSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 50); }}
              className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* STREAMS */}
      <section className="max-w-[1280px] mx-auto py-14 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-[#071B52]">Browse by Stream</h2>
            <p className="text-gray-400 text-xs mt-1">Explore courses by your preferred stream</p>
          </div>
          <Link to="/field">
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              View All <ChevronRight size={15} />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
          {fields.map((f, i) => (
            <Link key={i} to={f.link || "#"} className="block">
              <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center cursor-pointer hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-center items-center">
                <div className={`${f.color} w-11 h-11 mx-auto mb-2 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-xl`}>
                  {f.icon}
                </div>
                <h4 className="font-bold text-[11px] text-[#071B52] leading-tight whitespace-pre-line">
                  {f.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES */}
      <section ref={courseSectionRef} className="max-w-[1280px] mx-auto py-8 px-4 sm:px-6 scroll-mt-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-[#071B52]">Popular Courses</h2>
            <p className="text-gray-400 text-xs mt-1">
              {filteredCourses.length === popularCourses.length
                ? "Most sought-after courses by students"
                : `Showing ${filteredCourses.length} result${filteredCourses.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Link to="/courses">
            <button className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              View All <ChevronRight size={15} />
            </button>
          </Link>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={38} className="mx-auto mb-3 opacity-25" />
            <p className="text-sm font-medium">No courses match your search.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All Categories"); setSelectedDegree("All Degrees"); setSelectedStream("All Streams"); }}
              className="mt-3 text-xs text-indigo-600 underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((c, i) => {
              const Icon = iconMap[c.ic];
              const slug = c.t.toLowerCase().replace(/\./g, "");
              return (
                <Link key={i} to={`/course-detail/${slug}`} className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
                  <div className={`${c.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className={c.c}><Icon size={22} /></span>
                  </div>
                  <h4 className="text-lg font-bold text-[#071B52]">{c.t}</h4>
                  <p className="text-xs text-gray-400 mb-3">{c.sub}</p>
                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.dur} Program</p>
                    <p className="text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1.5 rounded-lg">{c.s}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Colleges</span>
                    <span className="text-indigo-600 font-bold text-xs flex items-center gap-1">Details <ChevronRight size={13} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#071B52]">Why Choose Us?</h2>
          <p className="text-gray-400 text-xs mt-1">We make your course selection journey easier</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseUs.map((w, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 text-center hover:-translate-y-1 transition-all duration-300">
              <div className={`${w.bg} ${w.c} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {w.ic}
              </div>
              <h5 className="font-bold text-[#071B52] mb-1">{w.t}</h5>
              <p className="text-xs text-gray-400">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 text-center md:text-left mb-5 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-1">Finding the right course?</h2>
            <p className="text-white/75 text-sm">Get personalized guidance from our expert counselors.</p>
          </div>
          <Link to="/register">
            <button className="relative z-10 bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Get Free Guidance <Zap size={16} />
            </button>
          </Link>
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};

export default Course;